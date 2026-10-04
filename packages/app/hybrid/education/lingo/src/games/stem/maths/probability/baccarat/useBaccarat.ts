'use client';

import { useCallback, useMemo, useState } from 'react';
import type { Card } from '../_shared/cards';
import {
  INITIAL_CREDITS,
  STAKE,
  type Bet,
  type DealOutcome,
  type Phase,
  type RoundResult,
} from './types';
import { createShoe, resolveRound } from './utils';

export interface UseBaccaratResult {
  phase: Phase;
  credits: number;
  bet: Bet | null;
  playerHand: Card[];
  bankerHand: Card[];
  result: RoundResult | null;
  lastWon: number;
  selectBet: (bet: Bet) => void;
  deal: () => void;
  nextRound: () => void;
}

export const useBaccarat = (): UseBaccaratResult => {
  const [shoe, setShoe] = useState<Card[]>(createShoe);
  const [phase, setPhase] = useState<Phase>('bet');
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [bet, setBet] = useState<Bet | null>(null);
  const [outcome, setOutcome] = useState<DealOutcome | null>(null);

  const selectBet = useCallback((next: Bet): void => {
    setBet(next);
  }, []);

  const deal = useCallback((): void => {
    if (!bet || credits < STAKE) return;
    const current = shoe.length < 10 ? createShoe() : shoe;
    const dealt = resolveRound(current, bet);
    if (!dealt) return;
    setCredits((balance) => balance - STAKE + dealt.won);
    setShoe(dealt.shoe);
    setOutcome(dealt);
    setPhase('result');
  }, [bet, credits, shoe]);

  const nextRound = useCallback((): void => {
    setOutcome(null);
    setBet(null);
    setPhase('bet');
  }, []);

  return useMemo(
    () => ({
      phase,
      credits,
      bet,
      playerHand: outcome?.playerHand ?? [],
      bankerHand: outcome?.bankerHand ?? [],
      result: outcome?.result ?? null,
      lastWon: outcome?.won ?? 0,
      selectBet,
      deal,
      nextRound,
    }),
    [bet, credits, deal, nextRound, outcome, phase, selectBet]
  );
};
