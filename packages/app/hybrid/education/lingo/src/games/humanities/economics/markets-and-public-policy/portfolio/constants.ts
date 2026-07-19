import type { Asset, ChallengeConfig, PortfolioWeights } from './types';

export const ASSETS: Asset[] = [
  { id: 'tech', name: 'Tech', mu: 0.1, sigma: 0.25 },
  { id: 'property', name: 'Real Estate', mu: 0.05, sigma: 0.1 },
  { id: 'bonds', name: 'Bonds', mu: 0.03, sigma: 0.05 },
];

export const CORRELATIONS: readonly (readonly number[])[] = [
  [1, 0.3, 0.1],
  [0.3, 1, 0.2],
  [0.1, 0.2, 1],
];

export const WEIGHT_STEP = 0.05;
export const SCORE_TOLERANCE = 0.02;
export const SCAN_STEP = 0.01;
export const FLOOR_SIGMA = 0.2;
export const MAX_N = 20;
export const TOTAL_ROUNDS = 5;
export const SLIDER_MAX = 100;

export const CHALLENGES: ChallengeConfig[] = [
  {
    round: 1,
    mu1: 0.1,
    sigma1: 0.25,
    mu2: 0.03,
    sigma2: 0.05,
    rho: 0.1,
    targetReturn: null,
    mode: 'min-variance',
  },
  {
    round: 2,
    mu1: 0.05,
    sigma1: 0.1,
    mu2: 0.03,
    sigma2: 0.05,
    rho: 0.2,
    targetReturn: null,
    mode: 'min-variance',
  },
  {
    round: 3,
    mu1: 0.1,
    sigma1: 0.25,
    mu2: 0.03,
    sigma2: 0.05,
    rho: 0.1,
    targetReturn: 0.06,
    mode: 'target-return',
  },
  {
    round: 4,
    mu1: 0.1,
    sigma1: 0.25,
    mu2: 0.05,
    sigma2: 0.1,
    rho: 0.3,
    targetReturn: 0.07,
    mode: 'target-return',
  },
  {
    round: 5,
    mu1: 0.1,
    sigma1: 0.25,
    mu2: 0.05,
    sigma2: 0.1,
    rho: 0.3,
    targetReturn: null,
    mode: 'min-variance',
  },
];

export interface Preset {
  id: string;
  label: string;
  weights: PortfolioWeights | null;
}

export const PRESETS: Preset[] = [
  {
    id: 'all-tech',
    label: 'All Tech',
    weights: { tech: 1, property: 0, bonds: 0 },
  },
  {
    id: 'tech-bonds',
    label: '50-50 Tech+Bonds',
    weights: { tech: 0.5, property: 0, bonds: 0.5 },
  },
  {
    id: 'equal',
    label: 'Equal Thirds',
    weights: { tech: 1 / 3, property: 1 / 3, bonds: 1 / 3 },
  },
  { id: 'min-variance', label: 'Minimum Variance', weights: null },
];

export const TOTAL_PRESETS = PRESETS.length;
