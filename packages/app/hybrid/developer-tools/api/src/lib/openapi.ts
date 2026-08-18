import {
  CollectionEntry,
  HttpMethod,
  OpenApiOperation,
  RequestCollection,
  RequestConfig,
} from '@/types/api-client';

import { emptyRequest, uid } from '@/lib/http';

const METHODS = [
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'head',
  'options',
] as const;

const parseSpec = (specText: string): unknown => {
  try {
    return JSON.parse(specText);
  } catch {
    return null;
  }
};

export const parseOpenApi = (specText: string): OpenApiOperation[] => {
  const spec = parseSpec(specText);
  const paths =
    spec && typeof spec === 'object'
      ? (spec as { paths?: unknown }).paths
      : null;
  if (!paths || typeof paths !== 'object') return [];
  const operations: OpenApiOperation[] = [];
  for (const [path, pathItem] of Object.entries(paths)) {
    if (!pathItem || typeof pathItem !== 'object') continue;
    for (const [method, operation] of Object.entries(
      pathItem as Record<string, unknown>
    )) {
      if (!METHODS.includes(method as (typeof METHODS)[number])) continue;
      const op = operation as { summary?: string; operationId?: string };
      operations.push({
        id: op.operationId ?? `${method.toUpperCase()} ${path}`,
        method: method as HttpMethod,
        path,
        summary: op.summary ?? op.operationId ?? '',
      });
    }
  }
  return operations;
};

export const operationToRequest = (
  specText: string,
  operation: OpenApiOperation
): RequestConfig => {
  const request = emptyRequest();
  request.method = operation.method;
  request.url = operation.path;
  const spec = parseSpec(specText);
  const basePath =
    spec && typeof spec === 'object'
      ? (spec as { basePath?: unknown }).basePath
      : undefined;
  if (typeof basePath === 'string' && basePath.trim() !== '') {
    const prefix = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
    if (!request.url.startsWith(prefix))
      request.url = `${prefix}${request.url}`;
  }
  const pathItem =
    spec && typeof spec === 'object'
      ? (spec as { paths?: Record<string, unknown> }).paths?.[operation.path]
      : null;
  const op =
    pathItem && typeof pathItem === 'object'
      ? (pathItem as Record<string, unknown>)[operation.method.toLowerCase()]
      : null;
  const parameters =
    op && typeof op === 'object'
      ? ((op as { parameters?: unknown[] }).parameters ?? [])
      : [];
  const query = parameters.filter(
    (parameter): parameter is { name: string } =>
      typeof parameter === 'object' &&
      parameter !== null &&
      (parameter as { in?: string }).in === 'query'
  );
  request.params =
    query.length > 0
      ? query.map((parameter) => ({
          id: uid(),
          key: parameter.name,
          value: '',
          enabled: true,
        }))
      : request.params;
  return request;
};

export const openApiToCollection = (
  specText: string
): RequestCollection | null => {
  const operations = parseOpenApi(specText);
  if (operations.length === 0) return null;
  const group = {
    id: uid(),
    name: 'Operations',
    entries: operations.map((operation) => ({
      id: uid(),
      name: operation.summary || operation.id,
      request: operationToRequest(specText, operation),
    })),
  };
  return { id: uid(), name: 'Imported API', groups: [group] };
};

const pathKey = (url: string): string => {
  const clean = url.trim();
  if (clean === '') return '/';
  const scheme = clean.match(/^[a-z][a-z0-9+.-]*:\/\//i);
  if (scheme) {
    const rest = clean.slice(scheme[0].length);
    const slash = rest.indexOf('/');
    const path = slash === -1 ? '/' : rest.slice(slash).split('?')[0];
    return path || '/';
  }
  return clean.split('?')[0] || '/';
};

const exampleContent = (entry: CollectionEntry) => {
  const body = entry.examples?.[0]?.body;
  if (body === undefined) return undefined;
  try {
    return { 'application/json': { example: JSON.parse(body) } };
  } catch {
    return { 'text/plain': { example: body } };
  }
};

export const collectionToOpenApi = (collection: RequestCollection): string => {
  const paths: Record<string, Record<string, unknown>> = {};
  for (const group of collection.groups) {
    for (const entry of group.entries) {
      const method = entry.request.method.toLowerCase();
      const path = pathKey(entry.request.url);
      const pathItem = paths[path] ?? {};
      pathItem[method] = {
        summary: entry.name,
        tags: [group.name],
        parameters: entry.request.params
          .filter((row) => row.enabled && row.key.trim() !== '')
          .map((row) => ({
            name: row.key.trim(),
            in: 'query',
            schema: { type: 'string' },
          })),
        requestBody:
          entry.request.body.trim() !== ''
            ? {
                content: {
                  'application/json': {
                    schema: { type: 'string' },
                  },
                },
              }
            : undefined,
        responses: {
          '200': { description: 'OK', content: exampleContent(entry) },
        },
      };
      paths[path] = pathItem;
    }
  }
  return JSON.stringify(
    {
      openapi: '3.0.3',
      info: { title: collection.name, version: '1.0.0' },
      paths,
    },
    null,
    2
  );
};
