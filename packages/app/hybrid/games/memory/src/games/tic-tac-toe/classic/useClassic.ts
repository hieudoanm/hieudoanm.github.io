'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  applyClassicMove,
  freshClassic,
  undoClassicMove,
  type ClassicState,
} from './utils';

export interface UseClassicResult extends ClassicState {
  play: (idx: number) => void;
  undo: () => void;
  reset: () => void;
}

export const useClassic = (): UseClassicResult => {
  const [state, setState] = useState<ClassicState>(freshClassic);

  const play = useCallback((idx: number): void => {
    setState((prev) => applyClassicMove(prev, idx));
  }, []);

  const undo = useCallback((): void => {
    setState(undoClassicMove);
  }, []);

  const reset = useCallback((): void => {
    setState(freshClassic());
  }, []);

  return useMemo(
    () => ({ ...state, play, undo, reset }),
    [state, play, undo, reset]
  );
};
