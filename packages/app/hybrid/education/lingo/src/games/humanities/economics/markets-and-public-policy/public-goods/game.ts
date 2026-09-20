import {
  CONDITIONAL_ROUND_ONE,
  COOPERATOR_COOPERATES,
  COOPERATOR_PUNISHES,
  ENDOWMENT,
  GROUP_SIZE,
  MULTIPLIER,
  PLAYER_AVG_THRESHOLD,
} from './constants';

const average = (values: number[]): number =>
  values.length === 0 ? 0 : values.reduce((a, b) => a + b, 0) / values.length;

export const groupTotal = (allContributions: number[]): number =>
  allContributions.reduce((a, b) => a + b, 0);

export const payoff = (
  contribution: number,
  allContributions: number[]
): number =>
  ENDOWMENT -
  contribution +
  (groupTotal(allContributions) * MULTIPLIER) / GROUP_SIZE;

export const cooperateContribution = (playerHistory: number[]): number =>
  average(playerHistory) < PLAYER_AVG_THRESHOLD && playerHistory.length > 0
    ? COOPERATOR_PUNISHES
    : COOPERATOR_COOPERATES;

export const freeRiderContribution = (): number => 0;

export const conditionalContribution = (
  playerHistory: number[],
  round: number
): number =>
  round === 1 ? CONDITIONAL_ROUND_ONE : Math.round(average(playerHistory));
