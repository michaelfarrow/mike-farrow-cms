import { capitalCase } from 'change-case';
import { unflatten } from 'flat';
import { mapKeys } from 'lodash-es';
import { titleCase } from 'title-case';
import { PartialDeep, SetOptional } from 'type-fest';

import { resolve, resolvePrivate } from './resolve';
import { PathResolver, StaticResolver } from './resolver';

export type TypeResolver = ReturnType<ReturnType<typeof createTypeResolver>>;

function createTypeResolver<PR extends PathResolver<any>>(pathResolve: PR) {
  type PT = PartialDeep<Parameters<PR>[0]>;

  const create = <T extends object>({
    filter,
    locations,
  }: {
    filter: string;
    locations: (
      doc: PT & PartialDeep<T>,
      resolvePath: PR
    ) => {
      title: string;
      href: string;
    }[];
  }) => {
    return {
      locations: (doc: PT & PartialDeep<T>) => {
        const items = locations(doc, pathResolve);
        if (!items.length) return null;
        return items;
      },
      document: {
        route: pathResolve.path
          .replace(/\[(.*?)\]/g, ':$1')
          .replace(/\./g, '__'),
        resolve(ctx: any) {
          const { params } = ctx;
          const mapped: any = unflatten(
            mapKeys(params, (_val, key) => key.replace(/__/g, '.'))
          );
          return {
            filter,
            params: mapped,
          };
        },
      },
    };
  };

  return create;
}

function createSlugTypeResolver({
  type,
  detail,
  index,
}: {
  type: string;
  detail: PathResolver<{
    slug: {
      current: string;
    };
  }>;
  index: StaticResolver;
}) {
  return createTypeResolver(detail)<{ name: string; title: string }>({
    filter: `_type == "${type}" && slug.current == $slug.current`,
    locations: (doc, resolvePath) => {
      if (doc.slug && doc.slug.current) {
        const slug = { current: doc.slug.current };
        return [
          {
            title: doc.name || doc.title || 'Untitled',
            href: resolvePath({ ...doc, slug }),
          },
          {
            title: index.title || `${titleCase(capitalCase(type))} index`,
            href: `${index()}`,
          },
        ];
      }
      return [];
    },
  });
}

export const resolveStudio: Record<
  string,
  SetOptional<TypeResolver, 'document'>
> = {};

for (const [type, pathsOrPath] of Object.entries({
  ...resolve,
  ...resolvePrivate,
})) {
  if ('detail' in pathsOrPath) {
    const paths = pathsOrPath;
    const { detail, index } = paths;
    resolveStudio[type] = createSlugTypeResolver({ type, detail, index });
  }

  if (typeof pathsOrPath === 'function') {
    const path = pathsOrPath;
    resolveStudio[type] = {
      locations: () => [{ href: path(), title: path.title || 'Unknown' }],
    };
  }
}
