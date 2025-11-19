import {
  createPathResolver,
  createStaticResolver,
  ResolveConfig,
} from './resolver';

const cvResolver = createStaticResolver('/cv', 'CV');

export const resolve = {
  project: {
    index: createStaticResolver('/projects'),
    detail: createPathResolver('/projects/[slug.current]'),
  },
  album: {
    index: createStaticResolver('/albums'),
    detail: createPathResolver('/albums/[slug.current]'),
  },
  cv: cvResolver,
} satisfies ResolveConfig;

export const resolvePrivate = {
  skill: cvResolver,
} satisfies ResolveConfig;
