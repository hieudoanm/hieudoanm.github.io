import { PI } from '@hieudoanm.github.io/data/pi';
import { useEffect, useMemo, useRef, useState } from 'react';

import { DIGIT_WIDTH, HIGH_SCORE_KEY, Mode, getHighScore } from './constants';

export const usePiGame = (onClose: () => void) => {
  const digits = useMemo(() => PI.split(''), []);
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<Mode>('practice');
  const [{ locked, lastResult, revealedIndex, highScore }, setGameState] =
    useState<{
      locked: boolean;
      lastResult: 'correct' | 'wrong' | null;
      revealedIndex: number | null;
      highScore: number;
    }>({
      locked: false,
      lastResult: null,
      revealedIndex: null,
      highScore: getHighScore(),
    });

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const retry = () => {
    setIndex(0);
    setGameState((p) => ({
      ...p,
      locked: false,
      lastResult: null,
      revealedIndex: null,
    }));
    containerRef.current?.focus();
  };

  const switchToGame = () => {
    setMode('game');
    retry();
  };

  const handleKey = (key: string) => {
    if (key === 'Escape') {
      onClose();
      return;
    }

    if (mode === 'practice') {
      if (key === 'ArrowRight')
        setIndex((i) => Math.min(i + 1, digits.length - 1));
      if (key === 'ArrowLeft') setIndex((i) => Math.max(i - 1, 0));
      return;
    }

    if (mode === 'game' && !locked && /^[0-9.]$/.test(key)) {
      const correct = digits[index];
      setGameState((p) => ({ ...p, revealedIndex: index }));

      if (key === correct) {
        setGameState((p) => ({ ...p, lastResult: 'correct' }));
        setTimeout(() => {
          setIndex((i) => Math.min(i + 1, digits.length - 1));
          setGameState((p) => ({
            ...p,
            lastResult: null,
            revealedIndex: null,
          }));
        }, 200);
      } else {
        setGameState((p) => {
          const newHighScore = Math.max(p.highScore, index);
          localStorage.setItem(HIGH_SCORE_KEY, String(newHighScore));
          return {
            ...p,
            locked: true,
            lastResult: 'wrong',
            highScore: newHighScore,
          };
        });
      }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (['ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
    handleKey(e.key);
  };

  return {
    digits,
    containerRef,
    index,
    mode,
    locked,
    lastResult,
    revealedIndex,
    highScore,
    retry,
    handleKey,
    onKeyDown,
    setMode,
    switchToGame,
  };
};
