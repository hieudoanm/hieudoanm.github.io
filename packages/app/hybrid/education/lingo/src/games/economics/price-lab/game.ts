import type { MarketCondition } from './types';

export const demandAt = (price: number, a: number, b: number): number =>
  Math.max(0, a - b * price);

export const supplyAt = (price: number, c: number): number =>
  Math.max(0, c * price);

export const gap = (price: number, a: number, b: number, c: number): number =>
  demandAt(price, a, b) - supplyAt(price, c);

export const equilibriumPrice = (a: number, b: number, c: number): number =>
  b + c === 0 ? 0 : a / (b + c);

export const equilibriumQuantity = (a: number, b: number, c: number): number =>
  b + c === 0 ? 0 : (a * c) / (b + c);

export const maxAffordablePrice = (a: number, b: number): number =>
  b === 0 ? 0 : a / b;

export const elasticityAt = (a: number, b: number, c: number): number => {
  const qStar = equilibriumQuantity(a, b, c);
  if (qStar === 0) return 0;
  return Math.abs((b * equilibriumPrice(a, b, c)) / qStar);
};

export const totalSurplusAt = (a: number, b: number, c: number): number => {
  const pStar = equilibriumPrice(a, b, c);
  const qStar = equilibriumQuantity(a, b, c);
  const pMax = maxAffordablePrice(a, b);
  return 0.5 * qStar * (pMax - pStar) + 0.5 * qStar * pStar;
};

export const effectivePrice = (
  price: number,
  floorEnabled: boolean,
  floor: number,
  ceilingEnabled: boolean,
  ceiling: number
): number => {
  const floored = floorEnabled ? Math.max(price, floor) : price;
  return ceilingEnabled ? Math.min(floored, ceiling) : floored;
};

export const marketCondition = (gapValue: number): MarketCondition =>
  gapValue > 0 ? 'shortage' : gapValue < 0 ? 'surplus' : 'equilibrium';
