import type { GapSign, PriceDirection } from './types';

export const POTENTIAL_OUTPUT = 100;

export const EXPECTED_PRICE_LEVEL = 100;

export const SRAS_SLOPE = 5;

export const AD_SHOCKS: number[] = [8500, 11500, 10000, 9500, 12000, 10500];

export const TOTAL_ROUNDS = AD_SHOCKS.length;

export interface GapOption {
  value: GapSign;
  label: string;
  emoji: string;
}

export const GAP_OPTIONS: GapOption[] = [
  { value: 'negative', label: 'Recession', emoji: '📉' },
  { value: 'positive', label: 'Boom', emoji: '📈' },
  { value: 'zero', label: 'Parity', emoji: '⚖️' },
];

export interface PriceOption {
  value: PriceDirection;
  label: string;
  emoji: string;
}

export const PRICE_OPTIONS: PriceOption[] = [
  { value: 'rises', label: 'Rises', emoji: '▲' },
  { value: 'falls', label: 'Falls', emoji: '▼' },
  { value: 'same', label: 'Same', emoji: '▶' },
];
