export type AssetId = 'tech' | 'property' | 'bonds';

export type ChallengeMode = 'min-variance' | 'target-return';

export type Phase = 'choose' | 'reveal' | 'done';

export interface Asset {
  id: AssetId;
  name: string;
  mu: number;
  sigma: number;
}

export interface PortfolioWeights {
  tech: number;
  property: number;
  bonds: number;
}

export interface FrontierPoint {
  er: number;
  sigma: number;
}

export interface ChallengeConfig {
  round: number;
  mu1: number;
  sigma1: number;
  mu2: number;
  sigma2: number;
  rho: number;
  targetReturn: number | null;
  mode: ChallengeMode;
}

export interface ChallengeResult {
  round: number;
  mode: ChallengeMode;
  target: number | null;
  playerW: number;
  idealW: number;
  sigma: number;
  score: number;
}

export interface LiveStats {
  er: number;
  sigma: number;
  benefit: number;
}
