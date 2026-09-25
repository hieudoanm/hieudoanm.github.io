import type { Scenario } from './types';

export const YEARS = 20;

export const ALPHA = 0.4;
export const TOTAL_FACTOR = 6.9;

export const MIN_SAVINGS_RATE = 0.05;
export const MAX_SAVINGS_RATE = 0.4;
export const MIN_INITIAL_CAPITAL = 5;
export const MAX_INITIAL_CAPITAL = 60;

export const MIN_TRANSFER = 0;
export const MAX_TRANSFER = 200;

export const PRESETS: Scenario[] = [
  {
    id: 'poor',
    label: 'Poor household',
    initialCapital: 5,
    savingsRate: 0.2,
    subsistence: 30,
    threshold: 40,
  },
  {
    id: 'mid',
    label: 'Mid household',
    initialCapital: 30,
    savingsRate: 0.2,
    subsistence: 30,
    threshold: 40,
  },
  {
    id: 'near-threshold',
    label: 'Near threshold',
    initialCapital: 38,
    savingsRate: 0.2,
    subsistence: 30,
    threshold: 40,
  },
];
