import { BASE_Q, BASE_PRICE, MAX_PRICE, MIN_PRICE } from './constants';
import type { ElasticityClass, Trial } from './types';

export const quantityAt = (
  baseQ: number,
  basePrice: number,
  p: number,
  epsilon: number
): number => {
  if (p <= 0) return 0;
  return Math.round(baseQ * Math.pow(basePrice / p, epsilon));
};

export const revenueAt = (
  basePrice: number,
  baseQ: number,
  p: number,
  epsilon: number
): number => p * quantityAt(baseQ, basePrice, p, epsilon);

export const elasticityClass = (epsilon: number): ElasticityClass => {
  const abs = Math.abs(epsilon);
  if (abs < 1) return 'inelastic';
  if (abs > 1) return 'elastic';
  return 'unit';
};

export const guidanceFor = (epsilon: number): string => {
  const cls = elasticityClass(epsilon);
  switch (cls) {
    case 'inelastic':
      return 'Inelastic here — revenue grows when you raise price.';
    case 'elastic':
      return 'Elastic — lowering price raises revenue.';
    case 'unit':
      return 'Unit elastic — revenue is maximized at any price.';
  }
};

export const isOptimalPrice = (price: number, epsilon: number): boolean => {
  const cls = elasticityClass(epsilon);
  if (cls === 'inelastic') return price === MAX_PRICE;
  if (cls === 'elastic') return price === MIN_PRICE;
  return true;
};

export const makeTrial = (price: number, epsilon: number): Trial => ({
  price,
  quantity: quantityAt(BASE_Q, BASE_PRICE, price, epsilon),
  revenue: revenueAt(BASE_PRICE, BASE_Q, price, epsilon),
  guidance: guidanceFor(epsilon),
  optimal: isOptimalPrice(price, epsilon),
});

export const bestTrialRevenue = (trials: Trial[]): number =>
  trials.reduce(
    (best, trial) => (trial.revenue > best ? trial.revenue : best),
    0
  );

export const bestPriceSoFar = (
  trials: Trial[],
  epsilon: number
): Trial | null => {
  if (trials.length === 0) return null;
  if (elasticityClass(epsilon) === 'unit') return trials[0];
  return trials.reduce(
    (best, trial) => (trial.revenue >= best.revenue ? trial : best),
    trials[0]
  );
};
