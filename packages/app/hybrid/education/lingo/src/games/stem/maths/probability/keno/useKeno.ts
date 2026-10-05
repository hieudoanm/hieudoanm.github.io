'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  drawNumbers,
  INITIAL_CREDITS,
  MAX_PICKS,
  playKeno,
  quickPick,
  STAKE,
} from './utils';
import type { KenoDraw } from './types';

export interface UseKenoResult {
  selected: number[];
  credits: number;
  draw: KenoDraw | null;
  canPlay: boolean;
  toggle: (number_: number) => void;
  clear: () => void;
  autoPick: () => void;
  play: () => void;
}

export const useKeno = (): UseKenoResult => {
  const [selected, setSelected] = useState<number[]>([]);
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [draw, setDraw] = useState<KenoDraw | null>(null);

  const toggle = useCallback((number_: number): void => {
    setSelected((current) => {
      if (current.includes(number_))
        return current.filter((value) => value !== number_);
      if (current.length >= MAX_PICKS) return current;
      return [...current, number_].sort((a, b) => a - b);
    });
    setDraw(null);
  }, []);

  const clear = useCallback((): void => {
    setSelected([]);
    setDraw(null);
  }, []);

  const autoPick = useCallback((): void => {
    setSelected(quickPick(MAX_PICKS));
    setDraw(null);
  }, []);

  const play = useCallback((): void => {
    if (selected.length === 0 || credits < STAKE) return;
    const result = playKeno(selected, drawNumbers());
    setCredits((balance) => balance - STAKE + result.won);
    setDraw(result);
  }, [credits, selected]);

  return useMemo(
    () => ({
      selected,
      credits,
      draw,
      canPlay: selected.length > 0 && credits >= STAKE,
      toggle,
      clear,
      autoPick,
      play,
    }),
    [autoPick, clear, credits, draw, play, selected, toggle]
  );
};
