'use client';

import { useCallback, useMemo, useState } from 'react';
import { INITIAL_CREDITS, STAKE, type Phase, type RollOutcome } from './types';
import { playComeOut, playPoint } from './utils';

export interface UseCrapsResult {
  phase: Phase;
  credits: number;
  point: number | null;
  dice: [number, number];
  total: number;
  lastWon: number;
  finished: boolean;
  roll: () => void;
  nextRound: () => void;
}

export const useCraps = (): UseCrapsResult => {
  const [phase, setPhase] = useState<Phase>('comeout');
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [point, setPoint] = useState<number | null>(null);
  const [last, setLast] = useState<RollOutcome>({
    dice: [1, 1],
    total: 2,
    phase: 'comeout',
    won: 0,
  });
  const [finished, setFinished] = useState(false);

  const roll = useCallback((): void => {
    if (phase === 'result' || credits < STAKE) return;
    if (phase === 'comeout') {
      setCredits((balance) => balance - STAKE);
      const outcome = playComeOut();
      setLast(outcome);
      if (outcome.phase === 'point') setPoint(outcome.total);
      else {
        setCredits((balance) => balance + outcome.won);
        setFinished(true);
      }
      setPhase(outcome.phase);
      return;
    }
    const outcome = playPoint(point!);
    setLast(outcome);
    if (outcome.phase === 'result') {
      setCredits((balance) => balance + outcome.won);
      setFinished(true);
      setPhase('result');
    }
  }, [credits, phase, point]);

  const nextRound = useCallback((): void => {
    setPhase('comeout');
    setPoint(null);
    setFinished(false);
    setLast({ dice: [1, 1], total: 2, phase: 'comeout', won: 0 });
  }, []);

  return useMemo(
    () => ({
      phase,
      credits,
      point,
      dice: last.dice,
      total: last.total,
      lastWon: last.won,
      finished,
      roll,
      nextRound,
    }),
    [credits, finished, last, nextRound, phase, point, roll]
  );
};
