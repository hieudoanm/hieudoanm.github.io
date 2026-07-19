import {
  FIXED_COST,
  MAX_Q,
  QUADRATIC_COEF,
  VARIABLE_COST_COEF,
} from './constants';

export const totalCost = (q: number): number =>
  FIXED_COST + VARIABLE_COST_COEF * q + QUADRATIC_COEF * q * q;

export const variableCost = (q: number): number =>
  VARIABLE_COST_COEF * q + QUADRATIC_COEF * q * q;

export const marginalCost = (q: number): number =>
  VARIABLE_COST_COEF + 2 * QUADRATIC_COEF * q;

export const avgVariableCost = (q: number): number =>
  q === 0 ? 0 : variableCost(q) / q;

export const avgTotalCost = (q: number): number =>
  q === 0 ? 0 : totalCost(q) / q;

export const profitAt = (price: number, q: number): number =>
  price * q - totalCost(q);

export const profitMaxQ = (price: number): number => {
  const raw = (price - VARIABLE_COST_COEF) / (2 * QUADRATIC_COEF);
  return Math.min(MAX_Q, Math.max(0, Math.round(raw)));
};

export const minAVC = (): number => VARIABLE_COST_COEF;

export const minAC = (): number => {
  const q = Math.sqrt(FIXED_COST / QUADRATIC_COEF);
  return avgTotalCost(q);
};

export type LongRunState = 'entry' | 'exit' | 'equilibrium';

export const longRunNote = (price: number): LongRunState => {
  const threshold = minAC();
  if (price > threshold + 0.001) return 'entry';
  if (price < threshold - 0.001) return 'exit';
  return 'equilibrium';
};
