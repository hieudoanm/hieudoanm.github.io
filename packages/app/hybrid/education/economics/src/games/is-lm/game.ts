import type { Shift } from './types';

export interface Equilibrium {
  y: number;
  r: number;
}

export const isCurve = (a: number, b: number, y: number): number => a - b * y;

export const lmCurve = (c: number, d: number, y: number): number => c + d * y;

export const equilibrium = (
  a: number,
  c: number,
  b: number,
  d: number
): Equilibrium => {
  const y = (a - c) / (b + d);
  return { y, r: isCurve(a, b, y) };
};

export const shiftFor = (from: number, to: number): Shift => {
  if (to > from) return 'right';
  if (to < from) return 'left';
  return 'none';
};

export const invert = (shift: Shift): Shift => {
  if (shift === 'left') return 'right';
  if (shift === 'right') return 'left';
  return 'none';
};

export const matches = (actual: Shift, expected: Shift): boolean =>
  actual === expected;

export const pointsFor = (isOk: boolean, lmOk: boolean): number =>
  (isOk ? 1 : 0) + (lmOk ? 1 : 0);
