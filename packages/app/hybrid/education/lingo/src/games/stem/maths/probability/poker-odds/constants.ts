import type { PokerSuit } from './types';

export const RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export const SUITS: PokerSuit[] = ['h', 'd', 'c', 's'];

export const SUIT_SYMBOLS: Record<PokerSuit, string> = {
  h: '♥',
  d: '♦',
  c: '♣',
  s: '♠',
};

export const SUIT_COLORS: Record<PokerSuit, string> = {
  h: '#f87171',
  d: '#f87171',
  c: '#e2e8f0',
  s: '#e2e8f0',
};

export const RANK_STR: Record<number, string> = {
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: 'J',
  12: 'Q',
  13: 'K',
  14: 'A',
};

/** 1 high card … 10 royal flush. */
export const HAND_NAMES: Record<number, string> = {
  10: 'Royal Flush',
  9: 'Straight Flush',
  8: 'Four of a Kind',
  7: 'Full House',
  6: 'Flush',
  5: 'Straight',
  4: 'Three of a Kind',
  3: 'Two Pair',
  2: 'One Pair',
  1: 'High Card',
};

export const ITERATIONS = 5000;
export const MAX_PLAYERS = 9;
