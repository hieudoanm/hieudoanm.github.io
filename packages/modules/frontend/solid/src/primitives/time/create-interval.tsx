import { createEffect, onCleanup } from 'solid-js';

export const createInterval = (
  callback: () => void,
  delay: number | null
): void => {
  createEffect(() => {
    const d = delay;
    if (d === null || d === undefined) return;

    const id = setInterval(callback, d);
    onCleanup(() => clearInterval(id));
  });
};
