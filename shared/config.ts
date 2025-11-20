const env = process.env.NODE_ENV;
const production = env === 'production';

type DefineConfigOptions = {
  dataset?: string;
};

type DefaultConfig = ReturnType<typeof getDefaultConfig>;

function getDefaultConfig({ dataset }: DefineConfigOptions) {
  return {
    title: 'Mike Farrow',
    studio: {
      projectId: 'h0q0fht4',
      dataset: dataset || 'development',
      apiVersion: 'vX',
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
  };
}

export function defineConfig(options: DefineConfigOptions): DefaultConfig;
export function defineConfig<T extends object>(
  options: DefineConfigOptions,
  create: (production: boolean) => T
): DefaultConfig & T;

export function defineConfig<T extends object>(
  options: DefineConfigOptions,
  create?: (production: boolean) => T
) {
  return { ...getDefaultConfig(options), ...(create && create(production)) };
}
