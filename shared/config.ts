import { SimplifyDeep } from 'type-fest';

import { mergeDeep } from './lib/utils';

const env = process.env.NODE_ENV;
const production = env === 'production';

type DefineConfigOptions = {
  dataset?: string;
};

type DefineConfigCreateOptions = {
  production: boolean;
  config: DefaultConfig;
};

type DefaultConfig = ReturnType<typeof getDefaultConfig>;

function getDefaultConfig({ dataset }: DefineConfigOptions) {
  return {
    title: 'Mike Farrow Portfolio',
    studio: {
      projectId: 'h0q0fht4',
      dataset: dataset || 'development',
      apiVersion: 'v2025-11-27',
    },
    breakpoints: {
      sm: { name: 'Small', width: 640 },
      md: { name: 'Medium', width: 768 },
      lg: { name: 'Large', width: 1024 },
      xl: { name: 'Extra Large', width: 1280 },
      '2xl': { name: '2x Extra Large', width: 1536 },
    },
    videoTypes: {
      youTube:
        /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|live\/|v\/)?)([\w-]+)(\S+)?$/,
      vimeo:
        /^(?:http|https)?:?\/?\/?(?:www\.)?(?:player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)$/,
    },
    url: {
      app: production ? 'https://app.farrow.io' : 'http://localhost:3000',
    },
  };
}

export function defineConfig(options: DefineConfigOptions): DefaultConfig;
export function defineConfig<T extends object>(
  options: DefineConfigOptions,
  create: (options: DefineConfigCreateOptions) => T
): SimplifyDeep<DefaultConfig & T>;

export function defineConfig<T extends object>(
  options: DefineConfigOptions,
  create?: (options: DefineConfigCreateOptions) => T
) {
  const config = getDefaultConfig(options);
  return mergeDeep(config, (create && create({ production, config })) || {});
}
