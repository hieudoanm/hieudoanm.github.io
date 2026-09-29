import {
  EXPECTED_PRICE_LEVEL,
  POTENTIAL_OUTPUT,
  SRAS_SLOPE,
} from './constants';
import type { GapSign, PriceDirection } from './types';

const EPSILON = 0.01;

export const shortRunPrice = (a: number): number =>
  (400 + Math.sqrt(160000 + 20 * a)) / 10;

export const shortRunOutput = (a: number): number =>
  POTENTIAL_OUTPUT + SRAS_SLOPE * (shortRunPrice(a) - EXPECTED_PRICE_LEVEL);

export const gapPercent = (a: number): number =>
  ((shortRunOutput(a) - POTENTIAL_OUTPUT) / POTENTIAL_OUTPUT) * 100;

export const gapSign = (a: number): GapSign => {
  const gap = shortRunOutput(a) - POTENTIAL_OUTPUT;
  if (Math.abs(gap) < EPSILON) return 'zero';
  return gap > 0 ? 'positive' : 'negative';
};

export const priceDirection = (a: number, prevA: number): PriceDirection => {
  const delta = shortRunPrice(a) - shortRunPrice(prevA);
  if (Math.abs(delta) < EPSILON) return 'same';
  return delta > 0 ? 'rises' : 'falls';
};

export const longRunPrice = (a: number): number => a / 100;
