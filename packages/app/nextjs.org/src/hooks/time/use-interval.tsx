import { useEffect, useRef } from 'react';

export const useInterval = (
  callback: () => void,
  delay: number | null
): void => {
  const savedCallback = useRef<() => void>(null);

  // Store the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (delay === null || delay === undefined) return;

    const tick = () => {
      savedCallback.current?.();
    };

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};
