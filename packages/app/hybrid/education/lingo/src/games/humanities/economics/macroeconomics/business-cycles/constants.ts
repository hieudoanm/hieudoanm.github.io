import type { ExpansionCategory } from './types';

export const GROWTH: number[] = [2.8, 3.1, 4.2, 5.4, -1.9, -2.7, 0.4, 1.9];

export const TOTAL_ROUNDS = GROWTH.length;

export const MIN_PRED = 0.0;
export const MAX_PRED = 10.0;

export const START_ROUND = 2;

export const PERFECT_SCORE = 5;
export const SCORE_MULTIPLIER = 2;
export const ZERO_SCORE = 0;

export const CATEGORY_OPTIONS: ExpansionCategory[] = ['expansion', 'recession'];
