import type { ExplorerState, MarketParams } from './types';

export const DEFAULTS: MarketParams = { a: 100, b: 1.25, c: 1 };

export const INITIAL_STATE: ExplorerState = {
  ...DEFAULTS,
  price: 40,
  floorEnabled: false,
  ceilingEnabled: false,
  floor: 30,
  ceiling: 60,
};

export const A_MIN = 20;
export const A_MAX = 200;
export const A_STEP = 10;

export const C_MIN = 0.2;
export const C_MAX = 5;
export const C_STEP = 0.1;

export const PRICE_STEP = 1;
export const FLOOR_STEP = 1;
export const CEILING_STEP = 1;
