export type GapSign = 'negative' | 'positive' | 'zero';

export type PriceDirection = 'rises' | 'falls' | 'same';

export type Phase = 'predict' | 'reveal' | 'done';

export interface RoundResult {
  round: number;
  a: number;
  gapPick: GapSign;
  pricePick: PriceDirection;
  expectedGap: GapSign;
  expectedPrice: PriceDirection;
  shortRunPrice: number;
  shortRunOutput: number;
  gapPercent: number;
  longRunPrice: number;
  gapCorrect: boolean;
  priceCorrect: boolean;
  points: number;
}
