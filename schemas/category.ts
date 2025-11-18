import { nameFields } from '@/schemas/common/fields/title';
import { IconCategory } from '@/schemas/common/icons';

import { defineField, defineType } from 'sanity';

export const category = defineType({
  name: 'category',
  type: 'document',
  icon: IconCategory,
  fields: [
    ...nameFields(),
    defineField({
      name: 'description',
      type: 'text',
      rows: 5,
    }),
  ],
});
