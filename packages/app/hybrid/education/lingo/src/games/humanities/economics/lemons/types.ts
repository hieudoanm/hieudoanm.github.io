export type Verdict = 'only-lemons' | 'mixed-pool' | 'no-trade';

export type Phase = 'playing' | 'done';

export interface PoolStats {
  offered: number;
  expectedValue: number;
  expectedProfit: number;
  verdict: Verdict;
}

export interface Trial {
  id: number;
  price: number;
  goodsOffered: number;
  lemonsOffered: number;
  expectedValue: number;
  expectedProfit: number;
  verdict: Verdict;
}
