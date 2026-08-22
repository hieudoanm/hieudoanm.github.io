import { pickOptions, POOL, randomFrom } from '../_shared/quiz';
import type { CountryEntry } from '../_shared/countries-data';
import type { FlagQuestion } from './types';

export const buildFlagQuestion = (): FlagQuestion => {
  const current = randomFrom(POOL);
  return { current, options: pickOptions(current) };
};

export const isCorrectName = (guess: string, current: CountryEntry): boolean =>
  guess === current.name;
