export interface Market {
  ad: number;
  as: number;
  bd: number;
  bs: number;
  worldP: number;
}

export type ChallengeKind = 'revenue' | 'protection' | 'import-target';

export type RoundKind = ChallengeKind | 'retaliation';

export type Phase = 'explore' | 'challenge' | 'reveal' | 'done';

export type RoundSpec =
  | { kind: 'revenue'; market: Market; options: number[]; target: number }
  | { kind: 'protection'; market: Market; options: number[]; target: number }
  | {
      kind: 'import-target';
      market: Market;
      options: number[];
      target: number;
    }
  | {
      kind: 'retaliation';
      market?: undefined;
      options: number[];
      target: number;
    };

export interface Analysis {
  autarkyPrice: number;
  autarkyQuantity: number;
  priceAfter: number;
  imports: number;
  demandAtPriceAfter: number;
  supplyAtPriceAfter: number;
  consumerSurplus: number;
  producerSurplus: number;
  revenue: number;
  deadweightLoss: number;
}

export interface RoundResult {
  round: number;
  kind: RoundKind;
  chosen: number;
  answer: number;
  score: number;
}

export interface GameState {
  phase: Phase;
  worldPrice: number;
  tariff: number;
  round: number;
  spec: RoundSpec;
  myTariff: number;
  otherTariff: number;
  result: RoundResult | null;
  results: RoundResult[];
  totalScore: number;
}

export type GameAction =
  | { type: 'SET_WORLD_PRICE'; value: number }
  | { type: 'SET_TARIFF'; value: number }
  | { type: 'START_ROUNDS' }
  | { type: 'SUBMIT_CHOICE'; tariff: number }
  | { type: 'SUBMIT_RETALIATION' }
  | { type: 'SET_MY_TARIFF'; value: number }
  | { type: 'SET_OTHER_TARIFF'; value: number }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };
