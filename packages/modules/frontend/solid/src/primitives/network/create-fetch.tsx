import { createSignal, onCleanup } from 'solid-js';

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function createFetch<T = unknown>(url: string, options?: RequestInit) {
  const [state, setState] = createSignal<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

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

  onCleanup(() => controller.abort());

  return state;
}
