import { RequestConfig } from '@/types/api-client';

import { emptyRequest } from '@/lib/http';

export const requestToJson = (config: RequestConfig): string =>
  JSON.stringify(config, null, 2);

export const jsonToRequest = (json: string): RequestConfig | null => {
  try {
    const parsed: unknown = JSON.parse(json);
    if (typeof parsed !== 'object' || parsed === null) return null;
    const candidate = parsed as Partial<RequestConfig>;
    if (typeof candidate.method !== 'string') return null;
    return { ...emptyRequest(), ...candidate };
  } catch {
    return null;
  }
};

export const downloadRequest = (
  config: RequestConfig,
  filename = 'request.json'
): void => {
  const blob = new Blob([requestToJson(config)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

export const readTextFile = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });

export const downloadFile = (
  content: string,
  filename: string,
  type: string
): void => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

export const readRequestFile = (file: File): Promise<RequestConfig | null> =>
  readTextFile(file)
    .then(jsonToRequest)
    .catch(() => null);
