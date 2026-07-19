export type Phase = 'explore' | 'quiz' | 'reveal' | 'done';

export type Shift = 'left' | 'none' | 'right';

export interface Scenario {
  id: string;
  title: string;
  prompt: string;
  startA: number;
  startC: number;
  targetA: number;
  targetC: number;
  explanation: string;
}

export interface ScenarioResult {
  round: number;
  scenario: Scenario;
  isShift: Shift;
  lmShift: Shift;
  expectedIs: Shift;
  expectedLm: Shift;
  correct: boolean;
  points: number;
}
