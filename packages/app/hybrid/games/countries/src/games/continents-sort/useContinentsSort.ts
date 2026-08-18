'use client';

import { useCallback, useMemo, useState } from 'react';
import type { Buckets, Region, SortCard, SortMessage } from './types';
import { emptyBuckets, placeCard, pickSortCards } from './utils';

export interface UseContinentsSortResult {
  cards: SortCard[];
  buckets: Buckets;
  dragging: string | null;
  message: SortMessage;
  score: number;
  mistakes: number;
  gameOver: boolean;
  unplaced: SortCard[];
  placedCount: number;
  startDrag: (name: string) => void;
  endDrag: () => void;
  drop: (region: Region) => void;
  reset: () => void;
}

export const useContinentsSort = (): UseContinentsSortResult => {
  const [cards, setCards] = useState<SortCard[]>(pickSortCards);
  const [buckets, setBuckets] = useState<Buckets>(emptyBuckets);
  const [dragging, setDragging] = useState<string | null>(null);
  const [message, setMessage] = useState<SortMessage>(null);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const unplaced = useMemo(
    () => cards.filter((card) => !card.placedIn),
    [cards]
  );
  const placedCount = cards.length - unplaced.length;

  const startDrag = useCallback((name: string): void => {
    setDragging(name);
  }, []);

  const endDrag = useCallback((): void => {
    setDragging(null);
  }, []);

  const drop = useCallback(
    (region: Region): void => {
      if (!dragging) return;
      const outcome = placeCard(cards, buckets, dragging, region);
      if (!outcome) return;
      setCards(outcome.cards);
      setBuckets(outcome.buckets);
      setDragging(null);
      if (outcome.correct) {
        setScore((current) => current + 1);
        setMessage({ text: `${dragging} → ${region}`, correct: true });
      } else {
        setMistakes((current) => current + 1);
        setMessage({
          text: `${dragging} belongs to ${
            cards.find((card) => card.name === dragging)?.correctRegion
          }`,
          correct: false,
        });
      }
      if (placedCount + 1 === cards.length) setGameOver(true);
    },
    [buckets, cards, dragging, placedCount]
  );

  const reset = useCallback((): void => {
    setCards(pickSortCards());
    setBuckets(emptyBuckets());
    setDragging(null);
    setMessage(null);
    setScore(0);
    setMistakes(0);
    setGameOver(false);
  }, []);

  return useMemo(
    () => ({
      cards,
      buckets,
      dragging,
      message,
      score,
      mistakes,
      gameOver,
      unplaced,
      placedCount,
      startDrag,
      endDrag,
      drop,
      reset,
    }),
    [
      buckets,
      cards,
      dragging,
      drop,
      endDrag,
      gameOver,
      message,
      mistakes,
      placedCount,
      reset,
      score,
      startDrag,
      unplaced,
    ]
  );
};
