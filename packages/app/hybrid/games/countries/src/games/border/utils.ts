import { borders } from '../_shared/borders';
import { countries, type CountryEntry } from '../_shared/countries-data';
import { randomFrom } from '../_shared/quiz';
import type { BorderQuestion } from './types';

export const OPTIONS_COUNT = 4;

const COUNTRY_MAP = new Map(countries.map((entry) => [entry.name, entry]));

/** Countries with at least two neighbours that exist in the dataset. */
export const VALID: readonly string[] = Object.keys(borders).filter(
  (name) => borders[name].length >= 2 && COUNTRY_MAP.has(name)
);

const POPULAR = countries
  .filter((entry) => entry.rank > 0 && VALID.includes(entry.name))
  .sort((a, b) => a.rank - b.rank)
  .slice(0, 80);

const POOL: readonly CountryEntry[] =
  POPULAR.length > 0 ? POPULAR : VALID.map((name) => COUNTRY_MAP.get(name)!);

export const neighboursOf = (name: string): string[] => borders[name] ?? [];

export const buildBorderQuestion = (): BorderQuestion => {
  const current = randomFrom(POOL);
  const neighbors = neighboursOf(current.name);
  const correct = randomFrom(neighbors);
  const others = VALID.filter(
    (name) => name !== current.name && !neighbors.includes(name)
  );
  const decoys = [...others]
    .sort(() => Math.random() - 0.5)
    .slice(0, OPTIONS_COUNT - 1);
  const options = [...decoys, correct].sort(() => Math.random() - 0.5);
  return {
    currentName: current.name,
    currentFlag: current.flag,
    correct,
    options,
  };
};

export const isCorrectBorder = (guess: string, correct: string): boolean =>
  guess === correct;
