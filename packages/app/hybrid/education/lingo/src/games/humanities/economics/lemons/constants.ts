import type { Verdict } from './types';

export const GOOD_CARS = 4;
export const LEMON_CARS = 16;
export const TOTAL_CARS = GOOD_CARS + LEMON_CARS;

export const GOOD_RESERVATION = 10000;
export const LEMON_RESERVATION = 4000;

export const GOOD_VALUE = 12000;
export const LEMON_VALUE = 6000;

export const MIN_PRICE = 0;
export const MAX_PRICE = 15000;
export const MAX_TRIALS = 10;
export const MIN_FINISH_TRIALS = 4;

export const QUICK_PRICES = [4000, 6000, 8000, 10000, 12000];

export const VERDICT_LABEL: Record<Verdict, string> = {
  'no-trade': 'No trade',
  'only-lemons': 'Only lemons offered',
  'mixed-pool': 'Mixed pool — no profit here',
};
