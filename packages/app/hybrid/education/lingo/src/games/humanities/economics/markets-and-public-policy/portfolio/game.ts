import {
  ASSETS,
  CORRELATIONS,
  FLOOR_SIGMA,
  SCAN_STEP,
  SCORE_TOLERANCE,
} from './constants';
import type {
  Asset,
  ChallengeConfig,
  FrontierPoint,
  LiveStats,
  PortfolioWeights,
} from './types';

const clamp01 = (x: number): number => Math.min(1, Math.max(0, x));

export const normalize = (w: PortfolioWeights): PortfolioWeights => {
  const total = w.tech + w.property + w.bonds;
  if (total <= 0) return { tech: 1 / 3, property: 1 / 3, bonds: 1 / 3 };
  return {
    tech: w.tech / total,
    property: w.property / total,
    bonds: w.bonds / total,
  };
};

const toArray = (w: PortfolioWeights): number[] => [
  w.tech,
  w.property,
  w.bonds,
];

export const portfolioER = (
  w: PortfolioWeights,
  assets: Asset[] = ASSETS
): number => {
  const nw = normalize(w);
  return (
    nw.tech * assets[0].mu +
    nw.property * assets[1].mu +
    nw.bonds * assets[2].mu
  );
};

export const portfolioSigma = (
  w: PortfolioWeights,
  assets: Asset[] = ASSETS
): number => {
  const nw = toArray(normalize(w));
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      sum +=
        nw[i] * nw[j] * assets[i].sigma * assets[j].sigma * CORRELATIONS[i][j];
    }
  }
  return Math.sqrt(Math.max(0, sum));
};

export const weightedSigma = (
  w: PortfolioWeights,
  assets: Asset[] = ASSETS
): number => {
  const nw = normalize(w);
  return (
    nw.tech * assets[0].sigma +
    nw.property * assets[1].sigma +
    nw.bonds * assets[2].sigma
  );
};

export const diversificationBenefit = (
  w: PortfolioWeights,
  assets: Asset[] = ASSETS
): number => weightedSigma(w, assets) - portfolioSigma(w, assets);

export const liveStats = (
  w: PortfolioWeights,
  assets: Asset[] = ASSETS
): LiveStats => ({
  er: portfolioER(w, assets),
  sigma: portfolioSigma(w, assets),
  benefit: diversificationBenefit(w, assets),
});

export const minVarianceWeights = (
  assets: Asset[] = ASSETS
): PortfolioWeights => {
  let best: PortfolioWeights = { tech: 1, property: 0, bonds: 0 };
  let bestSigma = Infinity;
  for (let t = 0; t <= 100; t++) {
    for (let p = 0; p + t <= 100; p++) {
      const tech = t * SCAN_STEP;
      const property = p * SCAN_STEP;
      const bonds = Math.round((1 - tech - property) * 100) / 100;
      if (bonds < -1e-9) continue;
      const weights: PortfolioWeights = { tech, property, bonds };
      const sigma = portfolioSigma(weights, assets);
      if (sigma < bestSigma) {
        bestSigma = sigma;
        best = weights;
      }
    }
  }
  return best;
};

export const frontierPoints = (assets: Asset[] = ASSETS): FrontierPoint[] => {
  const points: FrontierPoint[] = [];
  for (let i = 0; i <= 50; i++) {
    const wTech = i * 0.02;
    const weights: PortfolioWeights = {
      tech: wTech,
      property: 0,
      bonds: 1 - wTech,
    };
    points.push({
      er: portfolioER(weights, assets),
      sigma: portfolioSigma(weights, assets),
    });
  }
  return points;
};

export const challengeIdealWeight = (c: ChallengeConfig): number => {
  if (c.mode === 'target-return') {
    const denom = c.mu1 - c.mu2;
    if (Math.abs(denom) < 1e-9) return 0;
    return clamp01((c.targetReturn! - c.mu2) / denom);
  }
  const denom = c.sigma1 ** 2 + c.sigma2 ** 2 - 2 * c.rho * c.sigma1 * c.sigma2;
  if (Math.abs(denom) < 1e-9) return 0;
  return clamp01((c.sigma2 ** 2 - c.rho * c.sigma1 * c.sigma2) / denom);
};

export const challengeSigma = (c: ChallengeConfig, w: number): number =>
  Math.sqrt(
    w * w * c.sigma1 * c.sigma1 +
      (1 - w) * (1 - w) * c.sigma2 * c.sigma2 +
      2 * w * (1 - w) * c.rho * c.sigma1 * c.sigma2
  );

export const scoreChallenge = (w: number, c: ChallengeConfig): number =>
  Math.abs(w - challengeIdealWeight(c)) <= SCORE_TOLERANCE
    ? 5
    : Math.max(0, 5 - Math.abs(w - challengeIdealWeight(c)) * 100);

export const sigmaFree = (n: number, sigma: number = FLOOR_SIGMA): number =>
  n < 1 ? sigma : sigma / Math.sqrt(n);

export const sigmaSystematic = (
  n: number,
  rho: number,
  sigma: number = FLOOR_SIGMA
): number =>
  n < 1
    ? sigma
    : Math.sqrt(rho * sigma * sigma + ((1 - rho) * sigma * sigma) / n);
