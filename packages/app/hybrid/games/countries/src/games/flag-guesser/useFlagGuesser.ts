'use client';

import { useCallback, useMemo, useState } from 'react';
import { applyQuizGuess, INITIAL_STATS, type QuizStats } from '../_shared/quiz';
import type { FlagQuestion, QuizMessage } from './types';
import { buildFlagQuestion, isCorrectName } from './utils';

export interface UseFlagGuesserResult {
  question: FlagQuestion;
  stats: QuizStats;
  message: QuizMessage;
  guess: (name: string) => void;
  next: () => void;
}

export const useFlagGuesser = (): UseFlagGuesserResult => {
  const [question, setQuestion] = useState<FlagQuestion>(buildFlagQuestion);
  const [stats, setStats] = useState<QuizStats>(INITIAL_STATS);
  const [message, setMessage] = useState<QuizMessage>(null);

  const next = useCallback((): void => {
    setQuestion(buildFlagQuestion());
    setMessage(null);
  }, []);

  const guess = useCallback(
    (name: string): void => {
      if (message) return;
      const correct = isCorrectName(name, question.current);
      setStats((current) => applyQuizGuess(current, correct));
      setMessage(
        correct
          ? { text: 'Correct!', correct: true }
          : { text: `Wrong! It was ${question.current.name}`, correct: false }
      );
    },
    [message, question]
  );

  return useMemo(
    () => ({ question, stats, message, guess, next }),
    [guess, message, next, question, stats]
  );
};
