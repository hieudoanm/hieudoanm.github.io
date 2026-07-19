import { createEffect, createSignal } from 'solid-js';

export const createDebounce = <T>(value: T, delay = 400): T => {
  const [debounced, setDebounced] = createSignal(value);

  createEffect(() => {
    const v = value;
    const id = setTimeout(() => setDebounced(() => v), delay);
    return () => clearTimeout(id);
  });

  return debounced();
};
