'use client';

import { useCallback, useMemo, useState } from 'react';
import { applyQuizGuess, INITIAL_STATS, type QuizStats } from '../_shared/quiz';
import type { BorderMessage, BorderQuestion } from './types';
import { buildBorderQuestion, isCorrectBorder, neighboursOf } from './utils';

export interface UseBorderResult {
  question: BorderQuestion;
  stats: QuizStats;
  message: BorderMessage;
  revealed: boolean;
  neighbours: string[];
  guess: (name: string) => void;
  next: () => void;
}

export const useBorder = (): UseBorderResult => {
  const [question, setQuestion] = useState<BorderQuestion>(buildBorderQuestion);
  const [stats, setStats] = useState<QuizStats>(INITIAL_STATS);
  const [message, setMessage] = useState<BorderMessage>(null);
  const [revealed, setRevealed] = useState(false);

  const next = useCallback((): void => {
    setQuestion(buildBorderQuestion());
    setMessage(null);
    setRevealed(false);
  }, []);

  const guess = useCallback(
    (name: string): void => {
      if (message) return;
      const correct = isCorrectBorder(name, question.correct);
      setStats((current) => applyQuizGuess(current, correct));
      if (correct) {
        setMessage({ text: 'Correct!', correct: true });
        return;
      }
      setRevealed(true);
      setMessage({
        text: `Wrong! ${question.currentName} borders ${question.correct}`,
        correct: false,
      });
    },
    [message, question]
  );

  const neighbours = useMemo(
    () => neighboursOf(question.currentName),
    [question.currentName]
  );

  return useMemo(
    () => ({ question, stats, message, revealed, neighbours, guess, next }),
    [guess, message, neighbours, next, question, revealed, stats]
  );
};
