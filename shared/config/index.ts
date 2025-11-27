import { SimplifyDeep } from 'type-fest';

import { mergeDeep } from '../lib/utils';
import breakpoints from './breakpoints.export';
import videoTypes from './video-types.export';

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
    breakpoints,
    videoTypes,
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
