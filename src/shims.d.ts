import { IntrinsicDefinitions as SanityTypesIntrinsicDefinitions } from '@sanity/types';

/* Fix for types not being inferred in defineField */
declare module 'sanity' {
  // eslint-disable-next-line typescript/no-empty-object-type
  interface IntrinsicDefinitions extends SanityTypesIntrinsicDefinitions {}
}
