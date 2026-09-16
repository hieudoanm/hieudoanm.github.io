import {
  MISS_POINTS,
  NEAR_BAND,
  NEAR_POINTS,
  TARGET_BAND,
  WIN_POINTS,
} from './constants';
import type { LorenzPoint } from './types';

export const sortAsc = (incomes: number[]): number[] =>
  [...incomes].sort((a, b) => a - b);

export const mean = (incomes: number[]): number =>
  incomes.reduce((sum, v) => sum + v, 0) / (incomes.length || 1);

export const gini = (incomes: number[]): number => {
  const sorted = sortAsc(incomes);
  const n = sorted.length;
  if (n === 0) return 0;
  const total = sorted.reduce((sum, v) => sum + v, 0);
  if (total <= 0) return 0;
  const weighted = sorted.reduce((sum, v, index) => sum + (index + 1) * v, 0);
  return (2 * weighted) / (n * total) - (n + 1) / n;
};

export const afterPolicy = (incomes: number[], t: number): number[] => {
  const rebate = t * mean(incomes);
  return sortAsc(incomes.map((y) => (1 - t) * y + rebate));
};

export const giniAfter = (incomes: number[], t: number): number =>
  gini(afterPolicy(incomes, t));

export const povertyHeadcount = (incomes: number[], line: number): number => {
  if (incomes.length === 0) return 0;
  return incomes.filter((y) => y < line).length / incomes.length;
};

export const scoreRound = (t: number, target: number): number => {
  const error = Math.abs(t - target);
  if (error <= TARGET_BAND) return WIN_POINTS;
  if (error <= NEAR_BAND) return NEAR_POINTS;
  return MISS_POINTS;
};

export const lorenzPoints = (incomes: number[]): LorenzPoint[] => {
  const sorted = sortAsc(incomes);
  const total = sorted.reduce((sum, v) => sum + v, 0) || 1;
  let cum = 0;
  return sorted.map((v, index) => {
    cum += v;
    return { x: (index + 1) / sorted.length, y: cum / total };
  });
};
