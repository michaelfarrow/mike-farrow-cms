import tsconfigPaths from 'vite-tsconfig-paths';

import { defineCliConfig } from 'sanity/cli';

import { config } from '@shared/config';

export default defineCliConfig({
  api: config.studio,

  deployment: { autoUpdates: false },

  vite: {
    plugins: [tsconfigPaths()],
  },
});
