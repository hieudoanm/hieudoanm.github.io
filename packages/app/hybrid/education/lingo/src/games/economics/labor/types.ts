export type Phase = 'explore' | 'quiz' | 'reveal' | 'done';

export type CurveKey = 'a' | 'b' | 'c' | 'd';

export type QuizTarget =
  | { kind: 'max-employment' }
  | { kind: 'no-effect' }
  | { kind: 'unemployment'; amount: number };

export interface LaborCurve {
  a: number;
  b: number;
  c: number;
  d: number;
}

export interface QuizScenario extends LaborCurve {
  id: string;
  title: string;
  prompt: string;
  target: QuizTarget;
}

export interface QuizRoundResult {
  round: number;
  scenarioId: string;
  correct: boolean;
  selected: number;
  correctWage: number;
  employment: number;
  unemployment: number;
  deficit: number;
}

export interface LaborMetrics {
  wStar: number;
  qStar: number;
  demand: number;
  supply: number;
  employment: number;
  unemployment: number;
  surplus: number;
  deficit: number;
}
