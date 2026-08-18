import { useCallback, useEffect, useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((previous: T) => T)) => void] => {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored) setValue(JSON.parse(stored) as T);
    } catch {
      // ignore invalid stored value
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage may be unavailable (private mode)
    }
  }, [key, value, hydrated]);

  const setStoredValue = useCallback((next: T | ((previous: T) => T)) => {
    setValue((previous) =>
      typeof next === 'function' ? (next as (previous: T) => T)(previous) : next
    );
  }, []);

  return [value, setStoredValue];
};
