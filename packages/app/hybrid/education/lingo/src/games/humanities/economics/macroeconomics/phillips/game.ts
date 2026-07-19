import { BETA, NATURAL_RATE } from './constants';
import type { Policy, Scenario } from './types';

export const applyShortRun = (
  scenario: Scenario,
  policy: Policy,
  anchor: number,
  expectationsInflation: number
): { newInflation: number; newUnemployment: number } => {
  const { startInflation, startUnemployment } = scenario;
  const anchorFraction = anchor / 100;
  let du = 0;
  if (policy === 'expansion') du = -1.5;
  else if (policy === 'contraction') du = 1.5;
  const scaledDu = du * (1 - anchorFraction);
  const newUnemployment = startUnemployment + scaledDu;
  const baseInflation =
    expectationsInflation - BETA * (startUnemployment - NATURAL_RATE);
  const newInflation =
    startInflation +
    (baseInflation - startInflation) * anchorFraction +
    (policy === 'expansion'
      ? 1.5 * (1 - anchorFraction)
      : policy === 'contraction'
        ? -1.5 * (1 - anchorFraction)
        : 0);
  return {
    newInflation: Math.round(newInflation * 100) / 100,
    newUnemployment: Math.round(newUnemployment * 100) / 100,
  };
};

export const computeLongRun = (
  newInflation: number,
  newUnemployment: number
): { lrInflation: number; lrUnemployment: number } => {
  const gap = newUnemployment - NATURAL_RATE;
  const lrInflation = newInflation + BETA * gap;
  return {
    lrInflation: Math.round(lrInflation * 100) / 100,
    lrUnemployment: NATURAL_RATE,
  };
};

export const scoreRound = (
  scenario: Scenario,
  policy: Policy,
  anchor: number,
  expectationsInflation: number
): number => {
  const { startInflation } = scenario;
  const rec = applyShortRun(scenario, 'contraction', anchor, startInflation);
  const player = applyShortRun(scenario, policy, anchor, startInflation);
  const uDiff = Math.abs(player.newUnemployment - rec.newUnemployment);
  return Math.max(0, 10 - uDiff * 2);
};
