import type { CountryEntry } from '../_shared/countries-data';

export interface FlagQuestion {
  current: CountryEntry;
  options: CountryEntry[];
}

export type QuizMessage = {
  text: string;
  correct: boolean;
} | null;
