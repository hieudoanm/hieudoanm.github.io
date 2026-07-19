import { BodyType, KeyValue, RequestConfig } from '@/types/api-client';

export type FormFiles = Record<string, File>;

const enabledRows = (rows: KeyValue[]): KeyValue[] =>
  rows.filter((row) => row.enabled && row.key.trim() !== '');

const buildFormData = (rows: KeyValue[], files?: FormFiles): FormData => {
  const form = new FormData();
  for (const row of enabledRows(rows)) {
    const file = files?.[row.id];
    if (file) {
      form.append(row.key.trim(), file, file.name);
    } else {
      form.append(row.key.trim(), row.value);
    }
  }
  return form;
};

const buildUrlEncoded = (rows: KeyValue[]): string =>
  enabledRows(rows)
    .map(
      (row) =>
        `${encodeURIComponent(row.key.trim())}=${encodeURIComponent(row.value)}`
    )
    .join('&');

const buildGraphql = (config: RequestConfig): string => {
  let variables: Record<string, unknown> | undefined;
  if (config.graphqlVariables.trim() !== '') {
    try {
      variables = JSON.parse(config.graphqlVariables) as Record<
        string,
        unknown
      >;
    } catch {
      variables = undefined;
    }
  }
  return JSON.stringify({
    query: config.graphqlQuery,
    ...(variables ? { variables } : {}),
  });
};

export const buildRequestBody = (
  config: RequestConfig,
  files?: FormFiles
): string | FormData | undefined => {
  if (config.bodyType === 'form') {
    return buildFormData(config.formData, files);
  }
  if (config.bodyType === 'urlencoded') {
    const encoded = buildUrlEncoded(config.formData);
    return encoded === '' ? undefined : encoded;
  }
  if (config.bodyType === 'graphql') {
    return config.graphqlQuery.trim() === '' ? undefined : buildGraphql(config);
  }
  const body = config.body.trim();
  return body === '' ? undefined : body;
};

export const contentTypeFor = (config: RequestConfig): string | undefined => {
  if (config.bodyType === 'form') return undefined;
  if (config.bodyType === 'urlencoded') {
    return 'application/x-www-form-urlencoded';
  }
  if (config.bodyType === 'graphql') return 'application/json';
  return undefined;
};

export const bodyTypes: readonly { id: BodyType; label: string }[] = [
  { id: 'raw', label: 'Raw' },
  { id: 'form', label: 'Form Data' },
  { id: 'urlencoded', label: 'URL Encoded' },
  { id: 'graphql', label: 'GraphQL' },
];
