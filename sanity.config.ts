import { codeInput } from '@sanity/code-input';
import { googleMapsInput } from '@sanity/google-maps-input';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { markdownSchema } from 'sanity-plugin-markdown';
import { defineDocuments, presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';

import { Logo } from '@/components/logo';
import { config } from '@/lib/config';
import { resolveDynamic } from '@/presentation/resolve-dynamic';
import { resolveStudio } from '@/presentation/resolve-studio';
import { schemas, schemasFlat } from '@/schemas';

import '@/styles/global.css';

const singletonActions = new Set(['publish', 'discardChanges', 'restore']);
const singletonTypes = new Set(['cv', 'settings']);

export default defineConfig({
  ...config.studio,

  name: 'default',
  title: config.title,
  icon: Logo,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            ...schemas
              .filter((item) => item.type !== 'ignore')
              .map((item, i) => [
                ...item.schemas.map((schema) => {
                  if (singletonTypes.has(schema.name)) {
                    return S.listItem()
                      .title(schema.title || '')
                      .id(schema.name)
                      .icon(schema.icon)
                      .child(
                        S.document()
                          .schemaType(schema.name)
                          .documentId(schema.name)
                      );
                  }

                  return S.documentTypeListItem(schema.name);
                }),
                ...(i < schemas.length - 2 ? [S.divider()] : []), // .title(item.title)
              ])
              .flat(),
          ]),
    }),
    visionTool(),
    presentationTool({
      resolve: {
        locations: resolveDynamic(resolveStudio, { link: { deep: true } }),
        mainDocuments: defineDocuments(
          Object.values(resolveStudio)
            .filter(
              (
                item
              ): item is Required<
                (typeof resolveStudio)[keyof typeof resolveStudio]
              > => 'document' in item
            )
            .map((item) => item.document)
        ),
      },
      previewUrl: {
        origin: config.url.app,
        previewMode: {
          enable: `${config.url.app}/api/draft-mode/enable`,
        },
      },
    }),
    googleMapsInput({
      apiKey: config.google.maps.apiKey || '',
      defaultLocale: 'en-GB',
      defaultLocation: {
        lat: 54.5,
        lng: -4.5,
      },
      defaultZoom: 6,
    }),
    codeInput(),
    markdownSchema(),
  ],

  schema: {
    types: schemasFlat,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
