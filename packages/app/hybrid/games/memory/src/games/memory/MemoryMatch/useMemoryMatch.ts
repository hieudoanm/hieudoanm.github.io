import { useCallback, useEffect, useRef, useState } from 'react';
import { Card, createCards, EMOJI_CATEGORIES } from './utils';

export const useMemoryMatch = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);
  const [movesCount, setMovesCount] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [timer, setTimer] = useState(0);
  const [won, setWon] = useState(false);
  const [category, setCategory] = useState(EMOJI_CATEGORIES[0]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);
  const timerRef = useRef<number | null>(null);
  const categoryRef = useRef(category);
  categoryRef.current = category;

  const totalPairs = (rows * cols) / 2;

  const initGame = useCallback((r: number, c: number, cat: string) => {
    setCards(createCards(r, c, cat));
    setMovesCount(0);
    setMatchedPairs(0);
    setTimer(0);
    setWon(false);
    setFlippedIndices([]);
    setLocked(false);
    if (timerRef.current !== null) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => setTimer((t) => t + 1), 1000);
  }, []);

  useEffect(() => {
    initGame(rows, cols, category);
    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current);
    };
    // only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCardClick = useCallback(
    (id: number) => {
      if (locked || won) return;
      const idx = cards.findIndex((c) => c.id === id);
      if (idx === -1 || cards[idx].flipped || cards[idx].matched) return;

      const next = cards.map((c) =>
        c.id === id ? { ...c, flipped: true } : c
      );
      setCards(next);

      const newFlipped = [...flippedIndices, idx];
      setFlippedIndices(newFlipped);

      if (newFlipped.length === 2) {
        setMovesCount((m) => m + 1);
        setLocked(true);

        const [first, second] = newFlipped;
        if (next[first].emoji === next[second].emoji) {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c, i) =>
                i === first || i === second ? { ...c, matched: true } : c
              )
            );
            setMatchedPairs((p) => {
              const np = p + 1;
              if (np >= totalPairs) {
                setWon(true);
                if (timerRef.current !== null) clearInterval(timerRef.current);
              }
              return np;
            });
            setFlippedIndices([]);
            setLocked(false);
          }, 400);
        } else {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c, i) =>
                i === first || i === second ? { ...c, flipped: false } : c
              )
            );
            setFlippedIndices([]);
            setLocked(false);
          }, 800);
        }
      }
    },
    [cards, flippedIndices, locked, won, totalPairs]
  );

  const handleRowChange = useCallback(
    (n: number) => {
      const pairs = (n * cols) / 2;
      if (pairs % 1 !== 0) return;
      setRows(n);
      initGame(n, cols, categoryRef.current);
    },
    [cols, initGame]
  );

  const handleColChange = useCallback(
    (n: number) => {
      if (n % 2 !== 0) return;
      setCols(n);
      initGame(rows, n, categoryRef.current);
    },
    [rows, initGame]
  );

  const handleCategoryChange = useCallback(
    (cat: string) => {
      setCategory(cat);
      initGame(rows, cols, cat);
    },
    [rows, cols, initGame]
  );

  const newGame = useCallback(() => {
    initGame(rows, cols, categoryRef.current);
  }, [rows, cols, initGame]);

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
