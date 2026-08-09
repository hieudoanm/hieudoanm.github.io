import { useCallback, useEffect, useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((previous: T) => T)) => void] => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage may be unavailable (private mode)
    }
  }, [key, value]);

  const setStoredValue = useCallback((next: T | ((previous: T) => T)) => {
    setValue((previous) =>
      typeof next === 'function' ? (next as (previous: T) => T)(previous) : next
    );
  }, []);

  return [value, setStoredValue];
};
