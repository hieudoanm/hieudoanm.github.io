import type { RoundSpec } from './types';

export const TOTAL_ROUNDS = 5;

export const TAX_MIN = 0;
export const TAX_MAX = 0.6;

export const POVERTY_LINE = 30;

export const TARGET_BAND = 0.02;
export const NEAR_BAND = 0.05;

export const WIN_POINTS = 3;
export const NEAR_POINTS = 1;
export const MISS_POINTS = 0;

export const BASE_INCOMES_A: number[] = [
  20, 25, 30, 35, 40, 45, 55, 70, 90, 120,
];

export const BASE_INCOMES_B: number[] = [
  10, 15, 20, 25, 30, 60, 90, 140, 220, 400,
];

export const TARGETS: number[] = [0.25, 0.2, 0.3, 0.35, 0.35];

export const ROUNDS: RoundSpec[] = TARGETS.map((target, index) => ({
  number: index + 1,
  incomes:
    index === TOTAL_ROUNDS - 1 ? [...BASE_INCOMES_B] : [...BASE_INCOMES_A],
  target,
  hard: index === TOTAL_ROUNDS - 1,
}));
