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

function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

function deepMerge(target: any, ...sources: any[]): any {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return deepMerge(target, ...sources);
}

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
    url: {
      app: production
        ? 'https://mike-farrow-portfolio-sanity-next.vercel.app'
        : 'http://localhost:3000',
    },
  };
}

export function defineConfig(options: DefineConfigOptions): DefaultConfig;
export function defineConfig<T extends object>(
  options: DefineConfigOptions,
  create: (options: DefineConfigCreateOptions) => T
): DefaultConfig & T;

export function defineConfig<T extends object>(
  options: DefineConfigOptions,
  create?: (options: DefineConfigCreateOptions) => T
) {
  const config = getDefaultConfig(options);
  return deepMerge(config, (create && create({ production, config })) || {});
}
