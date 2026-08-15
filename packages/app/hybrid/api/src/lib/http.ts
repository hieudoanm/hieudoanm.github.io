import {
  EnvironmentVariable,
  HistoryEntry,
  KeyValue,
  RequestConfig,
  RequestTab,
  ResponseMeta,
  StoredCookie,
} from '@/types/api-client';
import { buildRequestBody, contentTypeFor, FormFiles } from '@/lib/body';
import { buildCookieHeader } from '@/lib/cookies';

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
  bodyType: 'raw',
  formData: [newKeyValue()],
  graphqlQuery: '',
  graphqlVariables: '',
  authType: 'none',
  token: '',
  username: '',
  password: '',
  timeoutMs: '',
  redirect: 'follow',
  preRequestScript: '',
  testScript: '',
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

export const buildHeaders = (
  config: RequestConfig,
  cookies?: StoredCookie[]
): Record<string, string> => {
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
  const cookieHeader = buildCookieHeader(cookies ?? [], config.url);
  if (cookieHeader && !('Cookie' in headers)) {
    headers.Cookie = cookieHeader;
  }
  return headers;
};

export const resolveBody = (config: RequestConfig): string | undefined => {
  const body = buildRequestBody(config);
  return typeof body === 'string' ? body : undefined;
};

import { substituteConfig } from '@/lib/variables';
import {
  expandConfigVars,
  runPreRequestScript,
  runTestScript,
} from '@/lib/scripts';

export interface ExecuteOptions {
  cookies?: StoredCookie[];
  files?: FormFiles;
}

const toHeaderRecord = (headers: Headers): Record<string, string> => {
  const result: Record<string, string> = {};
  headers.forEach((value, key) => {
    result[key] = value;
  });
  return result;
};

export const executeRequest = async (
  config: RequestConfig,
  env?: EnvironmentVariable[],
  options: ExecuteOptions = {}
): Promise<ResponseMeta> => {
  const pre = runPreRequestScript(config, env ?? []);
  const resolvedEnv = pre.envVars;
  const substituted = env ? substituteConfig(pre.config, env) : pre.config;
  const finalConfig = expandConfigVars(substituted, resolvedEnv);
  const url = buildUrl(finalConfig.url, finalConfig.params);
  const controller = new AbortController();
  const timeout = Number(finalConfig.timeoutMs);
  const timer =
    timeout > 0 ? setTimeout(() => controller.abort(), timeout) : undefined;
  const headers = buildHeaders(finalConfig, options.cookies);
  const contentType = contentTypeFor(finalConfig);
  if (contentType && !('Content-Type' in headers)) {
    headers['Content-Type'] = contentType;
  }
  try {
    const startedAt = performance.now();
    const response = await fetch(url, {
      method: finalConfig.method,
      headers,
      body: buildRequestBody(finalConfig, options.files) as
        BodyInit | undefined,
      redirect: finalConfig.redirect,
      signal: controller.signal,
    });
    const timeMs = Math.round(performance.now() - startedAt);
    const body = await response.text();
    const meta: ResponseMeta = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      headers: toHeaderRecord(response.headers),
      body,
      timeMs,
      sizeBytes: new Blob([body]).size,
      scriptLogs: pre.logs,
    };
    if (config.testScript.trim() !== '') {
      const tests = runTestScript(config, meta, resolvedEnv);
      meta.testResults = tests.results;
      meta.scriptLogs = [...pre.logs, ...tests.logs];
      meta.testError = tests.error;
    }
    return meta;
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
