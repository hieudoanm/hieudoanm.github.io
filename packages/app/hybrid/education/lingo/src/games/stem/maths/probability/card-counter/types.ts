import type { Card } from '../_shared/cards';

export interface CountingCard extends Card {
  /** Hi-Lo running count contribution. */
  value: number;
}

export const DECK_SIZE = 52;
