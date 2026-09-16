import type { InvestigationAction, Scenario } from './types';
import { SCENARIOS, STARTING_BUDGET, POINTS_PER_SCENARIO } from './constants';

export const getScenario = (index: number): Scenario => SCENARIOS[index];

export const totalScenarios = (): number => SCENARIOS.length;

export const budgetLeft = (spent: number): number =>
  Math.max(0, STARTING_BUDGET - spent);

export const revealHint = (
  scenario: Scenario,
  action: InvestigationAction
): string => {
  switch (action) {
    case 'randomized-trial':
      return `A randomized trial would randomly assign the treatment, removing confounders. In this case: ${scenario.confounder}`;
    case 'control-confounders':
      return `Controlling for confounders: ${scenario.confounder}`;
    case 'more-data':
      return `With more data, the pattern persists but the confounder remains: ${scenario.confounder}`;
    default: {
      const _exhaustive: never = action;
      return '';
    }
  }
};

export const scoreForScenario = (
  correct: boolean,
  unusedBudget: number
): number => {
  if (!correct) return 0;
  return POINTS_PER_SCENARIO - (STARTING_BUDGET - unusedBudget);
};

export const maxPossibleScore = (): number =>
  POINTS_PER_SCENARIO * SCENARIOS.length;
