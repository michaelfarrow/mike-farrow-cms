import { nameFields } from '@/schemas/common/fields/title';
import { IconSkill } from '@/schemas/common/icons';
import { unique } from '@/validation/unique';

import { defineField, defineType } from 'sanity';

export const skill = defineType({
  name: 'skill',
  type: 'document',
  icon: IconSkill,
  fields: [
    ...nameFields({ slug: false, validation: (rule) => rule.custom(unique) }),
    defineField({
      name: 'parent',
      type: 'reference',
      to: [{ type: 'skill' }, { type: 'category' }],
      validation: (rule) => rule.required(),
      options: {
        filter:
          '(defined(parent) && parent->_type == "category") || _type == "category"',
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'parent.name',
    },
  },
  orderings: [
    {
      title: 'Parent',
      name: 'parent',
      by: [
        { field: 'parent.name', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
    {
      title: 'Name',
      name: 'name',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
});
