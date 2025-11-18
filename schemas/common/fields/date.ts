import type { CustomFieldOptions } from '@/schemas/common/fields/field';

import { DateDefinition, defineField } from 'sanity';

export function dateField({
  options,
  ...rest
}: CustomFieldOptions<
  DateDefinition,
  null,
  {
    text?: boolean;
    images?: boolean;
    videos?: boolean;
    columns?: boolean;
  }
>) {
  return defineField({
    ...rest,
    type: 'date',
    options: {
      dateFormat: 'DD/MM/YYYY',
      ...options,
    },
  });
}
