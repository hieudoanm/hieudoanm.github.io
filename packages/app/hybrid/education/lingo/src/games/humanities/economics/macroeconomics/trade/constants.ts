import type { Market, RoundSpec } from './types';

export const LAB_MARKET: Market = {
  ad: 100,
  as: 20,
  bd: 0.5,
  bs: 0.5,
  worldP: 25,
};

export const AUTARKY_PRICE = 60;

export const WORLD_PRICE_MIN = 10;
export const WORLD_PRICE_MAX = 50;
export const WORLD_PRICE_STEP = 1;

export const TARIFF_MIN = 0;
export const TARIFF_MAX = 0.5;
export const TARIFF_STEP = 0.01;

export const TOTAL_ROUNDS = 4;

export const RETALIATION_MIN = 0;
export const RETALIATION_MAX = 0.5;
export const RETALIATION_STEP = 0.05;

export const RETALIATION_LEVELS: number[] = [0, 0.1, 0.25, 0.5];

export const NASH_TARIFF = 0.5;

const MARKET_A: Market = { ad: 60, as: 20, bd: 1, bs: 1, worldP: 25 };
const MARKET_B: Market = { ad: 65, as: 20, bd: 1, bs: 1, worldP: 25 };
const MARKET_D: Market = { ad: 75, as: 20, bd: 1, bs: 1, worldP: 25 };

export const ROUNDS: RoundSpec[] = [
  {
    kind: 'revenue',
    market: MARKET_B,
    options: [0.1, 0.2, 0.35, 0.5],
    target: 0,
  },
  {
    kind: 'protection',
    market: MARKET_A,
    options: [0.1, 0.25, 0.4, 0.5],
    target: 10,
  },
  {
    kind: 'import-target',
    market: MARKET_D,
    options: [0.2, 0.35, 0.4, 0.5],
    target: 25,
  },
  { kind: 'retaliation', options: [], target: 0 },
];

export const FIRST_ROUND_SPEC: RoundSpec = ROUNDS[0];
