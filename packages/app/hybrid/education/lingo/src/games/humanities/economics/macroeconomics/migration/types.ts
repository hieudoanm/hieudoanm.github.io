export type QuizAnswer = 'move' | 'stay';

export type Phase = 'input' | 'result' | 'quiz' | 'done';

export type QuizParams = {
  w0: number;
  w1: number;
  m: number;
  p: number;
};

export interface DecisionResult {
  npv: number;
  shouldMove: boolean;
  expectedIncomeMove: number;
  expectedIncomeStay: number;
}

export interface MacroSnapshot {
  nativeWage: number;
  equilibriumWage: number;
  migrantCount: number;
  immigrantSurplus: number;
  gdpGain: number;
}

export interface QuizRound {
  round: number;
  w0: number;
  w1: number;
  m: number;
  p: number;
  correct: boolean;
  npv: number;
  answer: QuizAnswer;
}
