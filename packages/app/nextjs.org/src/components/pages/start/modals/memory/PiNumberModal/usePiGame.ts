import { PI } from '@hieudoanm.github.io/data/pi';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Mode, getHighScore } from './constants';
import { handleEscape, handleGameKey, handlePracticeKey } from './keyHandlers';

export const usePiGame = (onClose: () => void) => {
  const digits = useMemo(() => PI.split(''), []);
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<Mode>('practice');
  const [{ locked, lastResult, revealedIndex, highScore }, setGameState] =
    useState({
      locked: false,
      lastResult: null as 'correct' | 'wrong' | null,
      revealedIndex: null as number | null,
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
    if (handleEscape(key, onClose)) return;
    if (mode === 'practice') {
      handlePracticeKey(key, setIndex, digits.length - 1);
      return;
    }
    handleGameKey(
      key,
      index,
      digits,
      locked,
      setIndex,
      setGameState,
      highScore
    );
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
