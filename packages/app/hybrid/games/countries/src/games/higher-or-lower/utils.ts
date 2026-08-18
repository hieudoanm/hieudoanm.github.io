import { countries, type CountryEntry } from '../_shared/countries-data';
import { population } from '../_shared/population';
import { randomFrom } from '../_shared/quiz';
import type { HLPair, HLSide } from './types';

/** Ranked countries that have a known population. */
export const HL_POOL: readonly CountryEntry[] = countries.filter(
  (entry) => entry.rank > 0 && population[entry.name] !== undefined
);

export const populationOf = (name: string): number => population[name] ?? 0;

export const pickPair = (): HLPair => {
  const left = randomFrom(HL_POOL);
  let right = left;
  while (right.name === left.name) {
    right = randomFrom(HL_POOL);
  }
  return { left, right };
};

export const isHigherCorrect = (
  side: HLSide,
  leftPop: number,
  rightPop: number
): boolean => (side === 'left' ? leftPop >= rightPop : rightPop >= leftPop);

export const formatNum = (value: number): string => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return String(value);
};
