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

export type BodyType = 'raw' | 'form' | 'urlencoded' | 'graphql';

export type ScriptLogLevel = 'log' | 'info' | 'warn' | 'error';

export interface ScriptLog {
  id: string;
  level: ScriptLogLevel;
  text: string;
  timestamp: number;
}

export interface TestResult {
  id: string;
  name: string;
  passed: boolean;
  error?: string;
}

export interface RequestConfig {
  method: HttpMethod;
  url: string;
  params: KeyValue[];
  headers: KeyValue[];
  body: string;
  bodyType: BodyType;
  formData: KeyValue[];
  graphqlQuery: string;
  graphqlVariables: string;
  authType: AuthType;
  token: string;
  username: string;
  password: string;
  timeoutMs: string;
  redirect: RedirectMode;
  preRequestScript: string;
  testScript: string;
}

export interface StoredCookie {
  id: string;
  domain: string;
  name: string;
  value: string;
  path: string;
  secure: boolean;
  enabled: boolean;
}

export type RealtimeDirection = 'sent' | 'received';

export interface RealtimeMessage {
  id: string;
  direction: RealtimeDirection;
  text: string;
  timestamp: number;
}

export interface GrpcMethod {
  name: string;
  inputType: string;
  outputType: string;
  clientStreaming: boolean;
  serverStreaming: boolean;
}

export interface GrpcService {
  name: string;
  methods: GrpcMethod[];
}

export interface ProtoFile {
  package: string;
  services: GrpcService[];
}

export interface ResponseMeta {
  status: number;
  statusText: string;
  url: string;
  headers: Record<string, string>;
  body: string;
  timeMs: number;
  sizeBytes: number;
  scriptLogs?: ScriptLog[];
  testResults?: TestResult[];
  testError?: string;
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

export interface RequestExample {
  id: string;
  name: string;
  body: string;
}

export interface CollectionEntry {
  id: string;
  name: string;
  request: RequestConfig;
  examples?: RequestExample[];
}

export interface JsonSchema {
  type?: string;
  properties?: Record<string, JsonSchema>;
  required?: string[];
  items?: JsonSchema;
  enum?: unknown[];
  format?: string;
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

export type RequestProtocol = 'http' | 'websocket' | 'grpc' | 'mqtt';

export interface OpenApiOperation {
  id: string;
  method: HttpMethod;
  path: string;
  summary: string;
}
