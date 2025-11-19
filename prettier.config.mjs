import baseConfig from '@mikefarrow/prettier/config';

/** @type {import('prettier').Config} */
const config = {
  ...baseConfig,
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '',
    '^@?sanity(.*)$',
    '',
    '^@/(.*)$',
    '^@shared/(.*)$',
    '',
    '^[./]',
  ],
};

export default config;
