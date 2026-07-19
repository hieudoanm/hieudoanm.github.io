'use client';

import { useCallback, useMemo, useState } from 'react';
import type { Player } from '../_shared/board';
import {
  applyWildMove,
  freshWild,
  selectMark,
  undoWildMove,
  type WildState,
} from './utils';

export interface UseWildResult extends WildState {
  play: (idx: number) => void;
  chooseMark: (mark: Player) => void;
  undo: () => void;
  reset: () => void;
}

export const useWild = (): UseWildResult => {
  const [state, setState] = useState<WildState>(freshWild);

  const play = useCallback((idx: number): void => {
    setState((prev) => applyWildMove(prev, idx));
  }, []);

  const chooseMark = useCallback((mark: Player): void => {
    setState((prev) => selectMark(prev, mark));
  }, []);

  const undo = useCallback((): void => {
    setState(undoWildMove);
  }, []);

  const reset = useCallback((): void => {
    setState(freshWild());
  }, []);

  return useMemo(
    () => ({ ...state, play, chooseMark, undo, reset }),
    [state, play, chooseMark, undo, reset]
  );
};
