'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface Resource<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

/**
 * Loads a value from Rust once per mount and on demand. Errors are messages,
 * not exceptions: a missing project folder is a normal state in this app.
 */
export const useResource = <T>(
  load: () => Promise<T>,
  dependencies: unknown[] = []
): Resource<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const loadRef = useRef(load);
  loadRef.current = load;

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setData(await loadRef.current());
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : String(caught));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, error, loading, refresh };
};
