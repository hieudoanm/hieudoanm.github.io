'use client';

import { useCallback, useMemo, useState } from 'react';
import { BET_AMOUNT, INITIAL_CREDITS } from './utils';
import type { Bet, Phase, Result } from './types';
import { playRound } from './utils';

export interface UseOverUnderSevenResult {
  phase: Phase;
  credits: number;
  dice: [number, number];
  bet: Bet | null;
  lastWon: number;
  result: Result | null;
  selectBet: (bet: Bet) => void;
  rollDice: () => void;
  nextRound: () => void;
}

export const useOverUnderSeven = (): UseOverUnderSevenResult => {
  const [phase, setPhase] = useState<Phase>('bet');
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [dice, setDice] = useState<[number, number]>([1, 1]);
  const [bet, setBet] = useState<Bet | null>(null);
  const [lastWon, setLastWon] = useState(0);
  const [result, setResult] = useState<Result | null>(null);

  const selectBet = useCallback((next: Bet): void => {
    setBet(next);
  }, []);

  const rollDice = useCallback((): void => {
    if (!bet || credits < BET_AMOUNT) return;
    const outcome = playRound(bet);
    setCredits((balance) => balance - BET_AMOUNT + outcome.won);
    setDice(outcome.dice);
    setLastWon(outcome.won);
    setResult(outcome.result);
    setPhase('result');
  }, [bet, credits]);

  const nextRound = useCallback((): void => {
    setBet(null);
    setLastWon(0);
    setResult(null);
    setPhase('bet');
  }, []);

  return useMemo(
    () => ({
      phase,
      credits,
      dice,
      bet,
      lastWon,
      result,
      selectBet,
      rollDice,
      nextRound,
    }),
    [bet, credits, dice, lastWon, nextRound, phase, result, rollDice, selectBet]
  );
};
