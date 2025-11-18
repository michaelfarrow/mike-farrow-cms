import type { CustomFieldOptions } from '@/schemas/common/fields/field';

import { CodeDefinition } from '@sanity/code-input';
import { defineField } from 'sanity';

export function codeField({
  ...rest
}: CustomFieldOptions<CodeDefinition, 'options'>) {
  return defineField({
    ...rest,
    type: 'code',
    options: {
      language: 'typescript',
      languageAlternatives: [
        { title: 'Shell Session', value: 'shell-session' },
        { title: 'Bash', value: 'bash' },
        { title: 'Typescript', value: 'typescript', mode: 'tsx' },
        { title: 'Javascript', value: 'javascript', mode: 'jsx' },
        { title: 'HTML', value: 'html' },
        { title: 'CSS', value: 'css' },
        { title: 'Arduino', value: 'arduino' },
      ],
      withFilename: true,
    },
  });
}
