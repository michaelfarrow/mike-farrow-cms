import { codeField } from '@/schemas/common/fields/code';
import {
  imageField,
  responsiveImageField,
} from '@/schemas/common/fields/image';
import { markdownObjectField } from '@/schemas/common/fields/markdown-object';
import { quoteField } from '@/schemas/common/fields/quote';
import { remoteVideoField, videoField } from '@/schemas/common/fields/video';

import { defineType } from 'sanity';

export const common = defineType({
  name: 'common',
  type: 'object',
  fields: [
    imageField({ name: 'image', caption: true }),
    imageField({ name: 'decorativeImage', decorative: true }),
    responsiveImageField({ name: 'responsiveImage', caption: true }),
    videoField({ name: 'video', caption: true }),
    remoteVideoField({ name: 'remoteVideo', caption: true }),
    markdownObjectField({ name: 'markdown' }),
    quoteField({ name: 'quote' }),
    codeField({ name: 'code' }),
  ],
});
