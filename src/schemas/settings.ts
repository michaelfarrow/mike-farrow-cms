import { IconSettings } from '@/schemas/common/icons';

import { defineField, defineType } from 'sanity';

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: IconSettings,
  fields: [
    defineField({
      name: 'password',
      type: 'string',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Settings' }),
  },
});
