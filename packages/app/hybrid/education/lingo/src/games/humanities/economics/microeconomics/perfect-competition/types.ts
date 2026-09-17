export type Phase = 'choose' | 'reveal' | 'done';

export interface RoundResult {
  round: number;
  price: number;
  chosenQ: number;
  optimalQ: number;
  profit: number;
  operating: boolean;
  longRun: string;
}
