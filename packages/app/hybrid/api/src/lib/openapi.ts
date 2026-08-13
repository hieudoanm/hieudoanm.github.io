import {
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
