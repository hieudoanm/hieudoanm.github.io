import { CrossReferenceResponse, Reference } from './crossref.dto.js';

const tryCatch = async <T>(
  promise: Promise<T>
): Promise<{ data: T | null; error: Error | null }> => {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const getId = (url: string): string | null => {
  try {
    return url.replace(/^https?:\/\/(dx\.)?doi\.org\//, '');
  } catch {
    return null;
  }
};

const DEFAULT_PROXY_URL = 'https://hieudoanm-proxy.vercel.app/api';

export const getWork = async (
  id: string,
  proxyUrl: string = DEFAULT_PROXY_URL,
  {
    timeoutMs = 60000,
  }: {
    timeoutMs?: number;
  } = { timeoutMs: 60000 }
): Promise<{ reference: Reference | null }> => {
  const abortController: AbortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), timeoutMs);
  const url: string = `https://api.crossref.org/works/${id}`;
  const urlSearchParams: URLSearchParams = new URLSearchParams();
  urlSearchParams.append('url', url);
  const fullProxyUrl: string = `${proxyUrl}?${urlSearchParams.toString()}`;
  const method: string = 'GET';
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  const { data: response, error } = await tryCatch(
    fetch(fullProxyUrl, { method, headers, signal: abortController.signal })
  );
  if (error) {
    clearTimeout(timeout);
    return { reference: null };
  }
  if (!response?.ok) {
    clearTimeout(timeout);
    return { reference: null };
  }
  const data: CrossReferenceResponse = await response.json();
  clearTimeout(timeout);
  const { message } = data;
  const published = message['published-print'] ??
    message['published-online'] ?? { 'date-parts': [[]] };
  return {
    reference: {
      id,
      authors: message.author ?? [],
      title: message.title.at(0) ?? '',
      journal: message['container-title'].at(0) ?? '',
      volume: message.volume,
      issue: message.issue,
      pages: message.page,
      year: published['date-parts'].at(0)?.at(0) ?? 0,
      url: `https://doi.org/${id}`,
    },
  };
};
