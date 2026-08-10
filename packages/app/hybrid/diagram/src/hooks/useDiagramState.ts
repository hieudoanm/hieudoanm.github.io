'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_DIAGRAM } from '@/lib/default';
import { parseDiagram } from '@/lib/parser';
import type { ParseResult } from '@/lib/types';

const STORAGE_KEY = 'diagram-editor:text';

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
} => {
  const [text, setText] = useState<string>(loadInitial);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, text);
    } catch {
      // ignore storage errors
    }
  }, [text]);

  const parsed = useMemo<ParseResult>(() => parseDiagram(text), [text]);

  const reset = useCallback((): void => {
    setText(DEFAULT_DIAGRAM);
  }, []);

  const importText = useCallback((value: string): void => {
    setText(value);
  }, []);

  return { text, setText, parsed, reset, importText };
};
