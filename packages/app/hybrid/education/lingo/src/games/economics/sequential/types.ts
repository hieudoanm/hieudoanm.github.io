export type Phase = 'choose' | 'reveal' | 'done';

export type PlayerAction = 'enter' | 'out';

export interface RoundResult {
  round: number;
  playerAction: PlayerAction;
  incumbentAction: 'accommodate' | 'fight' | null;
  playerPayoff: number;
  incumbentPayoff: number;
  spneMatch: boolean;
}
