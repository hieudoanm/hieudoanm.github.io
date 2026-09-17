import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  ADVANCE_DELAY,
  INITIAL_PI_STATE,
  Mode,
  PiState,
  PREVENTED_KEYS,
  getHighScore,
  saveHighScore,
} from './constants';
import { DIGITS, applyDigit, clearFeedback, nudgeIndex } from './utils';

export const usePiGame = () => {
  const digits = useMemo(() => DIGITS, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<Mode>('practice');
  const [state, setState] = useState<PiState>(() => ({
    ...INITIAL_PI_STATE,
    highScore: getHighScore(),
  }));

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const retry = useCallback(() => {
    setIndex(0);
    setState((prev) => ({ ...INITIAL_PI_STATE, highScore: prev.highScore }));
    containerRef.current?.focus();
  }, []);

  const switchToGame = useCallback(() => {
    setMode('game');
    retry();
  }, [retry]);

  const typeDigit = useCallback(
    (key: string) => {
      const { state: next, advance } = applyDigit(key, index, digits, state);

      setState(next);

      if (next.highScore !== state.highScore) {
        saveHighScore(next.highScore);
      }

      if (!advance) return;

      setTimeout(() => {
        setIndex((value) => Math.min(value + 1, digits.length - 1));
        setState((prev) => clearFeedback(prev));
      }, ADVANCE_DELAY);
    },
    [digits, index, state]
  );

  const handleKey = useCallback(
    (key: string) => {
      if (mode === 'practice') {
        setIndex((value) => nudgeIndex(key, value, digits.length - 1));

        return;
      }

      typeDigit(key);
    },
    [digits.length, mode, typeDigit]
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (PREVENTED_KEYS.includes(event.key)) event.preventDefault();

      handleKey(event.key);
    },
    [handleKey]
  );

  return {
    digits,
    containerRef,
    index,
    mode,
    setMode,
    locked: state.locked,
    lastResult: state.lastResult,
    revealedIndex: state.revealedIndex,
    highScore: state.highScore,
    retry,
    switchToGame,
    handleKey,
    onKeyDown,
  };
};
