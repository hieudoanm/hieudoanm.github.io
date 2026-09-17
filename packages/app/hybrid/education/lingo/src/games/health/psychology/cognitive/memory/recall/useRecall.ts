import { useCallback, useEffect, useRef, useState } from 'react';

import { Phase } from './constants';
import { compareDigits, generateNumber, showDuration } from './utils';
import { useHighStreak } from './useHighStreak';

export const useRecall = () => {
  const [lastRoundFailed, setLastRoundFailed] = useState(false);
  const [phase, setPhase] = useState<Phase>('ready');
  const [level, setLevel] = useState(1);
  const [number, setNumber] = useState('');
  const [input, setInput] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [mask, setMask] = useState(false);
  const { highStreak, updateHighStreak } = useHighStreak();

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    timerRef.current = null;
    intervalRef.current = null;
  }, []);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (phase !== 'input') containerRef.current?.focus();
  }, [phase]);

  useEffect(() => clearTimers, [clearTimers]);

  const startRound = useCallback(
    (nextLevel: number) => {
      clearTimers();

      const value = generateNumber(nextLevel);
      const duration = showDuration(nextLevel);

      setNumber(value);
      setInput('');
      setPhase('show');
      setCountdown(Math.ceil(duration / 1000));

      intervalRef.current = setInterval(
        () => setCountdown((value) => Math.max(0, value - 1)),
        1000
      );

      timerRef.current = setTimeout(() => {
        clearTimers();
        setCountdown(0);
        setPhase('input');
        setTimeout(() => inputRef.current?.focus(), 0);
      }, duration);
    },
    [clearTimers]
  );

  const start = useCallback(() => {
    setLevel(1);
    startRound(1);
  }, [startRound]);

  const submit = useCallback(() => {
    if (phase !== 'input') return;

    const solved = compareDigits(input, number);

    if (solved) {
      updateHighStreak(level);
      setLevel((value) => value + 1);
    } else {
      setLevel(1);
    }

    setLastRoundFailed(!solved);
    setPhase('result');
  }, [input, number, phase, level, updateHighStreak]);

  const next = useCallback(() => {
    startRound(level);
  }, [level, startRound]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key !== 'Enter') return;
      if (phase === 'ready') start();
      if (phase === 'result') next();
    },
    [phase, start, next]
  );

  return {
    phase,
    level,
    number,
    input,
    setInput,
    countdown,
    mask,
    setMask,
    highStreak,
    inputRef,
    containerRef,
    lastRoundFailed,
    start,
    submit,
    next,
    onKeyDown,
  };
};
