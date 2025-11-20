import { defineConfig } from '@shared/config';

export const config = defineConfig(
  {
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
  () => ({
    google: {
      maps: {
        apiKey: process.env.SANITY_STUDIO_GOOGLE_MAPS_API_KEY,
      },
    },
  })
);
