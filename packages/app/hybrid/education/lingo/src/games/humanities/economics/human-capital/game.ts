import {
  CAREER_LENGTH,
  PERFECT_SCORE,
  RATE_OF_RETURN,
  SCORE_PENALTY_PER_YEAR,
  YEARS_MAX,
} from './constants';

export const annualWage = (years: number, w0: number): number =>
  w0 * Math.pow(1 + RATE_OF_RETURN, years);

const discountFactor = (rPct: number, t: number): number =>
  Math.pow(1 + rPct / 100, t);

export const pvEarnings = (years: number, w0: number, rPct: number): number => {
  const wage = annualWage(years, w0);
  let sum = 0;
  for (let t = years; t < years + CAREER_LENGTH; t += 1) {
    sum += wage / discountFactor(rPct, t);
  }
  return sum;
};

export const pvCost = (years: number, costPerYear: number): number =>
  costPerYear * years;

export const npv = (
  years: number,
  w0: number,
  rPct: number,
  costPerYear: number
): number => pvEarnings(years, w0, rPct) - pvCost(years, costPerYear);

export const optimalYears = (
  w0: number,
  rPct: number,
  costPerYear: number
): number => {
  let best = 0;
  for (let s = 0; s <= YEARS_MAX; s += 1) {
    if (npv(s, w0, rPct, costPerYear) > npv(best, w0, rPct, costPerYear)) {
      best = s;
    }
  }
  return best;
};

export const scoreForChoice = (years: number, optimal: number): number =>
  Math.max(
    0,
    PERFECT_SCORE - SCORE_PENALTY_PER_YEAR * Math.abs(years - optimal)
  );
