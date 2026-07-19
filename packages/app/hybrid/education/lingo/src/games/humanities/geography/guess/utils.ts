import { borders } from '../_shared/borders';
import { countries, type CountryEntry } from '../_shared/countries-data';
import { pickOptions, POOL, randomFrom } from '../_shared/quiz';
import type { GuessMode, GuessQuestion } from './types';

export const OPTIONS_COUNT = 4;

export const MODES: readonly GuessMode[] = ['flag', 'emoji', 'border'];

const COUNTRY_MAP = new Map(countries.map((entry) => [entry.name, entry]));

/** Countries with at least two neighbours that exist in the dataset. */
export const BORDER_VALID: readonly string[] = Object.keys(borders).filter(
  (name) => borders[name].length >= 2 && COUNTRY_MAP.has(name)
);

const POPULAR = countries
  .filter((entry) => entry.rank > 0 && BORDER_VALID.includes(entry.name))
  .sort((a, b) => a.rank - b.rank)
  .slice(0, 80);

const BORDER_POOL: readonly CountryEntry[] =
  POPULAR.length > 0
    ? POPULAR
    : BORDER_VALID.map((name) => COUNTRY_MAP.get(name)!);

export const neighboursOf = (name: string): string[] => borders[name] ?? [];

const buildFlagQuestion = (): Extract<GuessQuestion, { mode: 'flag' }> => {
  const current = randomFrom(POOL);
  return { mode: 'flag', current, options: pickOptions(current) };
};

const buildEmojiQuestion = (): Extract<GuessQuestion, { mode: 'emoji' }> => {
  const current = randomFrom(POOL);
  return { mode: 'emoji', current, options: pickOptions(current) };
};

const buildBorderQuestion = (): Extract<GuessQuestion, { mode: 'border' }> => {
  const current = randomFrom(BORDER_POOL);
  const neighbors = neighboursOf(current.name);
  const correct = randomFrom(neighbors);
  const others = BORDER_VALID.filter(
    (name) => name !== current.name && !neighbors.includes(name)
  );
  const decoys = [...others]
    .sort(() => Math.random() - 0.5)
    .slice(0, OPTIONS_COUNT - 1);
  const options = [...decoys, correct].sort(() => Math.random() - 0.5);
  return {
    mode: 'border',
    currentName: current.name,
    currentFlag: current.flag,
    correct,
    options,
  };
};

export const buildQuestion = (mode: GuessMode): GuessQuestion => {
  if (mode === 'border') return buildBorderQuestion();
  if (mode === 'emoji') return buildEmojiQuestion();
  return buildFlagQuestion();
};

export const isCorrectGuess = (
  question: GuessQuestion,
  value: string
): boolean => {
  if (question.mode === 'border') return value === question.correct;
  if (question.mode === 'emoji') return value === question.current.flag;
  return value === question.current.name;
};
