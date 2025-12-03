import tsconfigPaths from 'vite-tsconfig-paths';

import { defineCliConfig } from 'sanity/cli';

import { config } from '@/lib/config';

export default defineCliConfig({
  api: config.studio,

  deployment: { autoUpdates: false },

  vite: {
    plugins: [tsconfigPaths()],
  },

  typegen: {
    path: ['src/lib/queries/**/*.{ts,tsx,js,jsx}'],
    generates: 'sanity.d.ts',
    overloadClientMethods: true,
    formatGeneratedCode: false,
  },
});
