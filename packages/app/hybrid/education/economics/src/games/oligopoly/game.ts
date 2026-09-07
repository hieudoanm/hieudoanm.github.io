import { INTERCEPT, MAX_Q, MC } from './constants';

export const demand = (qA: number, qB: number): number => INTERCEPT - qA - qB;

export const price = (qA: number, qB: number): number =>
  Math.max(0, demand(qA, qB));

export const bestReply = (qA: number): number =>
  Math.min(MAX_Q, Math.max(0, Math.round((90 - qA) / 2)));

export const profit = (q: number, currentPrice: number): number =>
  (currentPrice - MC) * q;
