import { HttpMethod } from '@/types/api-client';

export const isJson = (text: string): boolean => {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
};

export const prettyPrint = (text: string): string => {
  if (!isJson(text)) return text;
  try {
    return JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    return text;
  }
};

export const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  const units: readonly string[] = ['KB', 'MB', 'GB'];
  let size = bytes;
  let unit = 'B';
  for (const next of units) {
    size /= 1024;
    unit = next;
    if (size < 1024) break;
  }
  return `${size.toFixed(1)} ${unit}`;
};

export const formatMs = (ms: number): string => `${ms} ms`;

export const statusColor = (status: number): string => {
  if (status >= 200 && status < 300) return 'badge-success';
  if (status >= 300 && status < 400) return 'badge-warning';
  if (status >= 400) return 'badge-error';
  return 'badge-neutral';
};

export const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: 'badge-success',
  POST: 'badge-warning',
  PUT: 'badge-info',
  PATCH: 'badge-info',
  DELETE: 'badge-error',
  HEAD: 'badge-neutral',
  OPTIONS: 'badge-neutral',
};

export const formatRelativeTime = (timestamp: number): string => {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

export type BodyPreviewKind = 'json' | 'html' | 'text' | 'raw';

export const previewKind = (
  headers: Record<string, string>
): BodyPreviewKind => {
  const contentType = (headers['content-type'] ?? '').toLowerCase();
  if (contentType.includes('application/json')) return 'json';
  if (contentType.includes('text/html')) return 'html';
  if (contentType.includes('text/')) return 'text';
  if (contentType.includes('xml')) return 'text';
  return 'raw';
};
