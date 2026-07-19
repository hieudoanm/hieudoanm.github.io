export type Mode = 'perfect' | 'monopolistic' | 'monopoly';

export type Phase = 'lab' | 'quiz' | 'done';

export interface ModeMeta {
  id: Mode;
  label: string;
  emoji: string;
  description: string;
  fixedCost: number;
  erodes: boolean;
}

export interface LabParams {
  quantity: number;
  differentiation: number;
  entryProgress: number;
  mode: Mode;
}

export interface LabDerived {
  price: number;
  totalRevenue: number;
  totalCost: number;
  profit: number;
  marginalRevenue: number;
  marginalCost: number;
  bestQuantity: number;
  dwl: number;
}

export interface QuizScenario {
  a: number;
  b: number;
  options: number[];
}

export interface QuizResult {
  round: number;
  chosen: number;
  correct: number;
  correctChoice: boolean;
  profitAtChoice: number;
  profitAtCorrect: number;
}
