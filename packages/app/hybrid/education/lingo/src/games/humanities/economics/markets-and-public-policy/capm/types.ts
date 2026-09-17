export type RoundType = 'portfolio' | 'beta';

export type Phase = 'choose' | 'reveal' | 'done';

export interface PortfolioStats {
  eR: number;
  sigma: number;
  sharpe: number;
}

export interface RoundResult {
  round: number;
  type: RoundType;
  w?: number;
  stats?: PortfolioStats;
  onTarget?: boolean;
  target?: number;
  beta?: number;
  input?: number;
  model?: number;
  score: number;
}

export interface GameState {
  phase: Phase;
  round: number;
  result: RoundResult | null;
  results: RoundResult[];
  totalScore: number;
}
