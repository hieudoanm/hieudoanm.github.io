export type GamePhase = 'play' | 'reveal' | 'done';

export interface RoundSpec {
  number: number;
  incomes: number[];
  target: number;
  hard: boolean;
}

export interface RoundOutcome {
  round: number;
  baseGini: number;
  chosenTax: number;
  afterGini: number;
  rebate: number;
  povertyBefore: number;
  povertyAfter: number;
  score: number;
  winning: boolean;
}

export interface GiniSummary {
  scores: number[];
}

export interface LorenzPoint {
  x: number;
  y: number;
}
