'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Frame } from './types';

export interface PlayerApi {
  frame: Frame | undefined;
  index: number;
  total: number;
  isPlaying: boolean;
  isFinished: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  forward: () => void;
  back: () => void;
  reset: () => void;
  goTo: (index: number) => void;
}

/**
 * Walks a recorded frame list, one step per tick.
 *
 * The tick lives in an effect keyed on the frame list and speed, so changing the
 * input restarts playback from the beginning rather than resuming a cursor that
 * no longer refers to the same frames.
 */
export const usePlayer = (frames: Frame[], speedMs: number): PlayerApi => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const last = frames.length - 1;

  useEffect(() => {
    setIndex(0);
    setIsPlaying(false);
  }, [frames]);

  useEffect(() => {
    if (!isPlaying) return undefined;
    if (index >= last) {
      setIsPlaying(false);
      return undefined;
    }
    const timer = setTimeout(() => setIndex((i) => i + 1), speedMs);
    return () => clearTimeout(timer);
  }, [isPlaying, index, last, speedMs]);

  const goTo = useCallback(
    (next: number) => setIndex(Math.max(0, Math.min(next, last))),
    [last]
  );

  return useMemo(
    () => ({
      frame: frames[index],
      index,
      total: frames.length,
      isPlaying,
      isFinished: index >= last,
      play: () => setIsPlaying(true),
      pause: () => setIsPlaying(false),
      toggle: () => setIsPlaying((p) => (index >= last ? false : !p)),
      forward: () => goTo(index + 1),
      back: () => goTo(index - 1),
      reset: () => {
        setIsPlaying(false);
        setIndex(0);
      },
      goTo,
    }),
    [frames, index, isPlaying, last, goTo]
  );
};

/** Debounces a rapidly-changing value, e.g. a size slider. */
export const useDebounced = <T>(value: T, delayMs: number): T => {
  const [settled, setSettled] = useState(value);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    timer.current = setTimeout(() => setSettled(value), delayMs);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [value, delayMs]);
  return settled;
};
