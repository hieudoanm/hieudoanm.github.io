export type Suit = 'h' | 'd' | 'c' | 's';
export type Card = { rank: number; suit: Suit };
export type Results = { win: number; lose: number; tie: number; total: number };
export interface Outcome {
  hand: string;
  win: number;
  lose: number;
  tie: number;
  total: number;
  equity: number;
}
