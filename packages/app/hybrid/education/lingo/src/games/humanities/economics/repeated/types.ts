export type Action = 'C' | 'D';

export type StrategyId =
  | 'tit-for-tat'
  | 'grim-trigger'
  | 'forgiving-tit-for-tat'
  | 'random'
  | 'always-defect'
  | 'mostly-cooperate';

export type Phase = 'select' | 'play' | 'reveal' | 'done';

export type Rand = () => number;

export interface Opponent {
  id: StrategyId;
  name: string;
  emoji: string;
  description: string;
}

export interface RoundEntry {
  round: number;
  playerAction: Action;
  opponentAction: Action;
  payoff: number;
  cumulative: number;
}
