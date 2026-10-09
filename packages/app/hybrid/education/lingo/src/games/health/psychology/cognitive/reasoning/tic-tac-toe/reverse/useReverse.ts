'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  applyReverseMove,
  freshReverse,
  undoReverseMove,
  type ReverseState,
} from './utils';

export interface UseReverseResult extends ReverseState {
  play: (idx: number) => void;
  undo: () => void;
  reset: () => void;
}

export const useReverse = (): UseReverseResult => {
  const [state, setState] = useState<ReverseState>(freshReverse);

  const play = useCallback((idx: number): void => {
    setState((prev) => applyReverseMove(prev, idx));
  }, []);

  const undo = useCallback((): void => {
    setState(undoReverseMove);
  }, []);

  const reset = useCallback((): void => {
    setState(freshReverse());
  }, []);

  return useMemo(
    () => ({ ...state, play, undo, reset }),
    [state, play, undo, reset]
  );
};
