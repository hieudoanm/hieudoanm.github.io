import {
  HistoryEntry,
  HttpMethod,
  KeyValue,
  RequestConfig,
  ResponseMeta,
} from '@/types/api-client';

export const uid = (): string => Math.random().toString(36).slice(2, 10);

export const newKeyValue = (): KeyValue => ({
  id: uid(),
  key: '',
  value: '',
  enabled: true,
});

export const emptyRequest = (): RequestConfig => ({
  method: 'GET',
  url: '',
  params: [newKeyValue()],
  headers: [newKeyValue()],
  body: '',
  authType: 'none',
  token: '',
  username: '',
  password: '',
});

export const buildUrl = (url: string, params: KeyValue[]): string => {
  const base = url.trim();
  if (base === '') return '';
  const active = params.filter((p) => p.enabled && p.key.trim() !== '');
  if (active.length === 0) return base;
  const query = active
    .map(
      (p) =>
        `${encodeURIComponent(p.key.trim())}=${encodeURIComponent(p.value)}`
    )
    .join('&');
  const separator = base.includes('?')
    ? base.endsWith('?') || base.endsWith('&')
      ? ''
      : '&'
    : '?';
  return `${base}${separator}${query}`;
};

export const buildHeaders = (config: RequestConfig): Record<string, string> => {
  const headers: Record<string, string> = {};
  if (config.authType === 'bearer' && config.token.trim() !== '') {
    headers.Authorization = `Bearer ${config.token.trim()}`;
  }
  if (config.authType === 'basic' && config.username.trim() !== '') {
    headers.Authorization = `Basic ${btoa(
      `${config.username}:${config.password}`
    )}`;
  }
  for (const header of config.headers) {
    const key = header.key.trim();
    if (header.enabled && key !== '') {
      headers[key] = header.value;
    }
  }
  return headers;
};

const hasBody = (method: HttpMethod): boolean =>
  method === 'POST' ||
  method === 'PUT' ||
  method === 'PATCH' ||
  method === 'DELETE';

export const resolveBody = (config: RequestConfig): string | undefined => {
  if (!hasBody(config.method)) return undefined;
  const body = config.body.trim();
  return body === '' ? undefined : body;
};

const toHeaderRecord = (headers: Headers): Record<string, string> => {
  const result: Record<string, string> = {};
  headers.forEach((value, key) => {
    result[key] = value;
  });
  return result;
};

export const executeRequest = async (
  config: RequestConfig
): Promise<ResponseMeta> => {
  const url = buildUrl(config.url, config.params);
  const startedAt = performance.now();
  const response = await fetch(url, {
    method: config.method,
    headers: buildHeaders(config),
    body: resolveBody(config),
  });
  const timeMs = Math.round(performance.now() - startedAt);
  const body = await response.text();
  return {
    status: response.status,
    statusText: response.statusText,
    url: response.url,
    headers: toHeaderRecord(response.headers),
    body,
    timeMs,
    sizeBytes: new Blob([body]).size,
  };
};

const HISTORY_KEY = 'api-client:history';
const HISTORY_LIMIT = 50;

export const loadHistory = (): HistoryEntry[] => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as HistoryEntry[]) : [];
  } catch {
    return [];
  }
};

export const addHistoryEntry = (
  entries: HistoryEntry[],
  request: RequestConfig
): HistoryEntry[] => {
  const entry: HistoryEntry = {
    id: uid(),
    timestamp: Date.now(),
    request: {
      ...request,
      params: [...request.params],
      headers: [...request.headers],
    },
  };
  return [entry, ...entries].slice(0, HISTORY_LIMIT);
};

export const saveHistory = (entries: HistoryEntry[]): void => {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
  } catch {
    // storage full or unavailable — ignore
  }
};
