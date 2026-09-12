import type { Card } from '../_shared/cards';

export type Bet = 'player' | 'banker' | 'tie';

export type Phase = 'bet' | 'result';

export type RoundResult = 'player' | 'banker' | 'tie';

export const PAYOUTS: Record<Bet, number> = {
  player: 20,
  banker: 19,
  tie: 80,
};

export const STAKE = 10;
export const INITIAL_CREDITS = 200;

export interface DealOutcome {
  shoe: Card[];
  playerHand: Card[];
  bankerHand: Card[];
  result: RoundResult;
  won: number;
}
