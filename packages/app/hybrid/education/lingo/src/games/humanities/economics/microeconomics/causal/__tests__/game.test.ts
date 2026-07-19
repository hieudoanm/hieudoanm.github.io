import {
  POINTS_PER_SCENARIO,
  SCENARIOS,
  STARTING_BUDGET,
  TOTAL_SCENARIOS,
} from '../constants';
import {
  budgetLeft,
  getScenario,
  maxPossibleScore,
  revealHint,
  scoreForScenario,
  totalScenarios,
} from '../game';

describe('totalScenarios', () => {
  it('matches the fixed scenario list', () => {
    expect(totalScenarios()).toBe(TOTAL_SCENARIOS);
    expect(totalScenarios()).toBe(SCENARIOS.length);
  });
});

describe('getScenario', () => {
  it('returns the scenario at a given index', () => {
    expect(getScenario(0).id).toBe(SCENARIOS[0].id);
    expect(getScenario(1).title).toBe(SCENARIOS[1].title);
  });
});

describe('budgetLeft', () => {
  it('never drops below zero', () => {
    expect(budgetLeft(0)).toBe(STARTING_BUDGET);
    expect(budgetLeft(2)).toBe(1);
    expect(budgetLeft(9)).toBe(0);
  });
});

describe('revealHint', () => {
  it('names the investigation used in the hint', () => {
    const scenario = SCENARIOS[0];
    expect(revealHint(scenario, 'randomized-trial')).toContain(
      'randomized trial'
    );
    expect(revealHint(scenario, 'control-confounders')).toContain('confounder');
    expect(revealHint(scenario, 'more-data')).toContain('more data');
  });
});

describe('scoreForScenario', () => {
  it('rewards correctness and unused budget', () => {
    expect(scoreForScenario(true, STARTING_BUDGET)).toBe(POINTS_PER_SCENARIO);
    expect(scoreForScenario(true, 1)).toBe(POINTS_PER_SCENARIO - 2);
    expect(scoreForScenario(false, STARTING_BUDGET)).toBe(0);
  });
});

describe('maxPossibleScore', () => {
  it('scales with the scenario count', () => {
    expect(maxPossibleScore()).toBe(POINTS_PER_SCENARIO * TOTAL_SCENARIOS);
  });
});
