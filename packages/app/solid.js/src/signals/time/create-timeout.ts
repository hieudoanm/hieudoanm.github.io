import { createEffect, onCleanup } from 'solid-js';

export const useTimeout = (
  callback: () => void,
  delay: number | null
): void => {
  createEffect(() => {
    if (typeof delay !== 'number') return;

    const id = setTimeout(() => {
      callback();
    }, delay);

    onCleanup(() => clearTimeout(id));
  });
};
