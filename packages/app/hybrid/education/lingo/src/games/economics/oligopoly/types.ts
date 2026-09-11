export type Phase = 'choose' | 'reveal' | 'done';

export interface RoundResult {
  round: number;
  qA: number;
  qB: number;
  price: number;
  profitA: number;
  profitB: number;
}
