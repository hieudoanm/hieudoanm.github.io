export const spendingMultiplier = (mpc: number): number => 1 / (1 - mpc);

export const taxCutMultiplier = (mpc: number): number => mpc / (1 - mpc);

export const closingY = (g: number, tau: number, mpc: number): number =>
  spendingMultiplier(mpc) * g + taxCutMultiplier(mpc) * tau;

export const residual = (
  g: number,
  tau: number,
  mpc: number,
  gap: number
): number => closingY(g, tau, mpc) - gap;

export const fiscalCost = (g: number, tau: number): number => g + tau;

export type FiscalVerdict = 'closed' | 'overshoot' | 'under';

export const fiscalVerdict = (gapResidual: number): FiscalVerdict => {
  if (Math.abs(gapResidual) <= 1) return 'closed';
  return gapResidual > 0 ? 'overshoot' : 'under';
};

const EPSILON = 1e-9;

export const scoreRound = (
  g: number,
  tau: number,
  mpc: number,
  gap: number
): number => {
  const magnitude = Math.abs(residual(g, tau, mpc, gap));
  if (magnitude <= 5 + EPSILON) return 5;
  if (magnitude <= 20 + EPSILON) return 3;
  return Math.max(0, 5 - magnitude / 50);
};
