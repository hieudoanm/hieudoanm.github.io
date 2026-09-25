import type { CompoundingFrequency, Offer } from './types';

export const MIN_PRINCIPAL = 100;
export const MAX_PRINCIPAL = 10000;
export const MIN_RATE = 0;
export const MAX_RATE = 12;
export const MIN_YEARS = 1;
export const MAX_YEARS = 40;

export const FREQUENCIES: { value: CompoundingFrequency; label: string }[] = [
  { value: 1, label: 'Annually' },
  { value: 2, label: 'Semi-annually' },
  { value: 12, label: 'Monthly' },
  { value: 'continuous', label: 'Continuous' },
];

export const COMPARE_ROUNDS: Offer[][] = [
  [
    {
      principal: 1000,
      rate: 0.08,
      years: 10,
      compounding: 1,
      label: 'Offer A',
    },
    {
      principal: 1000,
      rate: 0.075,
      years: 10,
      compounding: 12,
      label: 'Offer B',
    },
  ],
  [
    {
      principal: 5000,
      rate: 0.06,
      years: 5,
      compounding: 1,
      label: 'Offer A',
    },
    {
      principal: 4500,
      rate: 0.08,
      years: 5,
      compounding: 2,
      label: 'Offer B',
    },
  ],
  [
    {
      principal: 2000,
      rate: 0.05,
      years: 15,
      compounding: 12,
      label: 'Offer A',
    },
    {
      principal: 3000,
      rate: 0.04,
      years: 15,
      compounding: 1,
      label: 'Offer B',
    },
  ],
];

export const ANNUITY_PAYMENT = 500;
export const ANNUITY_YEARS = 10;
export const ANNUITY_RATE = 0.06;
export const ANNUITY_LUMP_SUM = 3500;

export const PROJECT_CASH_FLOWS = [-1000, 300, 400, 400, 500];
export const PROJECT_RATE = 0.05;

export const TOTAL_ROUNDS = 5;
