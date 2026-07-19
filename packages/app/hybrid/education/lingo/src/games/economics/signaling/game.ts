import {
  ACCEPT_RATIO,
  COST,
  COST_HIGH,
  COST_LOW,
  COUNT,
  PRODUCTIVITY,
} from './constants';
import type { Candidate, CandidateType, Wages } from './types';

export const scheduleCandidates = (
  rand: number[],
  n: number
): CandidateType[] => {
  const half = Math.floor(n / 2);
  const pool: CandidateType[] = [
    ...Array.from({ length: half }, (): CandidateType => 'high'),
    ...Array.from({ length: n - half }, (): CandidateType => 'low'),
  ];
  return rand.slice(0, n).map((value) => {
    const index = Math.min(0.999, Math.max(0, value)) * pool.length;
    return pool.splice(Math.floor(index), 1)[0];
  });
};

export const sampleSchedule = (): number[] =>
  Array.from({ length: COUNT }, () => Math.random());

export const choosesEducation = (
  type: CandidateType,
  costHigh: number,
  costLow: number,
  w0: number,
  w1: number
): boolean => {
  const cost = type === 'high' ? costHigh : costLow;
  return w1 - cost >= w0;
};

export const acceptsWage = (type: CandidateType, wage: number): boolean =>
  wage >= ACCEPT_RATIO * PRODUCTIVITY[type];

export const firmProfit = (
  type: CandidateType,
  wage: number,
  accepted: boolean
): number => (accepted ? PRODUCTIVITY[type] - wage : 0);

export const applicantPayoff = (
  _type: CandidateType,
  w0: number,
  w1: number,
  cost: number
): number => Math.max(w0, w1 - cost);

export const premiumFor = (w0: number, w1: number): number => w1 - w0;

export const separatesPremium = (premium: number): boolean =>
  premium >= COST_HIGH && premium < COST_LOW;

export const resolveCandidates = (
  types: CandidateType[],
  wages: Wages
): Candidate[] =>
  types.map((type, id) => {
    const education: 0 | 1 = choosesEducation(
      type,
      COST.high,
      COST.low,
      wages.w0,
      wages.w1
    )
      ? 1
      : 0;
    const wage = education === 1 ? wages.w1 : wages.w0;
    const accepted = acceptsWage(type, wage);
    return {
      id,
      type,
      education,
      wage,
      accepted,
      profit: firmProfit(type, wage, accepted),
    };
  });

export const totalProfit = (
  candidates: CandidateType[],
  wages: Wages
): number =>
  resolveCandidates(candidates, wages).reduce((sum, c) => sum + c.profit, 0);
