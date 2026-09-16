'use client';

import { useCallback, useMemo, useState } from 'react';
import { applyQuizGuess, INITIAL_STATS, type QuizStats } from '../_shared/quiz';
import type { GuessMode, GuessQuestion, QuizMessage } from './types';
import { buildQuestion, isCorrectGuess, neighboursOf } from './utils';

export interface UseGuessResult {
  mode: GuessMode;
  question: GuessQuestion;
  stats: QuizStats;
  message: QuizMessage;
  revealed: boolean;
  neighbours: string[];
  chooseMode: (mode: GuessMode) => void;
  guess: (value: string) => void;
  next: () => void;
}

export const useGuess = (): UseGuessResult => {
  const [mode, setMode] = useState<GuessMode>('flag');
  const [question, setQuestion] = useState<GuessQuestion>(() =>
    buildQuestion('flag')
  );
  const [stats, setStats] = useState<QuizStats>(INITIAL_STATS);
  const [message, setMessage] = useState<QuizMessage>(null);
  const [revealed, setRevealed] = useState(false);

  const chooseMode = useCallback((nextMode: GuessMode): void => {
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
    (value: string): void => {
      if (message) return;
      const correct = isCorrectGuess(question, value);
      setStats((current) => applyQuizGuess(current, correct));
      if (correct) {
        setMessage({ text: 'Correct!', correct: true });
        return;
      }
      if (question.mode === 'border') {
        setRevealed(true);
        setMessage({
          text: `Wrong! ${question.currentName} borders ${question.correct}`,
          correct: false,
        });
        return;
      }
      setMessage({
        text: `Wrong! It was ${question.current.name}`,
        correct: false,
      });
    },
    [message, question]
  );

  const neighbours = useMemo(
    () =>
      question.mode === 'border' ? neighboursOf(question.currentName) : [],
    [question]
  );

  return useMemo(
    () => ({
      mode,
      question,
      stats,
      message,
      revealed,
      neighbours,
      chooseMode,
      guess,
      next,
    }),
    [
      chooseMode,
      guess,
      message,
      mode,
      neighbours,
      next,
      question,
      revealed,
      stats,
    ]
  );
};
