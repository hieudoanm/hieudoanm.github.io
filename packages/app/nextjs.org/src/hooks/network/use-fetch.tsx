import { useState, useEffect } from 'react';

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useFetch<T = unknown>(url: string, options?: RequestInit) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setState({ data: null, loading: true, error: null });

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const data = (await response.json()) as T;
        setState({ data, loading: false, error: null });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setState({ data: null, loading: false, error: error as Error });
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, JSON.stringify(options)]); // re-run if URL or options change

  return state;
}
