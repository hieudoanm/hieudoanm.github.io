import type { CoefficientChoice } from './types';

export const GROWTH_MIN = -3;
export const GROWTH_MAX = 6;
export const GROWTH_STEP = 0.5;

export const G_STAR_MIN = 1;
export const G_STAR_MAX = 4;
export const G_STAR_STEP = 0.1;
export const G_STAR_DEFAULT = 2.5;

export const C_MIN = 0.1;
export const C_MAX = 0.9;
export const C_STEP = 0.05;
export const C_DEFAULT = 0.5;

export const U_STAR_MIN = 3;
export const U_STAR_MAX = 8;
export const U_STAR_STEP = 0.1;
export const U_STAR_DEFAULT = 5;

export const QUARTERS = 10;
export const STEER_ROUNDS = 2;
export const TOLERANCE = 0.25;

export const DATA_G_STAR = 2.5;

export const COEFFICIENT_CHOICES: readonly CoefficientChoice[] = [
  0.2, 0.3, 0.4, 0.5, 0.6,
];
