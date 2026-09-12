'use client';

import { useCallback, useMemo, useState } from 'react';
import { drawCard, type Card } from '../_shared/cards';
import { INITIAL_CREDITS, STAKE } from './constants';
import type { HiLoGuess, HiLoMessage } from './types';
import { freshShuffledDeck, isGuessCorrect } from './utils';

export interface UseHiLoResult {
  current: Card;
  deckLeft: number;
  credits: number;
  streak: number;
  bestStreak: number;
  message: HiLoMessage | null;
  guess: (guess: HiLoGuess) => void;
}

export const useHiLo = (): UseHiLoResult => {
  const [deck, setDeck] = useState<Card[]>(freshShuffledDeck);
  const [current, setCurrent] = useState<Card | null>(null);
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [message, setMessage] = useState<HiLoMessage | null>(null);

  const guess = useCallback(
    (pick: HiLoGuess): void => {
      let pool = deck.length === 0 ? freshShuffledDeck() : [...deck];
      let base = current;
      if (!base) {
        const [first, rest] = drawCard(pool);
        base = first;
        pool = rest;
      }
      const [drawn, remaining] = drawCard(pool);
      const correct = isGuessCorrect(pick, base, drawn);
      setCredits((balance) => balance - STAKE + (correct ? STAKE * 2 : 0));
      setStreak((running) => {
        const updated = correct ? running + 1 : 0;
        setBestStreak((best) => Math.max(best, updated));
        return updated;
      });
      setMessage(
        correct
          ? { text: 'Correct!', correct: true }
          : { text: 'Wrong!', correct: false }
      );
      setCurrent(drawn);
      setDeck(remaining);
    },
    [current, deck]
  );

  return useMemo(
    () => ({
      current: current ?? { rank: '2', suit: '♠' },
      deckLeft: deck.length,
      credits,
      streak,
      bestStreak,
      message,
      guess,
    }),
    [bestStreak, credits, current, deck.length, guess, message, streak]
  );
};
