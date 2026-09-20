import { ITEMS } from './constants';
import type { Item } from './types';

export const gap = (wta: number, wtp: number): number => Math.max(0, wta - wtp);

export const average = (xs: number[]): number =>
  xs.length === 0 ? 0 : xs.reduce((sum, x) => sum + x, 0) / xs.length;

export const nextItem = (rand: number): Item => {
  const index = Math.floor(rand * ITEMS.length);
  return ITEMS[index % ITEMS.length];
};
