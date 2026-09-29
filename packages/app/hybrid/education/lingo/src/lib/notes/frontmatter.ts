import * as YAML from 'yaml';
import {
  isRecord,
  readLinkList,
  readOptionalString,
  readParentLinkOpt,
  readString,
} from './validate';
import type { NoteFrontmatter } from './types';

const ALLOWED_KEYS = new Set([
  'title',
  'subtitle',
  'parentLink',
  'links',
  'references',
]);

const rejectUnknownKeys = (raw: Record<string, unknown>): void => {
  const unknown = Object.keys(raw).filter((key) => !ALLOWED_KEYS.has(key));

  if (unknown.length > 0) {
    throw new TypeError(
      `note: unknown frontmatter key(s): ${unknown.join(', ')}`
    );
  }
};

const readOptionalLinks = (
  raw: Record<string, unknown>,
  key: 'links' | 'references'
): NoteFrontmatter['links'] =>
  raw[key] === undefined ? undefined : readLinkList(raw[key], key);

export const parseFrontmatter = (source: string): NoteFrontmatter => {
  const raw = YAML.parse(source);

  if (!isRecord(raw)) {
    throw new TypeError('note: frontmatter must be a YAML object');
  }

  rejectUnknownKeys(raw);

  return {
    title: readString(raw.title, 'title'),
    subtitle: readOptionalString(raw.subtitle),
    parentLink: readParentLinkOpt(raw.parentLink),
    links: readOptionalLinks(raw, 'links'),
    references: readOptionalLinks(raw, 'references'),
  };
};
