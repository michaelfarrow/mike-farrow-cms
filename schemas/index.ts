import { album } from '@/schemas/album';
import { category } from '@/schemas/category';
import { common } from '@/schemas/common';
import { contact } from '@/schemas/contact';
import { cv } from '@/schemas/cv';
import { link } from '@/schemas/link';
import { project } from '@/schemas/project';
import { settings } from '@/schemas/settings';
import { skill } from '@/schemas/skill';

import { defineType } from 'sanity';

type Schema = ReturnType<typeof defineType>;

export const schemas = [
  {
    type: 'ignore',
    schemas: [common],
  },
  {
    title: 'General',
    schemas: [category, link, contact],
  },
  {
    title: 'Documents',
    schemas: [album, project],
  },
  {
    title: 'Personal',
    schemas: [cv, skill],
  },
  {
    title: 'Global',
    schemas: [settings],
  },
] satisfies {
  type?: 'ignore';
  title?: string;
  schemas: Schema | Schema[];
}[];

export const schemasFlat = Object.values(schemas).flatMap((type) =>
  [type.schemas].flat()
);

export type Schemas = (typeof schemasFlat)[number];
export type SchemaType = Schemas['name'];
