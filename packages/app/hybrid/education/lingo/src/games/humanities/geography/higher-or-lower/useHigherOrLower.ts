'use client';

import { useCallback, useMemo, useState } from 'react';
import { applyQuizGuess, INITIAL_STATS, type QuizStats } from '../_shared/quiz';
import type { HLMessage, HLMode, HLQuestion, HLSide } from './types';
import { buildQuestion, isHigherCorrect, isLowerRankCorrect } from './utils';

export interface UseHigherOrLowerResult {
  mode: HLMode;
  question: HLQuestion;
  stats: QuizStats;
  games: number;
  message: HLMessage;
  revealed: boolean;
  chooseMode: (mode: HLMode) => void;
  guess: (side: HLSide) => void;
  next: () => void;
}

export const useHigherOrLower = (): UseHigherOrLowerResult => {
  const [mode, setMode] = useState<HLMode>('population');
  const [question, setQuestion] = useState<HLQuestion>(() =>
    buildQuestion('population')
  );
  const [stats, setStats] = useState<QuizStats>(INITIAL_STATS);
  const [games, setGames] = useState(0);
  const [message, setMessage] = useState<HLMessage>(null);
  const [revealed, setRevealed] = useState(false);

  const chooseMode = useCallback((nextMode: HLMode): void => {
    setMode(nextMode);
    setQuestion(buildQuestion(nextMode));
    setMessage(null);
    setRevealed(false);
  }, []);

  const next = useCallback((): void => {
    setQuestion(buildQuestion(mode));
    setMessage(null);
    setRevealed(false);
  }, [mode]);

  const guess = useCallback(
    (side: HLSide): void => {
      if (revealed) return;
      const { leftValue, rightValue, mode: questionMode } = question;
      const correct =
        questionMode === 'passport'
          ? isLowerRankCorrect(side, leftValue, rightValue)
          : isHigherCorrect(side, leftValue, rightValue);
      setGames((current) => current + 1);
      setRevealed(true);
      setStats((current) => applyQuizGuess(current, correct));
      setMessage(
        correct
          ? { text: 'Correct!', correct: true }
          : { text: 'Wrong!', correct: false }
      );
    },
    [question, revealed]
  );

  return useMemo(
    () => ({
      mode,
      question,
      stats,
      games,
      message,
      revealed,
      chooseMode,
      guess,
      next,
    }),
    [chooseMode, games, guess, message, mode, next, question, revealed, stats]
  );
};
