import { dateField } from '@/schemas/common/fields/date';
import { titleFields } from '@/schemas/common/fields/title';
import { IconEducation, IconExperience } from '@/schemas/common/icons';

import { defineArrayMember, defineField, defineType } from 'sanity';

const experience = defineArrayMember({
  type: 'object',
  icon: IconExperience,
  fields: [
    ...titleFields({ slug: false }),
    defineField({
      name: 'employer',
      type: 'reference',
      to: [{ type: 'contact' }],
      options: {
        filter: 'type != $type',
        filterParams: { type: 'individual' },
      },
      validation: (rule) => rule.required(),
    }),
    dateField({
      name: 'from',
      validation: (rule) => rule.required(),
    }),
    dateField({
      name: 'to',
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 5,
    }),
  ],
  preview: {
    select: {
      title: 'employer.name',
      subtitle: 'title',
    },
  },
});

const education = defineArrayMember({
  type: 'object',
  icon: IconEducation,
  fields: [
    ...titleFields({ name: 'qualification', slug: false }),
    defineField({
      name: 'institution',
      type: 'reference',
      to: [{ type: 'contact' }],
      options: {
        filter: 'type == $type',
        filterParams: { type: 'institution' },
      },
      validation: (rule) => rule.required(),
    }),
    dateField({
      name: 'from',
      validation: (rule) => rule.required(),
    }),
    dateField({
      name: 'to',
    }),
  ],
  preview: {
    select: {
      title: 'institution.name',
      subtitle: 'qualification',
    },
  },
});

export const cv = defineType({
  name: 'cv',
  type: 'document',
  title: 'CV',
  icon: IconExperience,
  fields: [
    defineField({
      type: 'array',
      name: 'experience',
      of: [experience],
    }),
    defineField({
      type: 'array',
      name: 'education',
      of: [education],
    }),
    defineField({
      type: 'array',
      name: 'skills',
      description:
        'Create skills first and assign to categories. Only categories with skills assigned will show here.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'category' }],
          options: {
            filter: 'count(*[_type == "skill" && parent._ref == ^._id]) > 0',
          },
        }),
      ],
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'CV' }),
  },
});
