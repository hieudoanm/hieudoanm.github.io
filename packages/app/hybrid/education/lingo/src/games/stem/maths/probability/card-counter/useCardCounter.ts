'use client';

import { useCallback, useMemo, useState } from 'react';
import type { CountingCard } from './types';
import { newCountingDeck } from './utils';

export interface UseCardCounterResult {
  deck: CountingCard[];
  current: CountingCard | null;
  count: number;
  revealed: boolean;
  done: boolean;
  cardsLeft: number;
  deal: () => void;
  reveal: () => void;
  reset: () => void;
}

export const useCardCounter = (): UseCardCounterResult => {
  const [deck, setDeck] = useState<CountingCard[]>(newCountingDeck);
  const [current, setCurrent] = useState<CountingCard | null>(null);
  const [count, setCount] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  const deal = useCallback((): void => {
    if (done) return;
    if (deck.length === 0) {
      setDone(true);
      setCurrent(null);
      return;
    }
    const [next, ...rest] = deck;
    setDeck(rest);
    setCurrent(next);
    setCount((running) => running + next.value);
    setRevealed(false);
  }, [deck, done]);

  const reveal = useCallback((): void => {
    setRevealed(true);
  }, []);

  const reset = useCallback((): void => {
    setDeck(newCountingDeck());
    setCurrent(null);
    setCount(0);
    setRevealed(false);
    setDone(false);
  }, []);

  return useMemo(
    () => ({
      deck,
      current,
      count,
      revealed,
      done,
      cardsLeft: deck.length,
      deal,
      reveal,
      reset,
    }),
    [count, current, deal, done, deck, reset, revealed]
  );
};
