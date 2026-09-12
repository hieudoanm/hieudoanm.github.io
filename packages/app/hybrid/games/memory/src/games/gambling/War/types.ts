import type { Card } from '../_shared/cards';

export type WarResult = 'player' | 'dealer';

export const STAKE = 10;
export const INITIAL_CREDITS = 200;

export interface WarRound {
  playerCard: Card;
  dealerCard: Card;
  wars: number;
  result: WarResult;
  /** Total payout multiple of the stake (2 base, doubling per war). */
  multiplier: number;
  /** Deck left after the round resolved. */
  remaining: Card[];
}
