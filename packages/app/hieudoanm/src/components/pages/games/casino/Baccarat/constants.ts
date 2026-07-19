export const SUITS = ['♠', '♥', '♦', '♣'] as const;
export const RANKS = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
] as const;
export const DECK_COUNT = 6;

export type Suit = (typeof SUITS)[number];
export type Rank = (typeof RANKS)[number];

export interface Card {
  rank: Rank;
  suit: Suit;
}

export type Bet = 'player' | 'banker' | 'tie';
export type Phase = 'bet' | 'deal' | 'result';

export const PAYOUTS: Record<Bet, number> = {
  player: 2,
  banker: 1.95,
  tie: 8,
};
