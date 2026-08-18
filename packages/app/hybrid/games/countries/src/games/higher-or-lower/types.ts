import type { CountryEntry } from '../_shared/countries-data';

export type HLSide = 'left' | 'right';

export interface HLPair {
  left: CountryEntry;
  right: CountryEntry;
}

export type HLMessage = {
  text: string;
  correct: boolean;
} | null;
