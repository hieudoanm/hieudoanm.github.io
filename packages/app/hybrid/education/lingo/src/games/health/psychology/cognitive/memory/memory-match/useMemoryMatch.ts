import { useCallback, useEffect, useRef, useState } from 'react';

import {
  DEFAULT_COLS,
  DEFAULT_ROWS,
  MATCH_FLIP_DELAY,
  MISS_FLIP_DELAY,
  TICK_INTERVAL,
} from './constants';
import {
  Card,
  EMOJI_CATEGORIES,
  createCards,
  hasWholePairs,
  pairCount,
} from './utils';

const stopTimer = (timerRef: { current: number | null }): void => {
  if (timerRef.current !== null) {
    window.clearInterval(timerRef.current);
    timerRef.current = null;
  }
};

export const useMemoryMatch = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [cols, setCols] = useState(DEFAULT_COLS);
  const [category, setCategory] = useState<string>(EMOJI_CATEGORIES[0]);
  const [movesCount, setMovesCount] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [timer, setTimer] = useState(0);
  const [won, setWon] = useState(false);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);
  const timerRef = useRef<number | null>(null);

  const totalPairs = pairCount(rows, cols);

  const startTimer = useCallback(() => {
    stopTimer(timerRef);
    timerRef.current = window.setInterval(
      () => setTimer((value) => value + 1),
      TICK_INTERVAL
    );
  }, []);

  const initGame = useCallback(
    (nextRows: number, nextCols: number, nextCategory: string) => {
      setCards(createCards(nextRows, nextCols, nextCategory));
      setMovesCount(0);
      setMatchedPairs(0);
      setTimer(0);
      setWon(false);
      setFlipped([]);
      setLocked(false);
      startTimer();
    },
    [startTimer]
  );

  useEffect(() => {
    initGame(rows, cols, category);

    return () => stopTimer(timerRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settlePair = useCallback(
    (first: number, second: number) => {
      const isMatch = cards[first].emoji === cards[second].emoji;

      window.setTimeout(
        () => {
          setCards((prev) =>
            prev.map((card, index) =>
              index === first || index === second
                ? { ...card, flipped: isMatch, matched: isMatch }
                : card
            )
          );
          setFlipped([]);
          setLocked(false);

          if (!isMatch) return;

          setMatchedPairs((prev) => {
            const next = prev + 1;

            if (next >= totalPairs) {
              setWon(true);
              stopTimer(timerRef);
            }

            return next;
          });
        },
        isMatch ? MATCH_FLIP_DELAY : MISS_FLIP_DELAY
      );
    },
    [cards, totalPairs]
  );

  const handleCardClick = useCallback(
    (id: number) => {
      if (locked || won) return;

      const index = cards.findIndex((card) => card.id === id);

      if (index === -1 || cards[index].flipped || cards[index].matched) {
        return;
      }

      setCards((prev) =>
        prev.map((card, i) => (i === index ? { ...card, flipped: true } : card))
      );

      const next = [...flipped, index];
      setFlipped(next);

      if (next.length !== 2) return;

      setMovesCount((moves) => moves + 1);
      setLocked(true);
      settlePair(next[0], next[1]);
    },
    [cards, flipped, locked, won, settlePair]
  );

  const handleRowChange = useCallback(
    (rows: number) => {
      if (!hasWholePairs(rows, cols)) return;

      setRows(rows);
      initGame(rows, cols, category);
    },
    [cols, category, initGame]
  );

  const handleColChange = useCallback(
    (cols: number) => {
      if (!hasWholePairs(rows, cols)) return;

      setCols(cols);
      initGame(rows, cols, category);
    },
    [rows, category, initGame]
  );

  const handleCategoryChange = useCallback(
    (category: string) => {
      setCategory(category);
      initGame(rows, cols, category);
    },
    [rows, cols, initGame]
  );

  const newGame = useCallback(
    () => initGame(rows, cols, category),
    [rows, cols, category, initGame]
  );

  return {
    cards,
    rows,
    cols,
    movesCount,
    matchedPairs,
    totalPairs,
    timer,
    won,
    category,
    handleCardClick,
    handleRowChange,
    handleColChange,
    handleCategoryChange,
    newGame,
  };
};
