import { defineField, ObjectDefinition } from 'sanity';

import type { CustomFieldOptions } from '@/schemas/common/fields/field';
import { markdownField } from '@/schemas/common/fields/markdown';
import { IconQuote } from '@/schemas/common/icons';
import { DocumentPreview } from '@/schemas/previews/document';

export function quoteField({
  caption,
  ...rest
}: CustomFieldOptions<
  ObjectDefinition,
  'fields' | 'preview' | 'components',
  {
    caption?: boolean;
  }
>) {
  return defineField({
    ...rest,
    type: 'object',
    icon: IconQuote,
    fields: [
      markdownField({ name: 'quote', validation: (rule) => rule.required() }),
      defineField({
        name: 'attribution',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'link',
        type: 'reference',
        to: [{ type: 'link' }],
      }),
    ],
    preview: {
      select: {
        title: 'quote',
        subtitle: 'attribution',
      },
    },
    components: {
      preview: DocumentPreview,
    },
  });
}
