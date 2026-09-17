export type Phase = 'simulate' | 'policy';

export type TrapPhase = 'trapped' | 'escaping' | 'at-threshold';

export interface Scenario {
  id: string;
  label: string;
  initialCapital: number;
  savingsRate: number;
  subsistence: number;
  threshold: number;
}

export interface Simulation {
  year: number;
  income: number;
  netSavings: number;
  capital: number;
}

export interface SimResult {
  scenario: Scenario;
  simulations: Simulation[];
  finalCapital: number;
  trapPhase: TrapPhase;
  transfer: number;
  escaped: boolean;
}

export interface Challenge {
  scenario: Scenario;
  minimumTransfer: number;
  guess: number;
  escaped: boolean;
  correct: boolean;
  score: number;
}
