import type { CountryEntry } from '../_shared/countries-data';
import { pickOptions, POOL, randomFrom } from '../_shared/quiz';
import type { EmojiQuestion } from './types';

export const buildEmojiQuestion = (): EmojiQuestion => {
  const current = randomFrom(POOL);
  return { current, options: pickOptions(current) };
};

export const isCorrectFlag = (guess: string, current: CountryEntry): boolean =>
  guess === current.flag;
