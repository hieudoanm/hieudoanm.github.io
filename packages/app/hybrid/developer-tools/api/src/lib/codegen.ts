import {
  CodegenFormat,
  EnvironmentVariable,
  RequestConfig,
} from '@/types/api-client';

import { buildHeaders, buildUrl } from '@/lib/http';
import { substituteConfig } from '@/lib/variables';

const resolve = (
  config: RequestConfig,
  env?: EnvironmentVariable[]
): RequestConfig => (env ? substituteConfig(config, env) : config);

const encodeString = (value: string): string => JSON.stringify(value);

const prettyBody = (body: string): string | null => {
  try {
    return JSON.stringify(JSON.parse(body), null, 2);
  } catch {
    return null;
  }
};

const bodyLiteral = (body: string): string => {
  const pretty = prettyBody(body);
  return pretty ? `JSON.stringify(${pretty})` : encodeString(body);
};

const headerEntries = (config: RequestConfig): [string, string][] =>
  Object.entries(buildHeaders(config));

const generateCurl = (config: RequestConfig): string => {
  const url = buildUrl(config.url, config.params);
  const parts = [`curl -X ${config.method} '${url}'`];
  for (const [key, value] of headerEntries(config)) {
    parts.push(`  -H '${key}: ${value}'`);
  }
  const body = config.body.trim();
  if (body !== '') {
    parts.push(`  -d '${body.replace(/'/g, "'\\''")}'`);
  }
  return parts.join(' \\\n');
};

const initLines = (config: RequestConfig): string[] => {
  const lines: string[] = [];
  if (config.method !== 'GET') lines.push(`method: '${config.method}',`);
  const headers = headerEntries(config);
  if (headers.length > 0) {
    lines.push('headers: {');
    for (const [key, value] of headers) {
      lines.push(`  '${key}': '${value.replace(/'/g, "\\'")}',`);
    }
    lines.push('},');
  }
  const body = config.body.trim();
  if (body !== '') lines.push(`body: ${bodyLiteral(body)},`);
  return lines;
};

const indentLines = (lines: string[], indent: string): string[] =>
  lines.map((line) => `${indent}${line}`);

const generateFetch = (config: RequestConfig): string => {
  const url = buildUrl(config.url, config.params);
  return [
    `const response = await fetch(${encodeString(url)}, {`,
    ...indentLines(initLines(config), '  '),
    `});`,
  ].join('\n');
};

const capitalize = (segment: string): string =>
  segment.charAt(0).toUpperCase() + segment.slice(1);

const functionNameFromUrl = (url: string): string => {
  const path = url.replace(/^[a-z]+:\/\/[^/]+/i, '').split(/[?#]/)[0];
  const segments = path
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map(capitalize);
  const parts = segments.length > 0 ? segments : ['Request'];
  return `Request${parts.join('')}`;
};

const generateFetchTs = (config: RequestConfig): string => {
  const url = buildUrl(config.url, config.params);
  const name = functionNameFromUrl(config.url);
  return [
    `export async function ${name}(): Promise<Response> {`,
    `  const response = await fetch(${encodeString(url)}, {`,
    ...indentLines(initLines(config), '    '),
    `  });`,
    `  return response;`,
    `}`,
  ].join('\n');
};

export const generateCode = (
  format: CodegenFormat,
  config: RequestConfig,
  env?: EnvironmentVariable[]
): string => {
  const target = resolve(config, env);
  switch (format) {
    case 'curl':
      return generateCurl(target);
    case 'fetch':
      return generateFetch(target);
    case 'fetch-ts':
      return generateFetchTs(target);
  }
};
