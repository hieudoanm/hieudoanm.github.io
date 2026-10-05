import type { KenoDraw, Paytable } from './types';

export const KENO_MAX = 80;
export const DRAW_COUNT = 20;
export const MAX_PICKS = 5;
export const STAKE = 10;
export const INITIAL_CREDITS = 200;

/** Multipliers by [picks][catches]. Missing entries pay nothing. */
export const PAYTABLE: Paytable = {
  1: { 1: 3 },
  2: { 2: 12 },
  3: { 2: 1, 3: 42 },
  4: { 2: 1, 3: 6, 4: 120 },
  5: { 3: 2, 4: 15, 5: 700 },
};

export const drawNumbers = (count = DRAW_COUNT): number[] => {
  const pool = Array.from({ length: KENO_MAX }, (_, index) => index + 1);
  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [pool[index], pool[swap]] = [pool[swap], pool[index]];
  }
  return pool.slice(0, count).sort((a, b) => a - b);
};

export const quickPick = (picks: number): number[] =>
  drawNumbers(picks).slice(0, picks);

export const countCatches = (
  selected: readonly number[],
  drawn: readonly number[]
): number => selected.filter((number_) => drawn.includes(number_)).length;

export const payoutFor = (picks: number, catches: number): number =>
  PAYTABLE[picks]?.[catches] ?? 0;

export const playKeno = (
  selected: readonly number[],
  drawn: number[] = drawNumbers()
): KenoDraw => {
  const catches = countCatches(selected, drawn);
  const multiplier = payoutFor(selected.length, catches);
  return { drawn, catches, won: STAKE * multiplier };
};
