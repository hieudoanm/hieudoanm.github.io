import type { CountryEntry } from '../_shared/countries-data';

export type GuessMode = 'flag' | 'emoji' | 'border';

export type GuessQuestion =
  | { mode: 'flag'; current: CountryEntry; options: CountryEntry[] }
  | { mode: 'emoji'; current: CountryEntry; options: CountryEntry[] }
  | {
      mode: 'border';
      currentName: string;
      currentFlag: string;
      correct: string;
      options: string[];
    };

export type QuizMessage = {
  text: string;
  correct: boolean;
} | null;
