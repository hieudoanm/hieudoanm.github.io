'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_DIAGRAM } from '@/lib/default';
import { parseDiagram } from '@/lib/parser';
import type { ParseResult } from '@/lib/types';

const STORAGE_KEY = 'diagram-editor:text';
const HISTORY_LIMIT = 100;

const loadInitial = (): string => {
  if (typeof window === 'undefined') return DEFAULT_DIAGRAM;
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? DEFAULT_DIAGRAM;
  } catch {
    return DEFAULT_DIAGRAM;
  }
};

export const useDiagramState = (): {
  text: string;
  setText: (value: string) => void;
  parsed: ParseResult;
  reset: () => void;
  importText: (value: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
} => {
  const [text, setTextState] = useState<string>(loadInitial);
  const textRef = useRef(text);
  const historyRef = useRef<string[]>([]);
  const futureRef = useRef<string[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, text);
    } catch {
      // ignore storage errors
    }
  }, [text]);

  const parsed = useMemo<ParseResult>(() => parseDiagram(text), [text]);

  const syncFlags = useCallback((): void => {
    setCanUndo(historyRef.current.length > 0);
    setCanRedo(futureRef.current.length > 0);
  }, []);

  const setText = useCallback(
    (value: string): void => {
      const current = textRef.current;
      if (value === current) return;
      const isContinuation =
        historyRef.current.length > 0 && value.startsWith(current);
      if (!isContinuation) {
        historyRef.current.push(current);
        if (historyRef.current.length > HISTORY_LIMIT) {
          historyRef.current.shift();
        }
      }
      futureRef.current = [];
      textRef.current = value;
      setTextState(value);
      syncFlags();
    },
    [syncFlags]
  );

  const undo = useCallback((): void => {
    const previous = historyRef.current.pop();
    if (previous === undefined) return;
    futureRef.current.push(textRef.current);
    textRef.current = previous;
    setTextState(previous);
    syncFlags();
  }, [syncFlags]);

  const redo = useCallback((): void => {
    const next = futureRef.current.pop();
    if (next === undefined) return;
    historyRef.current.push(textRef.current);
    if (historyRef.current.length > HISTORY_LIMIT) {
      historyRef.current.shift();
    }
    textRef.current = next;
    setTextState(next);
    syncFlags();
  }, [syncFlags]);

  const reset = useCallback((): void => {
    if (textRef.current !== DEFAULT_DIAGRAM) {
      historyRef.current.push(textRef.current);
      if (historyRef.current.length > HISTORY_LIMIT) {
        historyRef.current.shift();
      }
    }
    futureRef.current = [];
    textRef.current = DEFAULT_DIAGRAM;
    setTextState(DEFAULT_DIAGRAM);
    syncFlags();
  }, [syncFlags]);

  const importText = useCallback(
    (value: string): void => {
      setText(value);
    },
    [setText]
  );

  return {
    text,
    setText,
    parsed,
    reset,
    importText,
    undo,
    redo,
    canUndo,
    canRedo,
  };
};
