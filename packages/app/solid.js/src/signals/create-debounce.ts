import { createSignal, onCleanup } from 'solid-js';

export const useDebounce = <T>(value: T, delay = 400) => {
  const [debounced, setDebounced] = createSignal(value);

  const id = setTimeout(() => setDebounced(value), delay);
  onCleanup(() => clearTimeout(id));

  return debounced;
};
