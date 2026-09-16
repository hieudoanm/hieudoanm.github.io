import { INFLATION_TARGET, RSTAR } from './constants';
import type { RoundResult, Scenario, TradeoffState } from './types';

export const round1 = (n: number): number => Math.round(n * 10) / 10;

export const taylorRate = (scenario: Scenario): number =>
  round1(
    scenario.naturalRate +
      scenario.inflation +
      0.5 * (scenario.inflation - INFLATION_TARGET) +
      0.5 * scenario.outputGap
  );

export const deviationFor = (chosenRate: number, taylor: number): number =>
  round1(Math.abs(chosenRate - taylor));

export const projectOutcome = (
  scenario: Scenario,
  chosenRate: number
): { inflationNext: number; outputGapNext: number } => {
  const drift = round1(chosenRate - taylorRate(scenario));
  return {
    inflationNext: round1(
      scenario.inflation + 0.4 * scenario.outputGap - 0.2 * drift
    ),
    outputGapNext: round1(scenario.outputGap - 0.3 * drift),
  };
};

export const makeResult = (
  round: number,
  scenario: Scenario,
  chosenRate: number
): RoundResult => {
  const taylor = taylorRate(scenario);
  const outcome = projectOutcome(scenario, chosenRate);
  return {
    round,
    scenario,
    chosenRate,
    taylorRate: taylor,
    deviation: deviationFor(chosenRate, taylor),
    inflationNext: outcome.inflationNext,
    outputGapNext: outcome.outputGapNext,
  };
};

export const adjustTradeoff = (
  state: TradeoffState,
  delta: number
): TradeoffState => {
  const rate = round1(Math.min(10, Math.max(0, state.rate + delta)));
  const outputGap = round1(
    state.outputGap - 0.5 * (rate - RSTAR) - 0.3 * state.outputGap
  );
  const inflation = round1(
    state.inflation +
      0.4 * state.outputGap -
      0.2 * (state.inflation - INFLATION_TARGET)
  );
  return {
    ...state,
    rate,
    outputGap,
    inflation,
    stepsUsed: state.stepsUsed + 1,
  };
};

export const tradeoffDistance = (state: TradeoffState): number =>
  round1(
    Math.abs(state.inflation - INFLATION_TARGET) + Math.abs(state.outputGap)
  );

export const verdictFor = (score: number, count: number): string => {
  const average = round1(score / count);
  if (average <= 0.5)
    return '🎯 Policy Master — negligible deviation from the Taylor rule.';
  if (average <= 1)
    return '🥋 Solid Central Banker — disciplined rate setting.';
  if (average <= 1.5)
    return '📈 Getting the hang of it — close, but trim the gaps.';
  return '📚 Back to the Taylor rule — restudy the formula and retry.';
};
