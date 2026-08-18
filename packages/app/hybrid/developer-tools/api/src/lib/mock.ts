import {
  CollectionEntry,
  RequestCollection,
  RequestConfig,
  ResponseMeta,
} from '@/types/api-client';

export const pathnameOf = (url: string): string => {
  const clean = url.trim();
  if (clean === '') return '/';
  const scheme = clean.match(/^[a-z][a-z0-9+.-]*:\/\//i);
  let rest = clean;
  if (scheme) {
    rest = clean.slice(scheme[0].length);
    const slash = rest.indexOf('/');
    rest = slash === -1 ? '' : rest.slice(slash);
  }
  return rest.split('?')[0] || '/';
};

const segmentMatches = (pattern: string, actual: string): boolean => {
  if (pattern === actual) return true;
  if (pattern.startsWith('{') && pattern.endsWith('}')) return true;
  if (pattern.startsWith(':')) return true;
  return false;
};

export const findMockEntry = (
  collection: RequestCollection,
  config: RequestConfig
): CollectionEntry | null => {
  const actualSegments = pathnameOf(config.url)
    .split('/')
    .filter((segment) => segment !== '');
  const method = config.method.toUpperCase();
  for (const group of collection.groups) {
    for (const entry of group.entries) {
      if (entry.request.method.toUpperCase() !== method) continue;
      const patternSegments = pathnameOf(entry.request.url)
        .split('/')
        .filter((segment) => segment !== '');
      if (patternSegments.length !== actualSegments.length) continue;
      if (
        patternSegments.every((segment, index) =>
          segmentMatches(segment, actualSegments[index])
        )
      ) {
        return entry;
      }
    }
  }
  return null;
};

export const buildMockResponse = (
  entry: CollectionEntry,
  config: RequestConfig
): ResponseMeta => {
  const body =
    entry.examples?.[0]?.body ??
    JSON.stringify({
      message: `Mock response for ${entry.name}`,
      url: config.url,
    });
  return {
    status: 200,
    statusText: 'OK',
    url: config.url,
    headers: { 'content-type': 'application/json' },
    body,
    timeMs: 0,
    sizeBytes: new Blob([body]).size,
  };
};

export const findMockTarget = (
  collections: RequestCollection[],
  config: RequestConfig
): { collectionName: string; entryName: string } | null => {
  for (const collection of collections) {
    const entry = findMockEntry(collection, config);
    if (entry)
      return { collectionName: collection.name, entryName: entry.name };
  }
  return null;
};

export const tryMock = (
  collections: RequestCollection[],
  config: RequestConfig
): ResponseMeta | null => {
  for (const collection of collections) {
    const entry = findMockEntry(collection, config);
    if (entry) return buildMockResponse(entry, config);
  }
  return null;
};
