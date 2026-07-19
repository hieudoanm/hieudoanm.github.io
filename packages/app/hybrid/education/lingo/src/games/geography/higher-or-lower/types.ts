import type { CountryEntry } from '../_shared/countries-data';

export type HLMode = 'population' | 'passport';

export type HLSide = 'left' | 'right';

export interface HLPair {
  left: CountryEntry;
  right: CountryEntry;
}

export interface HLQuestion {
  mode: HLMode;
  pair: HLPair;
  leftValue: number;
  rightValue: number;
}

export type HLMessage = {
  text: string;
  correct: boolean;
} | null;
