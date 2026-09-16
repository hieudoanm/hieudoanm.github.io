import { CONVERGE_EPSILON } from './constants';
import type { FitnessSnapshot, PayoffMatrix } from './types';

const clamp01 = (v: number): number => Math.min(1, Math.max(0, v));

const finite = (v: number): boolean => Number.isFinite(v);

export const normalizeShare = (p: number): number =>
  finite(p) ? clamp01(p) : 0;

export const payoffSnapshot = (
  p: number,
  matrix: PayoffMatrix
): FitnessSnapshot => {
  const share = normalizeShare(p);
  const fA = share * matrix.aA + (1 - share) * matrix.aB;
  const fB = share * matrix.bA + (1 - share) * matrix.bB;
  const mean = share * fA + (1 - share) * fB;
  return { fA, fB, mean };
};

export const stepGeneration = (p: number, matrix: PayoffMatrix): number => {
  const share = normalizeShare(p);
  const { fA, fB, mean } = payoffSnapshot(share, matrix);
  if (!finite(mean) || mean <= 0) return share;
  return clamp01((share * fA) / mean);
};

export const stepsFrom = (
  p: number,
  matrix: PayoffMatrix,
  n: number
): number[] => {
  const count = finite(n) ? Math.max(0, Math.floor(n)) : 0;
  const trace: number[] = [normalizeShare(p)];
  for (let i = 0; i < count; i += 1) {
    trace.push(stepGeneration(trace[trace.length - 1], matrix));
  }
  return trace;
};

export const isConverged = (current: number, next: number): boolean => {
  if (!finite(current) || !finite(next)) return false;
  if (next <= 0 || next >= 1) return true;
  return Math.abs(next - current) < CONVERGE_EPSILON;
};
