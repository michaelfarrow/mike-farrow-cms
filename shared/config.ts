const env = process.env.NODE_ENV;
const production = env === 'production';

export const config = {
  title: 'Mike Farrow',
  studio: {
    projectId: 'h0q0fht4',
    dataset: process.env.SANITY_STUDIO_DATASET || 'development',
    apiVersion: 'vX',
  },
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
  breakpoints: {
    sm: { name: 'Small', width: 640 },
    md: { name: 'Medium', width: 768 },
    lg: { name: 'Large', width: 1024 },
    xl: { name: 'Extra Large', width: 1280 },
    '2xl': { name: '2x Extra Large', width: 1536 },
  },
};

export const SUPPORTED_VIDEO_TYPES = {
  youTube:
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|live\/|v\/)?)([\w-]+)(\S+)?$/,
  vimeo:
    /^(?:http|https)?:?\/?\/?(?:www\.)?(?:player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)$/,
};
