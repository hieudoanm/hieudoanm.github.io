export type Phase = 'choose' | 'reveal' | 'done';

export interface RoundResult {
  round: number;
  gap: number;
  mpc: number;
  g: number;
  tau: number;
  closingY: number;
  gapResidual: number;
  score: number;
  cost: number;
}
