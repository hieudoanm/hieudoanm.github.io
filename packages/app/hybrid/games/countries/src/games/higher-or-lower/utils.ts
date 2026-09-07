import { countries, type CountryEntry } from '../_shared/countries-data';
import { population } from '../_shared/population';
import { randomFrom } from '../_shared/quiz';
import type { HLMode, HLPair, HLQuestion, HLSide } from './types';

export const MODES: readonly HLMode[] = ['population', 'passport'];

const PASSPORT_POOL: readonly CountryEntry[] = countries.filter(
  (entry) => entry.rank > 0
);

export const HL_POOL: readonly CountryEntry[] = PASSPORT_POOL.filter(
  (entry) => population[entry.name] !== undefined
);

const poolFor = (mode: HLMode): readonly CountryEntry[] =>
  mode === 'passport' ? PASSPORT_POOL : HL_POOL;

export const populationOf = (name: string): number => population[name] ?? 0;

const RANK: Record<string, number> = PASSPORT_POOL.reduce(
  (acc: Record<string, number>, entry) => {
    acc[entry.name] = entry.rank;
    return acc;
  },
  {}
);

export const rankOf = (name: string): number => RANK[name] ?? 0;

export const pickPair = (mode: HLMode): HLPair => {
  const pool = poolFor(mode);
  const left = randomFrom(pool);
  let right = left;
  while (right.name === left.name) {
    right = randomFrom(pool);
  }
  return { left, right };
};

export const buildQuestion = (mode: HLMode): HLQuestion => {
  const pair = pickPair(mode);
  return {
    mode,
    pair,
    leftValue:
      mode === 'passport'
        ? rankOf(pair.left.name)
        : populationOf(pair.left.name),
    rightValue:
      mode === 'passport'
        ? rankOf(pair.right.name)
        : populationOf(pair.right.name),
  };
};

export const isHigherCorrect = (
  side: HLSide,
  leftValue: number,
  rightValue: number
): boolean =>
  side === 'left' ? leftValue >= rightValue : rightValue >= leftValue;

export const isLowerRankCorrect = (
  side: HLSide,
  leftRank: number,
  rightRank: number
): boolean => (side === 'left' ? leftRank <= rightRank : rightRank <= leftRank);

export const formatNum = (value: number): string => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return String(value);
};
