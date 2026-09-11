import type {
  AnnuityRound,
  CalculatorResult,
  CompareRound,
  CompoundingFrequency,
  NpvRound,
} from './types';
import {
  ANNUITY_LUMP_SUM,
  ANNUITY_PAYMENT,
  ANNUITY_RATE,
  ANNUITY_YEARS,
  COMPARE_ROUNDS,
  MAX_YEARS,
  PROJECT_CASH_FLOWS,
  PROJECT_RATE,
} from './constants';

const ln2 = Math.log(2);

export const futureValue = (
  principal: number,
  rate: number,
  years: number,
  compounding: CompoundingFrequency
): number => {
  if (compounding === 'continuous') {
    return principal * Math.exp(rate * years);
  }
  return principal * Math.pow(1 + rate / compounding, compounding * years);
};

export const presentValue = (
  futureVal: number,
  rate: number,
  years: number
): number => futureVal / Math.pow(1 + rate, years);

export const doublingTime = (rate: number): number =>
  rate > 0 ? ln2 / Math.log(1 + rate) : Infinity;

export const rule72 = (rate: number): number =>
  rate > 0 ? 72 / (rate * 100) : Infinity;

export const computeCalculatorResult = (
  principal: number,
  rate: number,
  years: number,
  compounding: CompoundingFrequency
): CalculatorResult => {
  const r = rate / 100;
  const fv = futureValue(principal, r, years, compounding);
  const pv = presentValue(fv, r, years);
  const doubling = doublingTime(r);
  const r72 = rule72(r);
  const curvePoints = buildCurvePoints(principal, r, compounding);
  return { fv, pv, doublingTime: doubling, rule72: r72, curvePoints };
};

const buildCurvePoints = (
  principal: number,
  rate: number,
  compounding: CompoundingFrequency
): { year: number; value: number }[] => {
  const maxYear = Math.max(1, Math.min(MAX_YEARS, 30));
  const points: { year: number; value: number }[] = [];
  for (let y = 0; y <= maxYear; y++) {
    points.push({
      year: y,
      value: futureValue(principal, rate, y, compounding),
    });
  }
  return points;
};

export const annuityPresentValue = (
  payment: number,
  years: number,
  rate: number
): number => {
  if (rate === 0) return payment * years;
  return (payment * (1 - Math.pow(1 + rate, -years))) / rate;
};

export const netPresentValue = (cashFlows: number[], rate: number): number =>
  cashFlows.reduce((sum, cf, t) => sum + cf / Math.pow(1 + rate, t), 0);

export const formatCurrency = (n: number): string =>
  `$${Math.round(n).toLocaleString('en-US')}`;

export const buildCompareRound = (
  roundIndex: number,
  answer: string
): CompareRound => {
  const offers = COMPARE_ROUNDS[roundIndex];
  const fvA = futureValue(
    offers[0].principal,
    offers[0].rate,
    offers[0].years,
    offers[0].compounding
  );
  const fvB = futureValue(
    offers[1].principal,
    offers[1].rate,
    offers[1].years,
    offers[1].compounding
  );
  const correct = fvA >= fvB ? 'offer-a' : 'offer-b';
  return {
    round: roundIndex + 1,
    offers: offers as [(typeof offers)[0], (typeof offers)[1]],
    correct,
    answer,
    correctChoice: answer === correct,
    result: Math.max(fvA, fvB),
  };
};

export const buildAnnuityRound = (answer: string): AnnuityRound => {
  const apv = annuityPresentValue(ANNUITY_PAYMENT, ANNUITY_YEARS, ANNUITY_RATE);
  const correct = apv >= ANNUITY_LUMP_SUM ? 'annuity' : 'lump-sum';
  return {
    round: 4,
    payment: ANNUITY_PAYMENT,
    years: ANNUITY_YEARS,
    rate: ANNUITY_RATE,
    annuityPV: apv,
    lumpSum: ANNUITY_LUMP_SUM,
    answer,
    correctChoice: answer === correct,
  };
};

export const buildNpvRound = (answer: string): NpvRound => {
  const npv = netPresentValue(PROJECT_CASH_FLOWS, PROJECT_RATE);
  const correct = npv > 0 ? 'accept' : 'reject';
  return {
    cashFlows: PROJECT_CASH_FLOWS,
    rate: PROJECT_RATE,
    npv,
    answer,
    correctChoice: answer === correct,
  };
};
