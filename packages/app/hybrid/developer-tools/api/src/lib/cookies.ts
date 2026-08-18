import { StoredCookie } from '@/types/api-client';

export const uid = (): string => Math.random().toString(36).slice(2, 10);

export interface ParsedCookie {
  name: string;
  value: string;
  path: string;
  secure: boolean;
}

export const parseSetCookie = (value: string): ParsedCookie | null => {
  const parts = value.split(';').map((part) => part.trim());
  const [pair] = parts;
  if (!pair || !pair.includes('=')) return null;
  const separator = pair.indexOf('=');
  const name = pair.slice(0, separator).trim();
  const valuePart = pair.slice(separator + 1).trim();
  if (name === '') return null;
  let path = '/';
  let secure = false;
  for (const part of parts.slice(1)) {
    const [attr] = part.split('=');
    const key = (attr ?? '').trim().toLowerCase();
    if (key === 'path') {
      const [, pathValue] = part.split('=');
      path = pathValue?.trim() || '/';
    }
    if (key === 'secure') secure = true;
  }
  return { name, value: valuePart, path, secure };
};

const stripProtocol = (url: string): string =>
  url.replace(/^[a-z]+:\/\//i, '').split('/')[0] ?? '';

const stripPort = (host: string): string => host.split(':')[0] ?? host;

export const hostForUrl = (url: string): string =>
  stripPort(stripProtocol(url));

export const parseSetCookies = (
  url: string,
  setCookieLines: string[]
): StoredCookie[] => {
  const domain = hostForUrl(url);
  const cookies: StoredCookie[] = [];
  for (const line of setCookieLines) {
    const parsed = parseSetCookie(line);
    if (parsed) {
      cookies.push({ id: uid(), domain, ...parsed, enabled: true });
    }
  }
  return cookies;
};

export const setCookieLines = (headers: Record<string, string>): string[] => {
  const raw = headers['set-cookie'];
  if (!raw) return [];
  return raw
    .split(',')
    .map((line) => line.trim())
    .filter((line) => line !== '');
};

export const mergeCookies = (
  store: StoredCookie[],
  incoming: StoredCookie[]
): StoredCookie[] => {
  let next = [...store];
  for (const cookie of incoming) {
    next = next.filter(
      (existing) =>
        !(existing.domain === cookie.domain && existing.name === cookie.name)
    );
    if (cookie.value === '') continue;
    next = [cookie, ...next];
  }
  return next;
};

export const addCookie = (
  store: StoredCookie[],
  cookie: Omit<StoredCookie, 'id'>
): StoredCookie[] => [{ ...cookie, id: uid() }, ...store];

export const updateCookie = (
  store: StoredCookie[],
  id: string,
  patch: Partial<Omit<StoredCookie, 'id'>>
): StoredCookie[] =>
  store.map((cookie) => (cookie.id === id ? { ...cookie, ...patch } : cookie));

export const removeCookie = (
  store: StoredCookie[],
  id: string
): StoredCookie[] => store.filter((cookie) => cookie.id !== id);

export const cookiesForDomain = (
  store: StoredCookie[],
  url: string
): StoredCookie[] => {
  const domain = hostForUrl(url);
  return store.filter(
    (cookie) =>
      cookie.enabled &&
      (cookie.domain === domain || domain.endsWith(`.${cookie.domain}`))
  );
};

export const buildCookieHeader = (
  store: StoredCookie[],
  url: string
): string | undefined => {
  const pairs = cookiesForDomain(store, url).map(
    (cookie) => `${cookie.name}=${cookie.value}`
  );
  return pairs.length > 0 ? pairs.join('; ') : undefined;
};

const COOKIES_KEY = 'api-client:cookies';

export const loadCookies = (): StoredCookie[] => {
  try {
    const raw = localStorage.getItem(COOKIES_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredCookie[]) : [];
  } catch {
    return [];
  }
};

export const saveCookies = (cookies: StoredCookie[]): void => {
  try {
    localStorage.setItem(COOKIES_KEY, JSON.stringify(cookies));
  } catch {
    // storage full or unavailable — ignore
  }
};
