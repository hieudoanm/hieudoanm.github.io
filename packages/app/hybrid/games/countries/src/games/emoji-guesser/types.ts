import type { CountryEntry } from '../_shared/countries-data';

export interface EmojiQuestion {
  current: CountryEntry;
  options: CountryEntry[];
}

export type QuizMessage = {
  text: string;
  correct: boolean;
} | null;
