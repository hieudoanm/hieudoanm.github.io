import { useCallback, useEffect, useRef, useState } from 'react';

const LIMIT = 20;
const DEBOUNCE_MS = 500;

interface HistoryResult<T> {
  present: T;
  set: (value: T | ((previous: T) => T)) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  reset: (value: T) => void;
}

export const useHistory = <T>(initial: T, key: string): HistoryResult<T> => {
  const [present, setPresent] = useState<T>(initial);
  const historyRef = useRef<T[]>([]);
  const futureRef = useRef<T[]>([]);
  const pendingRef = useRef<T | null>(null);
  const timerRef = useRef<number | null>(null);
  const previousRef = useRef<T>(present);
  const suppressRef = useRef(false);
  const [hydrated, setHydrated] = useState(false);
  const [, setVersion] = useState(0);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored) as T;
        setPresent(parsed);
        previousRef.current = parsed;
      }
    } catch {
      // ignore invalid stored value
    }
    try {
      const history = window.localStorage.getItem(`${key}.history`);
      historyRef.current = history ? (JSON.parse(history) as T[]) : [];
    } catch {
      historyRef.current = [];
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(present));
    } catch {
      // storage may be unavailable (private mode)
    }
  }, [key, present, hydrated]);

  const persistStacks = useCallback(() => {
    try {
      window.localStorage.setItem(
        `${key}.history`,
        JSON.stringify(historyRef.current)
      );
    } catch {
      // storage may be unavailable (private mode)
    }
    try {
      window.localStorage.setItem(
        `${key}.future`,
        JSON.stringify(futureRef.current)
      );
    } catch {
      // storage may be unavailable (private mode)
    }
  }, [key]);

  const bump = useCallback(() => setVersion((version) => version + 1), []);

  const commitPending = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (pendingRef.current === null) return;
    historyRef.current = [...historyRef.current, pendingRef.current].slice(
      -LIMIT
    );
    pendingRef.current = null;
    persistStacks();
    bump();
  }, [bump, persistStacks]);

  useEffect(() => {
    if (!hydrated) return;
    const previous = previousRef.current;
    previousRef.current = present;
    if (previous === present) return;
    if (suppressRef.current) {
      suppressRef.current = false;
      return;
    }
    futureRef.current = [];
    pendingRef.current = previous;
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(commitPending, DEBOUNCE_MS);
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [present, commitPending, hydrated]);

  const set = useCallback((next: T | ((previous: T) => T)) => {
    setPresent((current) =>
      typeof next === 'function' ? (next as (previous: T) => T)(current) : next
    );
  }, []);

  const undo = useCallback(() => {
    commitPending();
    if (historyRef.current.length === 0) return;
    const value = historyRef.current.pop() as T;
    futureRef.current = [...futureRef.current, present].slice(-LIMIT);
    suppressRef.current = true;
    setPresent(value);
    persistStacks();
    bump();
  }, [bump, commitPending, persistStacks, present]);

  const redo = useCallback(() => {
    if (futureRef.current.length === 0) return;
    const value = futureRef.current.pop() as T;
    historyRef.current = [...historyRef.current, present].slice(-LIMIT);
    suppressRef.current = true;
    setPresent(value);
    persistStacks();
    bump();
  }, [bump, persistStacks, present]);

  const reset = useCallback(
    (value: T) => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = null;
      pendingRef.current = null;
      historyRef.current = [];
      futureRef.current = [];
      suppressRef.current = true;
      setPresent(value);
      persistStacks();
      bump();
    },
    [bump, persistStacks]
  );

  return {
    present,
    set,
    undo,
    redo,
    canUndo: historyRef.current.length > 0,
    canRedo: futureRef.current.length > 0,
    reset,
  };
};
