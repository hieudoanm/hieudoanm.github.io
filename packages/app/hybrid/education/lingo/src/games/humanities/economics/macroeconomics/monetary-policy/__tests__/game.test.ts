import { SCENARIOS, TRADEOFF_START } from '../constants';
import {
  adjustTradeoff,
  deviationFor,
  makeResult,
  projectOutcome,
  round1,
  taylorRate,
  tradeoffDistance,
  verdictFor,
} from '../game';
import type { TradeoffState } from '../types';

describe('round1', () => {
  it('rounds to one decimal place', () => {
    expect(round1(8.55)).toBe(8.6);
    expect(round1(0.09)).toBe(0.1);
    expect(round1(2)).toBe(2);
  });
});

describe('taylorRate', () => {
  it('computes the Taylor-implied rate for each scenario', () => {
    const expected = [8.5, 0, 2, 7.5, 1, 10.5, 5];
    SCENARIOS.forEach((scenario, index) => {
      expect(taylorRate(scenario)).toBe(expected[index]);
    });
  });
});

describe('deviationFor', () => {
  it('returns the absolute distance between chosen and Taylor rate', () => {
    expect(deviationFor(8.5, 8.5)).toBe(0);
    expect(deviationFor(11, 8.5)).toBe(2.5);
  });
});

describe('projectOutcome', () => {
  it('projects next-period inflation and output with a policy lag', () => {
    const boom = SCENARIOS[0];
    expect(projectOutcome(boom, 8.5)).toEqual({
      inflationNext: 5.8,
      outputGapNext: 2,
    });
    expect(projectOutcome(boom, 11)).toEqual({
      inflationNext: 5.3,
      outputGapNext: 1.3,
    });
  });
});

describe('makeResult', () => {
  it('records the chosen rate, Taylor rate, and deviation', () => {
    const result = makeResult(1, SCENARIOS[1], 2);
    expect(result.round).toBe(1);
    expect(result.taylorRate).toBe(0);
    expect(result.deviation).toBe(2);
    expect(result.chosenRate).toBe(2);
  });
});

describe('adjustTradeoff', () => {
  it('moves the rate and evolves the economy with a lag', () => {
    const next = adjustTradeoff(TRADEOFF_START, -0.5);
    expect(next.rate).toBe(3.5);
    expect(next.inflation).toBe(3.7);
    expect(next.outputGap).toBe(0.1);
    expect(next.stepsUsed).toBe(1);
  });

  it('can steer both targets within reach inside the step budget', () => {
    let state: TradeoffState = TRADEOFF_START;
    for (let i = 0; i < 4; i++) state = adjustTradeoff(state, -0.5);
    expect(state.rate).toBe(2);
    for (let i = 0; i < 12; i++) state = adjustTradeoff(state, 0);
    expect(state.stepsUsed).toBeLessThanOrEqual(16);
    expect(tradeoffDistance(state)).toBeLessThanOrEqual(1);
  });
});

describe('tradeoffDistance', () => {
  it('sums inflation and output-gap misses', () => {
    expect(tradeoffDistance(TRADEOFF_START)).toBe(2.7);
  });
});

describe('verdictFor', () => {
  it('grades policy quality by average deviation', () => {
    expect(verdictFor(2, 8)).toMatch(/Policy Master/);
    expect(verdictFor(6, 8)).toMatch(/Solid Central Banker/);
    expect(verdictFor(10, 8)).toMatch(/Getting the hang of it/);
    expect(verdictFor(20, 8)).toMatch(/Back to the Taylor rule/);
  });
});
