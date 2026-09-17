export type GoodType =
  'cobb-douglas' | 'perfect-substitutes' | 'perfect-complements';

export type Phase = 'choose' | 'reveal' | 'done';

export interface RoundParams {
  round: number;
  M: number;
  px: number;
  py: number;
  alpha: number;
  goodType: GoodType;
}

export interface OptimalBundle {
  x: number;
  y: number;
}

export interface RoundResult {
  round: number;
  M: number;
  px: number;
  py: number;
  alpha: number;
  goodType: GoodType;
  choiceX: number;
  choiceY: number;
  optX: number;
  optY: number;
  choiceUtility: number;
  optUtility: number;
  score: number;
  budgetSatisfied: boolean;
  mrs: number | null;
}
