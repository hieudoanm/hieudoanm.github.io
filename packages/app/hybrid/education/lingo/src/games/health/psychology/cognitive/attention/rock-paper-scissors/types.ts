export type Choice = 'rock' | 'paper' | 'scissors';

export type Phase = 'idle' | 'awaiting' | 'feedback' | 'done';

export interface Trial {
  index: number;
  bot: Choice;
  human: Choice;
  reactionMs: number;
  correct: boolean;
  anticipatory: boolean;
  lapse: boolean;
}

export interface Summary {
  trials: number;
  correct: number;
  accuracy: number;
  meanMs: number;
  medianMs: number;
  bestMs: number;
  lapses: number;
  anticipatories: number;
  driftMs: number;
}

export const EMPTY_SUMMARY: Summary = {
  trials: 0,
  correct: 0,
  accuracy: 0,
  meanMs: 0,
  medianMs: 0,
  bestMs: 0,
  lapses: 0,
  anticipatories: 0,
  driftMs: 0,
};
