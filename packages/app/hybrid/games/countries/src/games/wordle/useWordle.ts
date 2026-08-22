'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  MAX_GUESSES,
  type GameStatus,
  type GuessRow,
  type LetterStatus,
} from './types';
import { dailyAnswer, submitGuess, todayKey } from './utils';

export interface UseWordleResult {
  answer: string;
  answerLength: number;
  guesses: GuessRow[];
  current: string;
  keyboard: Record<string, LetterStatus>;
  status: GameStatus;
  message: string | null;
  attemptsLeft: number;
  pressLetter: (letter: string) => void;
  pressBackspace: () => void;
  pressEnter: () => void;
  newGame: (answer?: string) => void;
}

export const useWordle = (initialAnswer?: string): UseWordleResult => {
  const [answer, setAnswer] = useState<string>(
    () => initialAnswer ?? dailyAnswer(todayKey())
  );
  const [guesses, setGuesses] = useState<GuessRow[]>([]);
  const [current, setCurrent] = useState('');
  const [keyboard, setKeyboard] = useState<Record<string, LetterStatus>>({});
  const [status, setStatus] = useState<GameStatus>('playing');
  const [message, setMessage] = useState<string | null>(null);

  const pressLetter = useCallback(
    (letter: string): void => {
      if (status !== 'playing') return;
      setMessage(null);
      setCurrent((value) =>
        value.length < answer.length ? value + letter.toUpperCase() : value
      );
    },
    [answer.length, status]
  );

  const pressBackspace = useCallback((): void => {
    if (status !== 'playing') return;
    setMessage(null);
    setCurrent((value) => value.slice(0, -1));
  }, [status]);

  const pressEnter = useCallback((): void => {
    if (status !== 'playing') return;
    if (current.length < answer.length) {
      setMessage('Not enough letters');
      return;
    }
    const result = submitGuess(current, answer, guesses, keyboard);
    setGuesses(result.guesses);
    setKeyboard(result.keyboard);
    setStatus(result.status);
    setCurrent('');
    if (result.status === 'lost') {
      setMessage(`The country was ${answer.toUpperCase()}`);
    } else {
      setMessage(result.message);
    }
  }, [answer, current, guesses, keyboard, status]);

  const newGame = useCallback((next?: string): void => {
    setAnswer(next ?? dailyAnswer(todayKey()));
    setGuesses([]);
    setCurrent('');
    setKeyboard({});
    setStatus('playing');
    setMessage(null);
  }, []);

  return useMemo(
    () => ({
      answer,
      answerLength: answer.length,
      guesses,
      current,
      keyboard,
      status,
      message,
      attemptsLeft: MAX_GUESSES - guesses.length,
      pressLetter,
      pressBackspace,
      pressEnter,
      newGame,
    }),
    [
      answer,
      current,
      guesses,
      keyboard,
      message,
      newGame,
      pressBackspace,
      pressEnter,
      pressLetter,
      status,
    ]
  );
};
