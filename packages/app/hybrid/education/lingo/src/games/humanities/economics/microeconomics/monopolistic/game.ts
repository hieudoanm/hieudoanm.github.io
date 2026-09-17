import { FIXED_COST, MC } from './constants';
import type { LabDerived, LabParams, Mode } from './types';

export const interceptAt = (d: number): number => 40 + 0.8 * d;

export const slopeAt = (d: number): number => 0.4 + 0.006 * d;

export const longRunIntercept = (d: number): number => {
  const b = slopeAt(d);
  return 8 + 2 * Math.sqrt(b * FIXED_COST);
};

export const effectiveIntercept = (
  d: number,
  progress: number,
  mode: Mode
): number =>
  mode === 'monopolistic'
    ? interceptAt(d) - progress * (interceptAt(d) - longRunIntercept(d))
    : interceptAt(d);

export const demandPrice = (
  q: number,
  d: number,
  progress: number,
  mode: Mode
): number =>
  mode === 'perfect'
    ? MC
    : effectiveIntercept(d, progress, mode) - slopeAt(d) * q;

export const marginalRevenue = (
  q: number,
  d: number,
  progress: number,
  mode: Mode
): number =>
  mode === 'perfect'
    ? MC
    : effectiveIntercept(d, progress, mode) - 2 * slopeAt(d) * q;

export const totalRevenue = (
  q: number,
  d: number,
  progress: number,
  mode: Mode
): number => demandPrice(q, d, progress, mode) * q;

export const totalCost = (q: number, mode: Mode): number =>
  MC * q + (mode === 'perfect' ? 0 : FIXED_COST);

export const profitAt = (
  q: number,
  d: number,
  progress: number,
  mode: Mode
): number => totalRevenue(q, d, progress, mode) - totalCost(q, mode);

export const bestQ = (d: number, progress: number, mode: Mode): number => {
  const a = effectiveIntercept(d, progress, mode);
  const target = mode === 'perfect' ? a - MC : (a - MC) / 2;
  return Math.round(target / slopeAt(d));
};

export const dwlAt = (
  q: number,
  d: number,
  progress: number,
  mode: Mode
): number => {
  if (mode === 'perfect') return 0;
  const p = demandPrice(q, d, progress, mode);
  const qc = (effectiveIntercept(d, progress, mode) - MC) / slopeAt(d);
  return Math.round((Math.abs(qc - q) * Math.abs(p - MC)) / 2);
};

export const deriveLab = (params: LabParams): LabDerived => {
  const { quantity, differentiation, entryProgress, mode } = params;
  return {
    price: Math.round(
      demandPrice(quantity, differentiation, entryProgress, mode)
    ),
    totalRevenue: Math.round(
      totalRevenue(quantity, differentiation, entryProgress, mode)
    ),
    totalCost: Math.round(totalCost(quantity, mode)),
    profit: Math.round(
      profitAt(quantity, differentiation, entryProgress, mode)
    ),
    marginalRevenue: Math.round(
      marginalRevenue(quantity, differentiation, entryProgress, mode)
    ),
    marginalCost: MC,
    bestQuantity: bestQ(differentiation, entryProgress, mode),
    dwl: dwlAt(quantity, differentiation, entryProgress, mode),
  };
};

export const quizBestQ = (a: number, b: number): number =>
  Math.round((a - MC) / (2 * b));

export const quizPrice = (q: number, a: number, b: number): number => a - b * q;

export const quizProfit = (q: number, a: number, b: number): number =>
  quizPrice(q, a, b) * q - MC * q - FIXED_COST;

export const quizDwl = (q: number, a: number, b: number): number => {
  const qc = (a - MC) / b;
  const p = quizPrice(q, a, b);
  return Math.round((Math.abs(qc - q) * Math.abs(p - MC)) / 2);
};

export const quizDwlAtOptimum = (a: number, b: number): number =>
  quizDwl(quizBestQ(a, b), a, b);
