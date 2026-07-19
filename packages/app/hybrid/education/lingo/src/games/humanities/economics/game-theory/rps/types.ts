export type Move = 'rock' | 'paper' | 'scissors';
export type Phase = 'choose' | 'reveal' | 'done';
export type Outcome = 'win' | 'lose' | 'draw';
export type BotId = 'cycler' | 'mirror' | 'randomizer' | 'statistician';

export interface BotStrategy {
  id: BotId;
  label: string;
  emoji: string;
  description: string;
}

export interface RoundResult {
  round: number;
  mine: Move;
  theirs: Move;
  outcome: Outcome;
  score: number;
}
