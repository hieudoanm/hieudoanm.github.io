export type Suit = 'h' | 'd' | 'c' | 's';
export interface Card {
  rank: number;
  suit: Suit;
}
export interface Results {
  win: number;
  lose: number;
  tie: number;
  total: number;
}
export interface Outcome {
  hand: string;
  win: number;
  lose: number;
  tie: number;
  total: number;
  equity: number;
}
