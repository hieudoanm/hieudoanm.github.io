export type BubbleAction = 'buy' | 'sell' | 'hold';

export type Phase = 'play' | 'outcome' | 'episode' | 'done';

export interface GameState {
  phase: Phase;
  episode: number;
  round: number;
  fundamental: number;
  cash: number;
  units: number;
  avgCost: number;
  realized: number;
  lastAction: BubbleAction | null;
  episodeScores: number[];
}

export type GameAction =
  | { type: 'SUBMIT_ACTION'; action: BubbleAction }
  | { type: 'NEXT_ROUND' }
  | { type: 'NEXT_EPISODE' }
  | { type: 'RESET' };
