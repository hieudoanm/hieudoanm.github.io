import type { NoteLink, NoteParentLink } from './types';

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const readString = (value: unknown, path: string): string => {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new TypeError(`note: expected non-empty string at "${path}"`);
  }

  return value;
};

export const readOptionalString = (value: unknown): string =>
  typeof value === 'string' ? value : '';

export const readLink = (value: unknown, path: string): NoteLink => {
  if (!isRecord(value)) {
    throw new TypeError(`note: expected object at "${path}"`);
  }

  return {
    href: readString(value.href, `${path}.href`),
    label: readString(value.label, `${path}.label`),
    description: readString(value.description, `${path}.description`),
  };
};

export const readParentLink = (
  value: unknown,
  path: string
): NoteParentLink => {
  if (!isRecord(value)) {
    throw new TypeError(`note: expected object at "${path}"`);
  }

  return {
    href: readString(value.href, `${path}.href`),
    label: readString(value.label, `${path}.label`),
  };
};

export const readLinkList = (value: unknown, path: string): NoteLink[] => {
  if (!Array.isArray(value)) {
    throw new TypeError(`note: expected array at "${path}"`);
  }

  return value.map((entry, index) => readLink(entry, `${path}[${index}]`));
};

export const readParentLinkOpt = (
  value: unknown
): NoteParentLink | undefined => {
  if (value === undefined) return undefined;
  if (!isRecord(value)) {
    throw new TypeError('note: expected object at "parentLink"');
  }
  return readParentLink(value, 'parentLink');
};
