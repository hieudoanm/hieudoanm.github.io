import type { Action } from './types';

export const START_MID = 100;
export const SPREAD = 4;
export const DEPTH = 5;
export const TOTAL_ROUNDS = 10;
export const STEP = 1;
export const LIMIT_PRICE = 101;

export const ACTION_ORDER: Action[] = [
  'buy-ask',
  'sell-bid',
  'post-bid',
  'post-ask',
];
