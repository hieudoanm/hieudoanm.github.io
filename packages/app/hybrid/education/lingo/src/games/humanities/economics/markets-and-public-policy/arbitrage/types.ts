export type Currency = 'USD' | 'EUR' | 'JPY';

export type TrianglePathId = 'direct' | 'usd_eur_jpy_usd' | 'usd_jpy_eur_usd';

export type Phase = 'choose' | 'reveal' | 'done';

export interface FxRates {
  usdPerEur: number;
  jpyPerUsd: number;
  quotedCross: number;
}

export interface RoundResult {
  round: number;
  rates: FxRates;
  pathId: TrianglePathId;
  finalUsd: number;
  profit: number;
  impliedCross: number;
  ratio: number;
  profitable: boolean;
  bestPath: TrianglePathId;
  arbitrageProfit: number;
}
