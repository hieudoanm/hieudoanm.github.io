import {
  COMPETITIVE_Q,
  DEMAND_INTERCEPT,
  MARGINAL_COST,
  PROFIT_MAX_Q,
} from './constants';
import type { Guidance } from './types';

export const priceAt = (q: number): number => DEMAND_INTERCEPT - q;

export const profitAt = (q: number): number => {
  const p = priceAt(q);
  const tr = p * q;
  const tc = MARGINAL_COST * q;
  return tr - tc;
};

export const dwlAt = (q: number): number => {
  const restricted = Math.min(q, COMPETITIVE_Q);
  const side = COMPETITIVE_Q - restricted;
  return Math.max(0, (side * side) / 2);
};

export const guidance = (q: number): Guidance => {
  if (q < PROFIT_MAX_Q) return 'below-optimum';
  if (q > PROFIT_MAX_Q) return 'above-optimum';
  return 'optimal';
};
