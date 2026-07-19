import { SPREAD, STEP } from './constants';
import type { Action, CrossAway, Fill } from './types';

export const bidFor = (mid: number): number => mid - SPREAD / 2;

export const askFor = (mid: number): number => mid + SPREAD / 2;

export const randomWalkStep = (random01: number): 1 | -1 =>
  random01 < 0.5 ? 1 : -1;

export const sampleStep = (): 1 | -1 => randomWalkStep(Math.random());

export const nextMid = (mid: number, step: number): number => mid + STEP * step;

export const limitFill = (
  buyPrice: number | null,
  sellPrice: number | null,
  newMid: number
): Fill => {
  if (buyPrice !== null && newMid >= buyPrice) return 'buy';
  if (sellPrice !== null && newMid <= sellPrice) return 'sell';
  return 'none';
};

export const crossAway = (action: Action, mid: number): CrossAway => {
  if (action === 'buy-ask') return { price: askFor(mid), delta: 1 };
  if (action === 'sell-bid') return { price: bidFor(mid), delta: -1 };
  return { price: 0, delta: 0 };
};

export const pnl = (cash: number, position: number, mid: number): number =>
  cash + position * mid;

export const roundTripCost = (
  action: Action,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _mid: number
): number => (action === 'buy-ask' || action === 'sell-bid' ? SPREAD / 2 : 0);
