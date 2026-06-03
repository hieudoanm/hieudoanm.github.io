import { useEffect, useRef } from 'react';

export const useTimeout = (
  callback: () => void,
  delay: number | null
): void => {
  const savedCallback = useRef<() => void>(null);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof delay !== 'number') return;

    const id = setTimeout(() => {
      savedCallback.current?.();
    }, delay);

    return () => clearTimeout(id);
  }, [delay]);
};
