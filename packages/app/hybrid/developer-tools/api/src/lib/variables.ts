import { EnvironmentVariable, RequestConfig } from '@/types/api-client';

const uid = (): string => Math.random().toString(36).slice(2, 10);

export const newEnvironmentVariable = (): EnvironmentVariable => ({
  id: uid(),
  key: '',
  value: '',
  enabled: true,
});

export const substitute = (
  value: string,
  vars: Record<string, string>
): string =>
  value.replace(
    /\{\{\s*([A-Za-z0-9_.-]+)\s*\}\}/g,
    (match, key: string) => vars[key] ?? match
  );

export const substituteConfig = (
  config: RequestConfig,
  env: EnvironmentVariable[]
): RequestConfig => {
  const map: Record<string, string> = {};
  for (const variable of env) {
    if (variable.enabled && variable.key.trim() !== '') {
      map[variable.key.trim()] = variable.value;
    }
  }
  return {
    ...config,
    url: substitute(config.url, map),
    params: config.params.map((param) => ({
      ...param,
      key: substitute(param.key, map),
      value: substitute(param.value, map),
    })),
    headers: config.headers.map((header) => ({
      ...header,
      key: substitute(header.key, map),
      value: substitute(header.value, map),
    })),
    body: substitute(config.body, map),
    token: substitute(config.token, map),
    username: substitute(config.username, map),
    password: substitute(config.password, map),
  };
};

const ENV_KEY = 'api-client:env';

export const loadEnvironment = (): EnvironmentVariable[] => {
  try {
    const raw = localStorage.getItem(ENV_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as EnvironmentVariable[]) : [];
  } catch {
    return [];
  }
};

export const saveEnvironment = (variables: EnvironmentVariable[]): void => {
  try {
    localStorage.setItem(ENV_KEY, JSON.stringify(variables));
  } catch {
    // storage full or unavailable — ignore
  }
};
