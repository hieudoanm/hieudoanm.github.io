export type CompoundingFrequency = 1 | 2 | 12 | 'continuous';

export type Phase = 'calculator' | 'compare' | 'annuity' | 'npv' | 'results';

export interface Offer {
  principal: number;
  rate: number;
  years: number;
  compounding: CompoundingFrequency;
  label: string;
}

export interface CompareRound {
  round: number;
  offers: [Offer, Offer];
  correct: string;
  answer: string | null;
  correctChoice: boolean;
  result: number;
}

export interface AnnuityRound {
  round: number;
  payment: number;
  years: number;
  rate: number;
  annuityPV: number;
  lumpSum: number;
  answer: string | null;
  correctChoice: boolean;
}

export interface NpvRound {
  cashFlows: number[];
  rate: number;
  npv: number;
  answer: string | null;
  correctChoice: boolean;
}

export interface CalculatorResult {
  fv: number;
  pv: number;
  doublingTime: number;
  rule72: number;
  curvePoints: { year: number; value: number }[];
}
