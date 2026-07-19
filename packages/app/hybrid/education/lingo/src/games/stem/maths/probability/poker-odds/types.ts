export type PokerSuit = 'h' | 'd' | 'c' | 's';

export interface Card {
  /** 2–14 (T=10, J=11, Q=12, K=13, A=14). */
  rank: number;
  suit: PokerSuit;
}

export interface EquityResult {
  equity: number;
  win: number;
  tie: number;
}
