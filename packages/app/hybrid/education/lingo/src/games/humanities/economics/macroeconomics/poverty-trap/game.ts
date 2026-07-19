import { ALPHA, MAX_TRANSFER, TOTAL_FACTOR, YEARS } from './constants';
import type { Scenario, SimResult, Simulation, TrapPhase } from './types';

export const production = (capital: number, factor = TOTAL_FACTOR): number =>
  factor * Math.pow(Math.max(0, capital), ALPHA);

export const escapeThreshold = (subsistence: number): number =>
  Math.pow(subsistence / TOTAL_FACTOR, 1 / ALPHA);

export const discretionaryIncome = (
  income: number,
  subsistence: number
): number => Math.max(0, income - subsistence);

export const netSavings = (
  capital: number,
  savingsRate: number,
  subsistence: number
): number =>
  savingsRate * discretionaryIncome(production(capital), subsistence);

export const nextCapital = (
  capital: number,
  savingsRate: number,
  subsistence: number
): number =>
  Math.max(0, capital + netSavings(capital, savingsRate, subsistence));

export const simulateYear = (
  year: number,
  capital: number,
  savingsRate: number,
  subsistence: number
): Simulation => ({
  year,
  income: production(capital),
  netSavings: netSavings(capital, savingsRate, subsistence),
  capital,
});

export const simulate = (
  initialCapital: number,
  savingsRate: number,
  subsistence: number,
  transfer = 0
): SimResult => {
  const simulations: Simulation[] = [];
  let capital = initialCapital + transfer;
  for (let year = 1; year <= YEARS; year++) {
    simulations.push(simulateYear(year, capital, savingsRate, subsistence));
    capital = nextCapital(capital, savingsRate, subsistence);
  }
  return {
    scenario: buildScenario(initialCapital, savingsRate, subsistence),
    simulations,
    finalCapital: capital,
    trapPhase: classifyTrap(initialCapital, simulations, subsistence),
    transfer,
    escaped: hasEscaped(initialCapital, simulations, subsistence),
  };
};

export const buildScenario = (
  initialCapital: number,
  savingsRate: number,
  subsistence: number
): Scenario => ({
  id: 'custom',
  label: 'Custom',
  initialCapital,
  savingsRate,
  subsistence,
  threshold: escapeThreshold(subsistence),
});

export const classifyTrap = (
  start: number,
  sims: Simulation[],
  subsistence: number
): TrapPhase => {
  const threshold = escapeThreshold(subsistence);
  const end = sims[sims.length - 1].capital;
  if (start >= threshold) return 'escaping';
  if (Math.abs(start - threshold) / threshold < 0.08) return 'at-threshold';
  if (end > start) return 'escaping';
  return 'trapped';
};

export const hasEscaped = (
  start: number,
  sims: Simulation[],
  subsistence: number
): boolean => {
  const threshold = escapeThreshold(subsistence);
  const end = sims[sims.length - 1].capital;
  return end >= threshold && end > start;
};

export const minimumTransferFor = (
  initialCapital: number,
  savingsRate: number,
  subsistence: number
): number => {
  if (initialCapital >= escapeThreshold(subsistence)) return 0;
  let low = 0;
  let high = MAX_TRANSFER;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    const result = simulate(initialCapital, savingsRate, subsistence, mid);
    if (result.escaped) high = mid;
    else low = mid + 1;
  }
  return low;
};
