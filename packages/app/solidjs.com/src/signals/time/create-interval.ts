import { createEffect, onCleanup } from 'solid-js';

export const useInterval = (
  callback: () => void,
  delay: number | null
): void => {
  createEffect(() => {
    if (delay === null || delay === undefined) return;

    const id = setInterval(callback, delay);
    onCleanup(() => clearInterval(id));
  });
};
