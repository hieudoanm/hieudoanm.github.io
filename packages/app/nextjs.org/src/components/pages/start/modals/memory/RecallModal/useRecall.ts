import { useEffect, useRef, useState } from 'react';

import {
  MAX_TIME,
  MIN_TIME,
  TIME_PER_DIGIT,
  Phase,
  chunkDigits,
  generateNumber,
  highlightMistakes,
} from './constants';

export const useRecall = (onClose: () => void) => {
  const [lastRoundFailed, setLastRoundFailed] = useState(false);
  const [phase, setPhase] = useState<Phase>('ready');
  const [level, setLevel] = useState(1);
  const [number, setNumber] = useState('');
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [mask, setMask] = useState(false);
  const [highStreak, setHighStreak] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('highStreak');
      return stored ? parseInt(stored, 10) : 0;
    }
    return 0;
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);
  useEffect(() => {
    if (phase !== 'input') containerRef.current?.focus();
  }, [phase]);
  useEffect(() => () => clearTimers(), []);

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const startRound = (nextLevel: number) => {
    clearTimers();
    const value = generateNumber(nextLevel);
    const duration = Math.min(
      MAX_TIME,
      Math.max(MIN_TIME, nextLevel * TIME_PER_DIGIT)
    );

    setNumber(value);
    setInput('');
    setPhase('show');
    setCountdown(Math.ceil(duration / 1000));

    intervalRef.current = setInterval(
      () => setCountdown((c) => Math.max(0, c - 1)),
      1000
    );
    timerRef.current = setTimeout(() => {
      clearTimers();
      setCountdown(0);
      setPhase('input');
      setTimeout(() => inputRef.current?.focus(), 0);
    }, duration);
  };

  const start = () => {
    setLevel(1);
    setMessage('');
    startRound(1);
  };

  const updateHighStreak = (newStreak: number) => {
    setHighStreak((prev) => {
      const high = Math.max(prev, newStreak);
      localStorage.setItem('highStreak', high.toString());
      return high;
    });
  };

  const submit = () => {
    if (input === number) {
      setMessage('Correct! Level up 🎉');
      setLevel((l) => l + 1);
      updateHighStreak(level);
      setLastRoundFailed(false);
    } else {
      const highlighted = highlightMistakes(input, number);
      setMessage(
        `Wrong 😢 The number was <span class="font-bold">${chunkDigits(number)}</span><br/>Your input: <span>${highlighted}</span>`
      );
      setLevel(1);
      setLastRoundFailed(true);
    }
    setPhase('result');
  };

  const next = () => {
    setMessage('');
    startRound(level);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (e.key !== 'Enter') return;
    if (phase === 'ready') start();
    if (phase === 'result') next();
  };

  return {
    phase,
    level,
    number,
    input,
    setInput,
    message,
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
