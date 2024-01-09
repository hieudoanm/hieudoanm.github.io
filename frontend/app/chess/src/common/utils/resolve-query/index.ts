import { ParsedUrlQuery } from 'node:querystring';

export const resolveQuery = <T>(
  query: ParsedUrlQuery,
  key: string,
  fallback: string = ''
): string => {
  const value: string | string[] | undefined = query[key];
  if (!value) {
    return fallback;
  }
  if (typeof value === 'string') {
    return value;
  }
  return value[0];
};
