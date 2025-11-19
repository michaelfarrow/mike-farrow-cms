import { defineConfig } from '@shared/config';

export const config = defineConfig(
  {
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
  (production) => ({
    url: {
      app: production
        ? 'https://mike-farrow-portfolio-sanity-next.vercel.app'
        : 'http://localhost:3000',
      studio: production
        ? 'https://mike-farrow-portfolio-sanity-studio.vercel.app'
        : 'http://localhost:3333',
    },
    google: {
      maps: {
        apiKey: process.env.SANITY_STUDIO_GOOGLE_MAPS_API_KEY,
      },
    },
  })
);
