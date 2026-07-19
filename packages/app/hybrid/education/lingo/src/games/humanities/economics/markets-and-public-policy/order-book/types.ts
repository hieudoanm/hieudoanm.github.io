export type Action = 'buy-ask' | 'sell-bid' | 'post-bid' | 'post-ask';

export type Phase = 'choose' | 'reveal' | 'done';

export type Fill = 'none' | 'buy' | 'sell';

export interface CrossAway {
  price: number;
  delta: number;
}

export interface RoundResult {
  round: number;
  action: Action;
  midBefore: number;
  midAfter: number;
  fill: Fill;
  fillPrice: number | null;
  delta: number;
  cashDelta: number;
  spreadCost: number;
  totalSpreadCost: number;
  cash: number;
  position: number;
  volume: number;
}

export interface GameState {
  phase: Phase;
  round: number;
  mid: number;
  cash: number;
  position: number;
  volume: number;
  spreadCost: number;
  roundResult: RoundResult | null;
  results: RoundResult[];
}
