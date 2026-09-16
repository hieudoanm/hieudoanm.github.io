import { PERFECT_SCORE, SCORE_MULTIPLIER, ZERO_SCORE } from './constants';
import type { PhaseLabel } from './types';

export const phaseFor = (
  prevGrowth: number,
  currentGrowth: number
): PhaseLabel => {
  if (currentGrowth < 0) return 'recession';
  if (prevGrowth < 0) return 'trough';
  if (prevGrowth > 0 && currentGrowth < prevGrowth) return 'peak';
  return 'expansion';
};

export const peakIndex = (series: number[]): number =>
  series.indexOf(Math.max(...series));

export const troughIndex = (series: number[]): number =>
  series.indexOf(Math.min(...series));

export const scorePrediction = (pred: number, actual: number): number =>
  Math.max(
    ZERO_SCORE,
    PERFECT_SCORE - Math.abs(pred - actual) * SCORE_MULTIPLIER
  );

export const recessionCount = (series: number[]): number =>
  series.filter((value) => value < 0).length;
