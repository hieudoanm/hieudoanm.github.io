import {
  DEMAND_INTERCEPT,
  EXTERNAL_DAMAGE,
  MAX_Q,
  MIN_Q,
  PHASE_1_ROUNDS,
  TAX_RATE,
} from './constants';

export const revenue = (q: number): number => (DEMAND_INTERCEPT - q) * q;

export const prodCost = (q: number): number => (q * q) / 2;

export const damage = (q: number): number => EXTERNAL_DAMAGE * q;

export const taxFor = (q: number, rate: number): number => rate * q;

export const profit = (q: number, taxRate: number): number =>
  revenue(q) - prodCost(q) - taxFor(q, taxRate);

export const socialWelfare = (q: number): number =>
  revenue(q) - prodCost(q) - damage(q);

export const privateOptimalQ = (taxRate: number): number => {
  let bestQ = MIN_Q;
  let bestProfit = profit(MIN_Q, taxRate);
  for (let q = MIN_Q + 1; q <= MAX_Q; q++) {
    const candidate = profit(q, taxRate);
    if (candidate > bestProfit) {
      bestProfit = candidate;
      bestQ = q;
    }
  }
  return bestQ;
};

export const socialOptimalQ = (): number => {
  let bestQ = MIN_Q;
  let bestWelfare = socialWelfare(MIN_Q);
  for (let q = MIN_Q + 1; q <= MAX_Q; q++) {
    const candidate = socialWelfare(q);
    if (candidate > bestWelfare) {
      bestWelfare = candidate;
      bestQ = q;
    }
  }
  return bestQ;
};

export const phaseForRound = (round: number): number =>
  round <= PHASE_1_ROUNDS ? 1 : 2;

export const taxRateForPhase = (phase: number): number =>
  phase === 1 ? 0 : TAX_RATE;

export const calloutText = (phase: number): string =>
  phase === 1
    ? "Your private optimum overshoots the social optimum — pollution isn't priced."
    : 'With the tax your private optimum equals the social optimum (Q=5).';

export const roundReport = (
  round: number,
  q: number
): {
  price: number;
  revenue: number;
  prodCost: number;
  damage: number;
  taxPaid: number;
  profit: number;
  socialWelfare: number;
  callout: string;
} => {
  const phase = phaseForRound(round);
  const taxRate = taxRateForPhase(phase);
  return {
    price: revenue(q) / q,
    revenue: revenue(q),
    prodCost: prodCost(q),
    damage: damage(q),
    taxPaid: taxFor(q, taxRate),
    profit: profit(q, taxRate),
    socialWelfare: socialWelfare(q),
    callout: calloutText(phase),
  };
};
