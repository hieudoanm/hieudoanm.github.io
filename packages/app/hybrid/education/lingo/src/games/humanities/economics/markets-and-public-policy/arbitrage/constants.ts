import type { FxRates, TrianglePathId } from './types';

export const START_USD = 1000;

export const TOTAL_ROUNDS = 5;

export const TOLERANCE = 0.001;

export const QUOTES: FxRates[] = [
  { usdPerEur: 1.25, jpyPerUsd: 100, quotedCross: 126.125 },
  { usdPerEur: 1.25, jpyPerUsd: 100, quotedCross: 125.75 },
  { usdPerEur: 1.25, jpyPerUsd: 100, quotedCross: 125.5 },
  { usdPerEur: 1.25, jpyPerUsd: 100, quotedCross: 125.25 },
  { usdPerEur: 1.25, jpyPerUsd: 100, quotedCross: 125.125 },
];

export const PATHS: Record<
  TrianglePathId,
  { label: string; routes: string; description: string }
> = {
  direct: {
    label: 'Hold USD',
    routes: 'USD',
    description: 'Take no trades and keep your 1000 USD.',
  },
  usd_eur_jpy_usd: {
    label: 'Triangle A',
    routes: 'USD → EUR → JPY → USD',
    description: 'Buy EUR for USD, buy JPY for EUR, then sell JPY for USD.',
  },
  usd_jpy_eur_usd: {
    label: 'Triangle B',
    routes: 'USD → JPY → EUR → USD',
    description: 'Buy JPY for USD, buy EUR for JPY, then sell EUR for USD.',
  },
};
