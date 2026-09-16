export type FailureType =
  | 'negative-externality'
  | 'positive-externality'
  | 'public-good'
  | 'asymmetric-info'
  | 'monopoly'
  | 'common-resource';

export type Policy =
  | 'pigouvian-tax'
  | 'subsidy'
  | 'provide-publicly'
  | 'regulation'
  | 'break-up-monopoly'
  | 'cap-and-trade'
  | 'information-disclosure'
  | 'none-coase';

export type Phase = 'scenario' | 'pollution' | 'done';

export interface Scenario {
  id: string;
  name: string;
  failureType: FailureType;
  description: string;
  bestPolicy: Policy;
  why: string;
}

export interface ScenarioAnswer {
  scenarioId: string;
  policy: Policy;
  policyCorrect: boolean;
}

export interface PollutionState {
  gap: number;
  tax: number;
  output: number;
  confirmed: boolean;
}

export interface GameState {
  phase: Phase;
  scenarioIndex: number;
  answers: ScenarioAnswer[];
  lastAnswer: ScenarioAnswer | null;
  score: number;
  pollution: PollutionState;
}

export interface TaxResult {
  optimalOutput: number;
  choseOptimalTax: boolean;
  accuracy: number;
}
