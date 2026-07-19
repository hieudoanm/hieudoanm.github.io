import { applyShortRun, computeLongRun, scoreRound } from '../game';
import { BETA, NATURAL_RATE } from '../constants';
import type { Scenario } from '../types';

const scenario: Scenario = { startInflation: 3, startUnemployment: 5 };

describe('applyShortRun', () => {
  it('expansion lowers unemployment and raises inflation at 0% anchor', () => {
    const result = applyShortRun(scenario, 'expansion', 0, 3);
    expect(result.newUnemployment).toBe(3.5);
    expect(result.newInflation).toBeGreaterThan(3);
  });

  it('contraction raises unemployment and lowers inflation at 0% anchor', () => {
    const result = applyShortRun(scenario, 'contraction', 0, 3);
    expect(result.newUnemployment).toBe(6.5);
    expect(result.newInflation).toBeLessThan(3);
  });

  it('hold keeps unemployment unchanged at 0% anchor', () => {
    const result = applyShortRun(scenario, 'hold', 0, 3);
    expect(result.newUnemployment).toBe(5);
  });

  it('higher anchoring flattens the short-run effect', () => {
    const loose = applyShortRun(scenario, 'expansion', 0, 3);
    const tight = applyShortRun(scenario, 'expansion', 100, 3);
    expect(
      Math.abs(tight.newUnemployment - scenario.startUnemployment)
    ).toBeLessThan(
      Math.abs(loose.newUnemployment - scenario.startUnemployment)
    );
  });
});

describe('computeLongRun', () => {
  it('returns the natural rate as long-run unemployment', () => {
    const result = computeLongRun(5, 4);
    expect(result.lrUnemployment).toBe(NATURAL_RATE);
  });

  it('adds beta times the gap to inflation in the long run', () => {
    const newUnemployment = 4;
    const gap = newUnemployment - NATURAL_RATE;
    const expectedLr = 5 + BETA * gap;
    const result = computeLongRun(5, newUnemployment);
    expect(result.lrInflation).toBeCloseTo(expectedLr, 2);
  });
});

describe('scoreRound', () => {
  it('awards maximum score for following the recommended path', () => {
    const score = scoreRound(scenario, 'contraction', 50, 3);
    expect(score).toBeCloseTo(10, 1);
  });

  it('penalises deviation from the recommended action', () => {
    const score = scoreRound(scenario, 'expansion', 50, 3);
    expect(score).toBeLessThan(10);
  });
});
