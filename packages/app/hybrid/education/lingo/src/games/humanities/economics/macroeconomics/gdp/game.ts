import { TOLERANCE } from './constants';
import type { Components } from './types';

export const computeGdp = (components: Components): number =>
  components.consumption +
  components.investment +
  components.government +
  components.netExports;

export const computeRealGdp = (nominal: number, priceIndex: number): number =>
  Math.round(nominal / (priceIndex / 100));

export const computeDeflator = (nominal: number, real: number): number =>
  real === 0 ? 0 : Math.round((nominal / real) * 100);

export const withinTolerance = (
  actual: number,
  target: number,
  tolerance: number = TOLERANCE
): boolean => Math.abs(actual - target) <= tolerance;
