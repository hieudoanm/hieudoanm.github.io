export type Move = 'cooperate' | 'defect';
export type Phase = 'choose' | 'reveal' | 'done';

export interface Round {
  round: number;
  player: Move;
  opponent: Move;
  pScore: number;
  oScore: number;
}

export type Strategy =
  | 'titfortat'
  | 'alwaysdefect'
  | 'alwayscooperate'
  | 'grimtrigger'
  | 'random';
