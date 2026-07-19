import {
  AuthType,
  BodyType,
  EnvironmentVariable,
  HttpMethod,
  HTTP_METHODS,
  KeyValue,
  RequestConfig,
  ResponseMeta,
  ScriptLog,
  ScriptLogLevel,
  TestResult,
} from '@/types/api-client';
import { buildRequestBody } from '@/lib/body';
import { expandDynamicVars } from '@/lib/dynamic-vars';
import { runScript, ScriptError } from '@/lib/script';
import { SandboxHost, message } from '@/lib/script/types';

const uid = (): string => Math.random().toString(36).slice(2, 10);

interface ScriptRequestState {
  method: string;
  url: string;
  params: Record<string, string>;
  headers: Record<string, string>;
  body: string;
  bodyType: string;
  auth: { type: string; token: string; username: string; password: string };
  timeout: string;
  redirect: string;
}

const enabledEnvMap = (env: EnvironmentVariable[]): Record<string, string> => {
  const map: Record<string, string> = {};
  for (const variable of env) {
    if (variable.enabled && variable.key.trim() !== '') {
      map[variable.key.trim()] = variable.value;
    }
  }
  return map;
};

const recordToKeyValues = (record: Record<string, unknown>): KeyValue[] =>
  Object.entries(record).map(([key, value]) => ({
    id: uid(),
    key,
    value: String(value ?? ''),
    enabled: true,
  }));

const buildRequestState = (config: RequestConfig): ScriptRequestState => {
  const params: Record<string, string> = {};
  const headers: Record<string, string> = {};
  for (const row of config.params) {
    if (row.enabled && row.key.trim() !== '')
      params[row.key.trim()] = row.value;
  }
  for (const row of config.headers) {
    if (row.enabled && row.key.trim() !== '')
      headers[row.key.trim()] = row.value;
  }
  const body = buildRequestBody(config);
  return {
    method: config.method,
    url: config.url,
    params,
    headers,
    body: typeof body === 'string' ? body : '',
    bodyType: config.bodyType,
    auth: {
      type: config.authType,
      token: config.token,
      username: config.username,
      password: config.password,
    },
    timeout: config.timeoutMs,
    redirect: config.redirect,
  };
};

const buildConfigFromState = (
  state: ScriptRequestState,
  original: RequestConfig
): RequestConfig => {
  if (!HTTP_METHODS.includes(state.method as HttpMethod)) {
    throw new ScriptError(`Invalid method "${state.method}"`);
  }
  const bodyType: BodyType = (
    ['raw', 'form', 'urlencoded', 'graphql'] as BodyType[]
  ).includes(state.bodyType as BodyType)
    ? (state.bodyType as BodyType)
    : 'raw';
  const authType: AuthType = (
    ['none', 'bearer', 'basic'] as AuthType[]
  ).includes(state.auth.type as AuthType)
    ? (state.auth.type as AuthType)
    : 'none';
  return {
    ...original,
    method: state.method as HttpMethod,
    url: String(state.url ?? ''),
    params: recordToKeyValues(state.params),
    headers: recordToKeyValues(state.headers),
    body: bodyType === 'raw' ? String(state.body ?? '') : original.body,
    bodyType,
    formData: original.formData,
    graphqlQuery: original.graphqlQuery,
    graphqlVariables: original.graphqlVariables,
    authType,
    token: String(state.auth.token ?? ''),
    username: String(state.auth.username ?? ''),
    password: String(state.auth.password ?? ''),
    timeoutMs: String(state.timeout ?? ''),
    redirect: state.redirect === 'manual' ? 'manual' : 'follow',
  };
};

const newLog = (
  level: ScriptLogLevel,
  text: string,
  logs: ScriptLog[]
): void => {
  logs.push({ id: uid(), level, text, timestamp: Date.now() });
};

const baseHost = (
  environment: Record<string, string>
): Pick<SandboxHost, 'environment' | 'requestState' | 'responseState'> => ({
  environment,
  requestState: {},
  responseState: null,
});

export const runPreRequestScript = (
  config: RequestConfig,
  env: EnvironmentVariable[]
): {
  config: RequestConfig;
  logs: ScriptLog[];
  envVars: Record<string, string>;
} => {
  const logs: ScriptLog[] = [];
  const envVars = enabledEnvMap(env);
  const requestState = buildRequestState(config);
  const host: SandboxHost = {
    ...baseHost(envVars),
    log: (level, text) => newLog(level, text, logs),
    test: (name, passed, error) =>
      newLog(
        passed ? 'info' : 'error',
        `Test: ${name}${error ? ` — ${error}` : ''}`,
        logs
      ),
    requestState: requestState as unknown as Record<string, unknown>,
  };
  let finalConfig = config;
  if (config.preRequestScript.trim() !== '') {
    try {
      runScript(config.preRequestScript, host);
      finalConfig = buildConfigFromState(requestState, config);
    } catch (err) {
      newLog('error', `Pre-request script error: ${message(err)}`, logs);
    }
  }
  return { config: finalConfig, logs, envVars };
};
const buildResponseState = (
  response: ResponseMeta
): Record<string, unknown> => {
  let parsed: unknown;
  try {
    parsed = JSON.parse(response.body);
  } catch {
    parsed = undefined;
  }
  return {
    code: response.status,
    statusText: response.statusText,
    headers: response.headers,
    body: response.body,
    json: parsed,
    time: response.timeMs,
    size: response.sizeBytes,
  };
};

export const runTestScript = (
  config: RequestConfig,
  response: ResponseMeta,
  envVars: Record<string, string>
): { results: TestResult[]; logs: ScriptLog[]; error?: string } => {
  const logs: ScriptLog[] = [];
  const results: TestResult[] = [];
  const requestState = buildRequestState(config);
  const responseState = buildResponseState(response);
  const host: SandboxHost = {
    ...baseHost(envVars),
    log: (level, text) => newLog(level, text, logs),
    test: (name, passed, error) =>
      results.push({ id: uid(), name, passed, error }),
    requestState: requestState as unknown as Record<string, unknown>,
    responseState,
  };
  let error: string | undefined;
  if (config.testScript.trim() !== '') {
    try {
      runScript(config.testScript, host);
    } catch (err) {
      error = message(err);
      newLog('error', `Test script error: ${error}`, logs);
    }
  }
  return { results, logs, error };
};

export const expandConfigVars = (
  config: RequestConfig,
  envVars: Record<string, string>
): RequestConfig => {
  const resolve = (name: string): string | undefined => envVars[name];
  const expandRow = (row: KeyValue): KeyValue => ({
    ...row,
    key: expandDynamicVars(row.key, resolve),
    value: expandDynamicVars(row.value, resolve),
  });
  return {
    ...config,
    url: expandDynamicVars(config.url, resolve),
    params: config.params.map(expandRow),
    headers: config.headers.map(expandRow),
    body: expandDynamicVars(config.body, resolve),
    formData: config.formData.map(expandRow),
    graphqlQuery: expandDynamicVars(config.graphqlQuery, resolve),
    graphqlVariables: expandDynamicVars(config.graphqlVariables, resolve),
    token: expandDynamicVars(config.token, resolve),
    username: expandDynamicVars(config.username, resolve),
    password: expandDynamicVars(config.password, resolve),
  };
};
