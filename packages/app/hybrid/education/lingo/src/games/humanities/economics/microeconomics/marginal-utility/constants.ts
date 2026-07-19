import type { Bundle, ChallengeScenario } from './types';

export const APPLES_MU = [20, 12, 7, 4, 2, 1];

export const COOKIES_MU = [15, 10, 8, 5, 3, 1];

export const DEFAULT_PA = 2;

export const DEFAULT_PC = 1;

export const DEFAULT_INCOME = 10;

export const MIN_PRICE = 1;

export const MAX_PRICE = 5;

export const MIN_INCOME = 2;

export const MAX_INCOME = 16;

export const ACCEPT_SCORE = 100;

export const TOTAL_ROUNDS = 5;

export const SCENARIOS: ChallengeScenario[] = [
  {
    pa: 2,
    pc: 1,
    income: 10,
    options: [
      { apples: 2, cookies: 4 },
      { apples: 4, cookies: 1 },
      { apples: 3, cookies: 4 },
      { apples: 1, cookies: 5 },
      { apples: 5, cookies: 0 },
    ],
  },
  {
    pa: 3,
    pc: 2,
    income: 12,
    options: [
      { apples: 0, cookies: 6 },
      { apples: 1, cookies: 4 },
      { apples: 4, cookies: 0 },
      { apples: 2, cookies: 3 },
      { apples: 3, cookies: 1 },
    ],
  },
  {
    pa: 1,
    pc: 4,
    income: 8,
    options: [
      { apples: 5, cookies: 0 },
      { apples: 4, cookies: 1 },
      { apples: 3, cookies: 1 },
      { apples: 0, cookies: 2 },
      { apples: 1, cookies: 1 },
    ],
  },
  {
    pa: 2,
    pc: 3,
    income: 9,
    options: [
      { apples: 2, cookies: 1 },
      { apples: 1, cookies: 2 },
      { apples: 3, cookies: 0 },
      { apples: 0, cookies: 3 },
      { apples: 3, cookies: 1 },
    ],
  },
  {
    pa: 4,
    pc: 1,
    income: 8,
    options: [
      { apples: 0, cookies: 6 },
      { apples: 2, cookies: 0 },
      { apples: 1, cookies: 3 },
      { apples: 1, cookies: 4 },
      { apples: 0, cookies: 5 },
    ],
  },
];
