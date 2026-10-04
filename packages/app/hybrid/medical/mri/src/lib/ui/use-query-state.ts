'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Filters, selected runs and the active tab live in the URL so a finding can be
 * pasted to a colleague and reopened exactly.
 */
export const useQueryState = <TValue>(
  key: string,
  fallback: TValue,
  parse: (raw: string) => TValue,
  serialise: (value: TValue) => string
) => {
  const read = (): TValue => {
    if (typeof window === 'undefined') return fallback;
    const raw = new URLSearchParams(window.location.search).get(key);
    if (raw === null) return fallback;
    try {
      return parse(raw);
    } catch {
      return fallback;
    }
  };
  const [value, setValue] = useState<TValue>(read);

  const write = useCallback(
    (next: TValue) => {
      setValue(next);
      const params = new URLSearchParams(window.location.search);
      const serialised = serialise(next);
      if (serialised === serialise(fallback)) params.delete(key);
      else params.set(key, serialised);
      const query = params.toString();
      window.history.replaceState(
        null,
        '',
        query ? `?${query}` : window.location.pathname
      );
    },
    [fallback, key, serialise]
  );

  useEffect(() => {
    const onPop = () => setValue(read());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return [value, write] as const;
};

export const parseCsvParam = (raw: string): string[] =>
  raw
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);

export const serialiseCsvParam = (values: string[]): string => values.join(',');

export const parseJsonParam = <T>(raw: string): T | null => {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

export const serialiseJsonParam = (value: unknown): string =>
  JSON.stringify(value ?? null);
