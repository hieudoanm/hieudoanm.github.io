export type Move = 'stag' | 'hare';
export type Phase = 'choose' | 'reveal' | 'done';
export type PartnerId = 'fellow-hunter' | 'hare-seeker' | 'mimic' | 'grudger';

export interface RoundResult {
  round: number;
  playerMove: Move;
  partnerMove: Move;
  playerPayoff: number;
  partnerPayoff: number;
}
