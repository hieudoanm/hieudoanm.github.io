'use client';

import { useCallback, useMemo, useState } from 'react';
import { applyQuizGuess, INITIAL_STATS, type QuizStats } from '../_shared/quiz';
import type { EmojiQuestion, QuizMessage } from './types';
import { buildEmojiQuestion, isCorrectFlag } from './utils';

export interface UseEmojiGuesserResult {
  question: EmojiQuestion;
  stats: QuizStats;
  message: QuizMessage;
  guess: (flag: string) => void;
  next: () => void;
}

export const useEmojiGuesser = (): UseEmojiGuesserResult => {
  const [question, setQuestion] = useState<EmojiQuestion>(buildEmojiQuestion);
  const [stats, setStats] = useState<QuizStats>(INITIAL_STATS);
  const [message, setMessage] = useState<QuizMessage>(null);

  const next = useCallback((): void => {
    setQuestion(buildEmojiQuestion());
    setMessage(null);
  }, []);

  const guess = useCallback(
    (flag: string): void => {
      if (message) return;
      const correct = isCorrectFlag(flag, question.current);
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
