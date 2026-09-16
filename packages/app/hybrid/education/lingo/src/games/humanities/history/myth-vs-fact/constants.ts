import { MythFactItem } from './types';
import rawItems from './data/items.json';

export const ITEMS = rawItems as MythFactItem[];

export const ROUNDS = 10;

export const CATEGORIES = Array.from(
  new Set(ITEMS.map((item) => item.category))
).sort();
