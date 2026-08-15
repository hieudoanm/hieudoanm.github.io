import { isSquad, withFormation } from '@/lib/squad';
import { Squad } from '@/types/football';

const QUERY_KEY = 'squad';

const encodeBase64 = (value: string): string =>
  btoa(encodeURIComponent(value))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

const decodeBase64 = (value: string): string =>
  decodeURIComponent(atob(value.replace(/-/g, '+').replace(/_/g, '/')));

export const encodeSquad = (squad: Squad): string =>
  encodeBase64(JSON.stringify(squad));

export const decodeSquad = (encoded: string): Squad | null => {
  try {
    const parsed: unknown = JSON.parse(decodeBase64(encoded));
    if (!isSquad(parsed)) return null;
    return withFormation(parsed);
  } catch {
    return null;
  }
};

export const buildShareUrl = (squad: Squad): string => {
  const url = new URL(window.location.href);
  url.searchParams.set(QUERY_KEY, encodeSquad(squad));
  return url.toString();
};

export const squadFromUrl = (search: string): Squad | null => {
  const encoded = new URLSearchParams(search).get(QUERY_KEY);
  if (encoded === null) return null;
  return decodeSquad(encoded);
};
