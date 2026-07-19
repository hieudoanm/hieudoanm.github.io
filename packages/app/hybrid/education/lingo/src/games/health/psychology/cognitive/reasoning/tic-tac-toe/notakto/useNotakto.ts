'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  applyNotaktoMove,
  freshNotakto,
  undoNotaktoMove,
  type NotaktoState,
} from './utils';

export interface UseNotaktoResult extends NotaktoState {
  play: (idx: number) => void;
  undo: () => void;
  reset: () => void;
}

export const useNotakto = (): UseNotaktoResult => {
  const [state, setState] = useState<NotaktoState>(freshNotakto);

  const play = useCallback((idx: number): void => {
    setState((prev) => applyNotaktoMove(prev, idx));
  }, []);

  const undo = useCallback((): void => {
    setState(undoNotaktoMove);
  }, []);

  const reset = useCallback((): void => {
    setState(freshNotakto());
  }, []);

  return useMemo(
    () => ({ ...state, play, undo, reset }),
    [state, play, undo, reset]
  );
};
