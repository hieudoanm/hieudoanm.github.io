'use client';

import { useCallback, useMemo, useState } from 'react';
import { applyQuizGuess, INITIAL_STATS, type QuizStats } from '../_shared/quiz';
import type { HLMessage, HLPair, HLSide } from './types';
import { isHigherCorrect, pickPair, populationOf } from './utils';

export interface UseHigherOrLowerResult {
  pair: HLPair;
  stats: QuizStats;
  games: number;
  message: HLMessage;
  revealed: boolean;
  leftPop: number;
  rightPop: number;
  guess: (side: HLSide) => void;
  next: () => void;
}

export const useHigherOrLower = (): UseHigherOrLowerResult => {
  const [pair, setPair] = useState<HLPair>(pickPair);
  const [stats, setStats] = useState<QuizStats>(INITIAL_STATS);
  const [games, setGames] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [message, setMessage] = useState<HLMessage>(null);

  const next = useCallback((): void => {
    setPair(pickPair());
    setRevealed(false);
    setMessage(null);
  }, []);

  const guess = useCallback(
    (side: HLSide): void => {
      if (revealed) return;
      const leftPop = populationOf(pair.left.name);
      const rightPop = populationOf(pair.right.name);
      const correct = isHigherCorrect(side, leftPop, rightPop);
      setGames((current) => current + 1);
      setRevealed(true);
      setStats((current) => applyQuizGuess(current, correct));
      setMessage(
        correct
          ? { text: 'Correct!', correct: true }
          : { text: 'Wrong!', correct: false }
      );
    },
    [pair, revealed]
  );

  return useMemo(
    () => ({
      pair,
      stats,
      games,
      message,
      revealed,
      leftPop: populationOf(pair.left.name),
      rightPop: populationOf(pair.right.name),
      guess,
      next,
    }),
    [games, guess, message, next, pair, revealed, stats]
  );
};
