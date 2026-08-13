import {
  EnvironmentVariable,
  HistoryEntry,
  HttpMethod,
  KeyValue,
  RequestConfig,
  RequestTab,
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
  timeoutMs: '',
  redirect: 'follow',
});

export const newTab = (
  request: RequestConfig = emptyRequest()
): RequestTab => ({
  id: uid(),
  request,
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

import { substituteConfig } from '@/lib/variables';

const toHeaderRecord = (headers: Headers): Record<string, string> => {
  const result: Record<string, string> = {};
  headers.forEach((value, key) => {
    result[key] = value;
  });
  return result;
};

export const executeRequest = async (
  config: RequestConfig,
  env?: EnvironmentVariable[]
): Promise<ResponseMeta> => {
  const resolved = env ? substituteConfig(config, env) : config;
  const url = buildUrl(resolved.url, resolved.params);
  const controller = new AbortController();
  const timeout = Number(resolved.timeoutMs);
  const timer =
    timeout > 0 ? setTimeout(() => controller.abort(), timeout) : undefined;
  try {
    const startedAt = performance.now();
    const response = await fetch(url, {
      method: resolved.method,
      headers: buildHeaders(resolved),
      body: resolveBody(resolved),
      redirect: resolved.redirect,
      signal: controller.signal,
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
  } finally {
    if (timer) clearTimeout(timer);
  }
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

const DRAFT_KEY = 'api-client:draft';

export const loadDraft = (): RequestConfig | null => {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return {
      ...emptyRequest(),
      ...(JSON.parse(raw) as Partial<RequestConfig>),
    };
  } catch {
    // corrupt draft — ignore
    return null;
  }
};

export const saveDraft = (request: RequestConfig): void => {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(request));
  } catch {
    // storage full or unavailable — ignore
  }
};

const TABS_KEY = 'api-client:tabs';

export const loadTabs = (): RequestTab[] => {
  try {
    const raw = localStorage.getItem(TABS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((tab): RequestTab => {
        const candidate = tab as Partial<RequestTab>;
        return {
          id: typeof candidate.id === 'string' ? candidate.id : uid(),
          request: candidate.request
            ? { ...emptyRequest(), ...candidate.request }
            : emptyRequest(),
        };
      })
      .filter((tab) => tab.request);
  } catch {
    return [];
  }
};

export const saveTabs = (tabs: RequestTab[]): void => {
  try {
    localStorage.setItem(TABS_KEY, JSON.stringify(tabs));
  } catch {
    // storage full or unavailable — ignore
  }
};

export const initTabs = (): RequestTab[] => {
  const saved = loadTabs();
  if (saved.length > 0) return saved;
  const draft = loadDraft();
  return [newTab(draft ?? emptyRequest())];
};
