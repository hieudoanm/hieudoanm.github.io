export type Classification =
  'causal' | 'correlated-not-causal' | 'reverse-causation' | 'coincidence';

export type Phase = 'investigate' | 'answer' | 'reveal' | 'done';

export type InvestigationAction =
  'randomized-trial' | 'control-confounders' | 'more-data';

export interface Scenario {
  id: number;
  title: string;
  correlation: string;
  confounder: string;
  choices: Classification[];
  correct: Classification;
  explanation: string;
}

export interface Hint {
  action: InvestigationAction;
  text: string;
}

export interface ScenarioResult {
  scenarioId: number;
  correct: boolean;
  answer: Classification | null;
  unusedBudget: number;
  hints: Hint[];
}

export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'INVESTIGATE'; action: InvestigationAction }
  | { type: 'SUBMIT_ANSWER'; answer: Classification }
  | { type: 'NEXT_SCENARIO' }
  | { type: 'RESET' };
