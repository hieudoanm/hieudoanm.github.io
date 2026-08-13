export type HttpMethod =
  'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export const HTTP_METHODS: readonly HttpMethod[] = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'HEAD',
  'OPTIONS',
];

export interface KeyValue {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export type AuthType = 'none' | 'bearer' | 'basic';

export type RedirectMode = 'follow' | 'manual';

export interface RequestConfig {
  method: HttpMethod;
  url: string;
  params: KeyValue[];
  headers: KeyValue[];
  body: string;
  authType: AuthType;
  token: string;
  username: string;
  password: string;
  timeoutMs: string;
  redirect: RedirectMode;
}

export interface ResponseMeta {
  status: number;
  statusText: string;
  url: string;
  headers: Record<string, string>;
  body: string;
  timeMs: number;
  sizeBytes: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  request: RequestConfig;
}

export interface EnvironmentVariable {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export interface CollectionEntry {
  id: string;
  name: string;
  request: RequestConfig;
}

export interface RequestGroup {
  id: string;
  name: string;
  entries: CollectionEntry[];
}

export interface RequestCollection {
  id: string;
  name: string;
  groups: RequestGroup[];
}

export interface RequestTab {
  id: string;
  request: RequestConfig;
}

export type CodegenFormat = 'curl' | 'fetch' | 'fetch-ts';

export interface OpenApiOperation {
  id: string;
  method: HttpMethod;
  path: string;
  summary: string;
}
