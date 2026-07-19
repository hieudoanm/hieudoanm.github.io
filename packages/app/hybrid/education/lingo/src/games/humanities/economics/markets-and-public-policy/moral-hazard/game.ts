import { CONTRACTS, LOSS_AMOUNT, STARTING_WEALTH } from './constants';
import type { Contract, Effort, RoundResult } from './types';

const EFFORT_COST: Record<Effort, number> = { low: 0, high: 2 };

const LOSS_PROB: Record<Effort, number> = { low: 0.3, high: 0.1 };

export const isLossDraw = (prob: number, rand: () => number): boolean =>
  rand() < prob;

export const insuranceCoverage = (
  contract: Contract,
  amount: number = LOSS_AMOUNT
): number => {
  switch (contract) {
    case 'full':
      return amount;
    case 'partial':
      return Math.max(0, amount - CONTRACTS.partial.deductible);
    case 'none':
      return 0;
  }
};

export const roundPayoff = (
  contract: Contract,
  effort: Effort,
  loss: boolean,
  amount: number = LOSS_AMOUNT
): number => {
  const premium = CONTRACTS[contract].premium;
  const effortCost = EFFORT_COST[effort];
  if (!loss) return STARTING_WEALTH - premium - effortCost;
  const coverage = insuranceCoverage(contract, amount);
  return STARTING_WEALTH - premium - effortCost - (amount - coverage);
};

export const expectedPayoff = (contract: Contract, effort: Effort): number => {
  const prob = LOSS_PROB[effort];
  const premium = CONTRACTS[contract].premium;
  const effortCost = EFFORT_COST[effort];
  const coverage = insuranceCoverage(contract);
  const expectedLoss = prob * (LOSS_AMOUNT - coverage);
  return STARTING_WEALTH - premium - effortCost - expectedLoss;
};

export const moralHazardCount = (history: RoundResult[]): number =>
  history.filter((r) => r.contract === 'full' && r.effort === 'low').length;

export const buildRoundResult = (
  round: number,
  contract: Contract,
  effort: Effort,
  loss: boolean
): RoundResult => {
  const premium = CONTRACTS[contract].premium;
  const effortCost = EFFORT_COST[effort];
  if (!loss) {
    return {
      round,
      contract,
      effort,
      loss: false,
      netWealth: STARTING_WEALTH - premium - effortCost,
      outOfPocket: 0,
      insurerPays: 0,
    };
  }
  const coverage = insuranceCoverage(contract);
  const outOfPocket = LOSS_AMOUNT - coverage;
  return {
    round,
    contract,
    effort,
    loss: true,
    netWealth: STARTING_WEALTH - premium - effortCost - outOfPocket,
    outOfPocket,
    insurerPays: coverage,
  };
};
