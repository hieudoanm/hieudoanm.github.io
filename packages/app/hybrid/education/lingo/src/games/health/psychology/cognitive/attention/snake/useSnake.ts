'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { DIR_KEYS, SPEED_LEVELS } from './constants';
import {
  advance,
  buildBoard,
  createState,
  speedLabel,
  tickFor,
  turn,
} from './snake';
import { Dir } from './types';

const DEFAULT_SPEED = 2;

export const useSnake = () => {
  const [state, setState] = useState(createState);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const [paused, setPaused] = useState(true);
  const [best, setBest] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const running = !paused && state.status === 'running';
  const board = useMemo(() => buildBoard(state), [state]);

  useEffect(() => {
    if (!running) return;

    const timer = window.setInterval(
      () => setState((prev) => advance(prev)),
      tickFor(speed)
    );

    return () => window.clearInterval(timer);
  }, [running, speed]);

  const start = useCallback(() => {
    setState(createState());
    setPaused(false);
  }, []);

  const togglePause = useCallback(() => {
    setPaused((prev) => !prev);
  }, []);

  const handleSpeed = useCallback((next: number) => {
    setSpeed(next);
  }, []);

  const handleDir = useCallback((dir: Dir) => {
    setState((prev) => turn(prev, dir));
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const dir = DIR_KEYS[event.key];

      if (dir) {
        event.preventDefault();
        handleDir(dir as Dir);

        return;
      }

      if (event.key === ' ' || event.key === 'p') {
        event.preventDefault();
        togglePause();
      }

      if (event.key === 'r' || event.key === 'R') start();
    },
    [handleDir, start, togglePause]
  );

  useEffect(() => {
    if (state.status === 'over' || state.status === 'won') {
      setBest((prev) => Math.max(prev, state.score));
    }
  }, [state.score, state.status]);

  return {
    containerRef,
    board,
    snake: state.snake,
    score: state.score,
    best,
    status: state.status,
    paused,
    running,
    speed,
    label: speedLabel(speed),
    start,
    togglePause,
    handleSpeed,
    handleDir,
    onKeyDown,
    speeds: SPEED_LEVELS,
  };
};
