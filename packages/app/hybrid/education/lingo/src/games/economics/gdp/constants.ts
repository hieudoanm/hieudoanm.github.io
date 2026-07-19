import type { Components } from './types';

export const TOLERANCE = 5;

export const CONSUMPTION_MIN = 0;
export const CONSUMPTION_MAX = 200;
export const INVESTMENT_MIN = 0;
export const INVESTMENT_MAX = 120;
export const GOVERNMENT_MIN = 0;
export const GOVERNMENT_MAX = 80;
export const NET_EXPORTS_MIN = -40;
export const NET_EXPORTS_MAX = 40;

export const PRICE_INDEX_MIN = 80;
export const PRICE_INDEX_MAX = 200;
export const PRICE_INDEX_DEFAULT = 100;

export const DEFAULT_COMPONENTS: Components = {
  consumption: 100,
  investment: 60,
  government: 40,
  netExports: 0,
};

export const TARGETS: number[] = [120, 180, 260, 320, 90, 360];

export const TOTAL_ROUNDS = TARGETS.length;
