'use client';

import { useCallback, useMemo, useState } from 'react';
import { applyT3Move, freshT3, undoT3Move, type T3State } from './utils';

export interface UseT3Result extends T3State {
  play: (idx: number) => void;
  undo: () => void;
  reset: () => void;
}

export const useT3 = (): UseT3Result => {
  const [state, setState] = useState<T3State>(freshT3);

  const play = useCallback((idx: number): void => {
    setState((prev) => applyT3Move(prev, idx));
  }, []);

  const undo = useCallback((): void => {
    setState(undoT3Move);
  }, []);

  const reset = useCallback((): void => {
    setState(freshT3());
  }, []);

  return useMemo(
    () => ({ ...state, play, undo, reset }),
    [state, play, undo, reset]
  );
};
