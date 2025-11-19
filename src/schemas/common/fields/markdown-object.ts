import type { CustomFieldOptions } from '@/schemas/common/fields/field';
import { markdownField } from '@/schemas/common/fields/markdown';
import { IconDocumentText } from '@/schemas/common/icons';
import { MarkdownPreview } from '@/schemas/previews/markdown';

import { defineField, ObjectDefinition } from 'sanity';

export function markdownObjectField({
  ...rest
}: CustomFieldOptions<ObjectDefinition, 'fields' | 'preview' | 'components'>) {
  return defineField({
    ...rest,
    type: 'object',
    icon: IconDocumentText,
    fields: [markdownField({ name: 'content' })],
    preview: {
      select: {
        content: 'content',
      },
      prepare: (selection) => ({ ...selection, title: 'Markdown' }),
    },
    components: {
      preview: MarkdownPreview,
    },
  });
}
