import type { Bot } from './types';

export const START_STOCK = 100;
export const MAX_STOCK = 100;
export const TOTAL_ROUNDS = 10;
export const GROWTH_RATE = 15;
export const MAX_HARVEST = 8;

export const BOTS: Bot[] = [
  { id: 'mira', name: 'Mira', emoji: '🐄', harvest: 4 },
  { id: 'pip', name: 'Pip', emoji: '🐦', harvest: 2 },
  { id: 'grim', name: 'Grim', emoji: '🏜️', harvest: 5 },
  { id: 'cole', name: 'Cole', emoji: '🪓', harvest: 8 },
];
