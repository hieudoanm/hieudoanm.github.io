import { createEffect, onCleanup } from 'solid-js';

export const createTimeout = (
  callback: () => void,
  delay: number | null
): void => {
  createEffect(() => {
    const d = delay;
    if (typeof d !== 'number') return;

    const id = setTimeout(callback, d);
    onCleanup(() => clearTimeout(id));
  });
};
