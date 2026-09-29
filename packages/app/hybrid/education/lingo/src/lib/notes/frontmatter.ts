import {
  isRecord,
  readLinkList,
  readOptionalString,
  readParentLink,
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

const readJson = (source: string): unknown => {
  try {
    return JSON.parse(source) as unknown;
  } catch (err) {
    throw new TypeError(
      `note: frontmatter is not valid JSON: ${(err as Error).message}`
    );
  }
};

export const parseFrontmatter = (source: string): NoteFrontmatter => {
  const raw = readJson(source);

  if (!isRecord(raw)) {
    throw new TypeError('note: frontmatter must be a JSON object');
  }

  rejectUnknownKeys(raw);

  return {
    title: readString(raw.title, 'title'),
    subtitle: readOptionalString(raw.subtitle),
    parentLink:
      raw.parentLink === undefined
        ? undefined
        : readParentLink(raw.parentLink, 'parentLink'),
    links: readOptionalLinks(raw, 'links'),
    references: readOptionalLinks(raw, 'references'),
  };
};
