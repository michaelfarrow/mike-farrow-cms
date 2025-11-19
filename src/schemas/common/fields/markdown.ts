import { defineField } from 'sanity';
import { MarkdownDefinition } from 'sanity-plugin-markdown';

import type { CustomFieldOptions } from '@/schemas/common/fields/field';
import { MarkdownInput } from '@/schemas/inputs/markdown';

export function markdownField({
  ...rest
}: CustomFieldOptions<MarkdownDefinition, 'components'>) {
  return defineField({
    ...rest,
    type: 'markdown',
    components: {
      input: MarkdownInput,
    },
  });
}
