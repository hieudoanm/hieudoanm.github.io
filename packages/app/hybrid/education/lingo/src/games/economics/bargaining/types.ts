export type Phase = 'choose' | 'reveal' | 'done';

export interface Responder {
  id: string;
  name: string;
  emoji: string;
}

export interface RoundResult {
  round: number;
  keep: number;
  offer: number;
  threshold: number;
  accepted: boolean;
  payoff: number;
}
