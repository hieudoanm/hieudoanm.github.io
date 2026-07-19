export type Phase = 'setting' | 'reveal' | 'tradeoff' | 'done';

export interface Scenario {
  id: string;
  name: string;
  emoji: string;
  inflation: number;
  outputGap: number;
  naturalRate: number;
}

export interface RoundResult {
  round: number;
  scenario: Scenario;
  chosenRate: number;
  taylorRate: number;
  deviation: number;
  inflationNext: number;
  outputGapNext: number;
}

export interface TradeoffState {
  rate: number;
  inflation: number;
  outputGap: number;
  stepsUsed: number;
}
