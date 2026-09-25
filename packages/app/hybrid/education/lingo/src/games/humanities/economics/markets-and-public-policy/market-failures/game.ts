import type { Policy } from './types';

const BASE_OUTPUT = 100;
const TOLERANCE = 2;

export const isPolicyCorrect = (policy: Policy, bestPolicy: Policy): boolean =>
  policy === bestPolicy;

export const taxAccuracy = (tax: number, gap: number): number => {
  if (gap === 0) return tax === 0 ? 100 : 0;
  const ratio = 1 - Math.abs(tax - gap) / gap;
  return Math.max(0, Math.round(ratio * 100));
};

export const optimalOutput = (tax: number, gap: number): number => {
  if (gap === 0) return BASE_OUTPUT;
  const distortion = Math.abs(tax - gap) / gap;
  return Math.max(0, Math.round(BASE_OUTPUT * (1 - distortion)));
};

export const choseOptimalTax = (tax: number, gap: number): boolean =>
  Math.abs(tax - gap) <= TOLERANCE;
