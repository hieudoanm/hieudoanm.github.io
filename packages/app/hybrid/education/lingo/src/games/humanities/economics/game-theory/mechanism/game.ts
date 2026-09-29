import { COST, MAX_VALUE, MIN_VALUE, SHARE } from './constants';
import type { Outcome, Rule } from './types';

const sum = (values: number[]): number => values.reduce((a, b) => a + b, 0);

const othersSum = (reports: number[], i: number): number =>
  sum(reports.filter((_, index) => index !== i));

export const sampleValues = (rand: () => number = Math.random): number[] =>
  [0, 1, 2].map(() => Math.floor(rand() * (MAX_VALUE + 1)));

export const aiReports = (values: number[]): number[] => values.map((v) => v);

export const isPivotal = (reports: number[], i: number): boolean =>
  sum(reports) >= COST && othersSum(reports, i) < COST;

export const pivotTaxFor = (reports: number[], i: number): number =>
  isPivotal(reports, i) ? Math.max(0, COST - othersSum(reports, i)) : 0;

export const outcome = (
  rule: Rule,
  reports: number[],
  cost: number = COST
): Outcome => {
  const built = sum(reports) >= cost;
  if (!built) {
    return {
      built: false,
      payments: reports.map(() => 0),
      pivotTaxes: reports.map(() => 0),
    };
  }
  const base = cost / 3;
  if (rule === 'equal') {
    return {
      built: true,
      payments: reports.map(() => base),
      pivotTaxes: reports.map(() => 0),
    };
  }
  const pivotTaxes = reports.map((_, i) => pivotTaxFor(reports, i));
  return {
    built: true,
    payments: pivotTaxes.map((tax, i) => base + tax),
    pivotTaxes,
  };
};

export const netPayoffs = (
  rule: Rule,
  values: number[],
  reports: number[]
): number[] => {
  const { built, payments } = outcome(rule, reports, COST);
  return values.map((v, i) => (built ? v - payments[i] : 0));
};

export const idealReport = (
  rule: Rule,
  value: number,
  othersReports: number[]
): number => {
  if (rule === 'pivot') return value;
  const others = sum(othersReports);
  if (others >= COST) return 0;
  if (value <= SHARE) return 0;
  return Math.max(0, Math.min(MAX_VALUE, COST - others));
};

export const clampReport = (report: number): number =>
  Math.max(MIN_VALUE, Math.min(MAX_VALUE, Math.round(report)));
