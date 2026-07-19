'use client';

import { useCallback, useMemo, useState } from 'react';
import { INITIAL_CREDITS, BET_AMOUNT, playSpin, spinNumber } from './utils';
import type { Phase, RouletteBet } from './types';

export interface UseRouletteResult {
  phase: Phase;
  credits: number;
  bet: RouletteBet | null;
  landed: number | null;
  lastWon: number;
  selectBet: (bet: RouletteBet) => void;
  spin: () => void;
  nextRound: () => void;
}

export const useRoulette = (): UseRouletteResult => {
  const [phase, setPhase] = useState<Phase>('bet');
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [bet, setBet] = useState<RouletteBet | null>(null);
  const [landed, setLanded] = useState<number | null>(null);
  const [lastWon, setLastWon] = useState(0);

  const selectBet = useCallback((next: RouletteBet): void => {
    setBet(next);
  }, []);

  const spin = useCallback((): void => {
    if (!bet || credits < BET_AMOUNT) return;
    const outcome = playSpin(bet, spinNumber());
    setCredits((balance) => balance - BET_AMOUNT + outcome.won);
    setLanded(outcome.number);
    setLastWon(outcome.won);
    setPhase('result');
  }, [bet, credits]);

  const nextRound = useCallback((): void => {
    setBet(null);
    setLanded(null);
    setLastWon(0);
    setPhase('bet');
  }, []);

  return useMemo(
    () => ({
      phase,
      credits,
      bet,
      landed,
      lastWon,
      selectBet,
      spin,
      nextRound,
    }),
    [bet, credits, landed, lastWon, nextRound, phase, selectBet, spin]
  );
};
