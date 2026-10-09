'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  freshDuck,
  isDraw as checkDraw,
  moveDuck,
  placeMark,
  undoDuckMove,
  type DuckState,
} from './utils';

export interface UseDuckResult extends DuckState {
  draw: boolean;
  play: (idx: number) => void;
  undo: () => void;
  reset: () => void;
}

export const useDuck = (): UseDuckResult => {
  const [state, setState] = useState<DuckState>(freshDuck);

  const play = useCallback((idx: number): void => {
    setState((prev) =>
      prev.phase === 'mark' ? placeMark(prev, idx) : moveDuck(prev, idx)
    );
  }, []);

  const undo = useCallback((): void => {
    setState(undoDuckMove);
  }, []);

  const reset = useCallback((): void => {
    setState(freshDuck());
  }, []);

  return useMemo(
    () => ({ ...state, draw: checkDraw(state), play, undo, reset }),
    [state, play, undo, reset]
  );
};
