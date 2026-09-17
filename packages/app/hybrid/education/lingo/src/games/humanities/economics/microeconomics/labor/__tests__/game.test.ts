import { QUIZ_SCENARIOS } from '../constants';
import {
  computeMetrics,
  deficitAt,
  demandAt,
  effectiveWage,
  employmentAt,
  equilibriumEmployment,
  equilibriumWage,
  quizOptions,
  supplyAt,
  surplusAt,
  unemploymentAt,
} from '../game';
import type { LaborCurve } from '../types';

const BASE: LaborCurve = { a: 100, b: 2, c: 10, d: 1 };

describe('demandAt', () => {
  it('computes labor demanded and never goes negative', () => {
    expect(demandAt(30, BASE)).toBe(40);
    expect(demandAt(20, BASE)).toBe(60);
    expect(demandAt(60, BASE)).toBe(0);
  });
});

describe('supplyAt', () => {
  it('computes labor supplied and never goes negative', () => {
    expect(supplyAt(30, BASE)).toBe(40);
    expect(supplyAt(0, BASE)).toBe(10);
    expect(supplyAt(35, BASE)).toBe(45);
  });
});

describe('equilibriumWage', () => {
  it('clears the market where demand meets supply', () => {
    expect(equilibriumWage(BASE)).toBe(30);
    expect(equilibriumWage({ a: 140, b: 4, c: 20, d: 1 })).toBe(24);
  });

  it('handles a degenerate curve without dividing by zero', () => {
    expect(equilibriumWage({ a: 100, b: 0, c: 10, d: 0 })).toBe(0);
  });
});

describe('equilibriumEmployment', () => {
  it('is the quantity demanded at the equilibrium wage', () => {
    expect(equilibriumEmployment(BASE)).toBe(40);
  });
});

describe('effectiveWage', () => {
  it('uses the equilibrium wage when the floor sits below it', () => {
    expect(effectiveWage(20, BASE)).toBe(30);
    expect(effectiveWage(30, BASE)).toBe(30);
    expect(effectiveWage(35, BASE)).toBe(35);
  });
});

describe('employmentAt', () => {
  it('keeps employment at equilibrium when the floor does not bind', () => {
    expect(employmentAt(20, BASE)).toBe(40);
    expect(employmentAt(30, BASE)).toBe(40);
  });

  it('cuts employment to labor demanded when the floor binds', () => {
    expect(employmentAt(35, BASE)).toBe(30);
  });
});

describe('unemploymentAt', () => {
  it('reports the supply-demand gap only above the equilibrium wage', () => {
    expect(unemploymentAt(35, BASE)).toBe(15);
    expect(unemploymentAt(29, BASE)).toBe(0);
    expect(unemploymentAt(30, BASE)).toBe(0);
  });
});

describe('surplusAt and deficitAt', () => {
  it('reports the full equilibrium surplus when the floor is below w*', () => {
    expect(surplusAt(20, BASE)).toBe(1200);
    expect(deficitAt(20, BASE)).toBe(0);
  });

  it('shrinks surplus and creates deadweight loss above w*', () => {
    expect(surplusAt(35, BASE)).toBe(1125);
    expect(deficitAt(35, BASE)).toBe(75);
  });
});

describe('computeMetrics', () => {
  it('bundles the readouts the UI needs', () => {
    const m = computeMetrics(35, BASE);
    expect(m).toEqual({
      wStar: 30,
      qStar: 40,
      demand: 30,
      supply: 45,
      employment: 30,
      unemployment: 15,
      surplus: 1125,
      deficit: 75,
    });
  });
});

describe('quizOptions', () => {
  it('builds four distinct options with a unique correct answer', () => {
    for (const scenario of QUIZ_SCENARIOS) {
      const { options, correctIndex } = quizOptions(scenario);
      expect(options).toHaveLength(4);
      expect(new Set(options).size).toBe(4);
      expect(correctIndex).toBeGreaterThanOrEqual(0);
      expect(correctIndex).toBeLessThan(4);
      const correct = options[correctIndex];
      expect(options.filter((w) => w === correct)).toHaveLength(1);
      expect(correct).toBeGreaterThan(0);
    }
  });

  it('answers unemployment targets with the wage that creates the gap', () => {
    const scenario = QUIZ_SCENARIOS[1];
    const { options, correctIndex } = quizOptions(scenario);
    const wage = options[correctIndex];
    const amount =
      scenario.target.kind === 'unemployment' ? scenario.target.amount : 0;
    expect(unemploymentAt(wage, scenario)).toBe(amount);
    for (const distractor of options.filter((w) => w !== wage)) {
      expect(unemploymentAt(distractor, scenario)).not.toBe(amount);
    }
  });

  it('answers no-effect targets with a floor at or below w*', () => {
    const scenario = QUIZ_SCENARIOS[2];
    const { options, correctIndex } = quizOptions(scenario);
    const wage = options[correctIndex];
    expect(wage).toBeLessThanOrEqual(equilibriumWage(scenario));
    expect(unemploymentAt(wage, scenario)).toBe(0);
    for (const distractor of options.filter((w) => w !== wage)) {
      expect(unemploymentAt(distractor, scenario)).toBeGreaterThan(0);
    }
  });

  it('answers max-employment targets with a floor that keeps L*', () => {
    const scenario = QUIZ_SCENARIOS[0];
    const { options, correctIndex } = quizOptions(scenario);
    const wage = options[correctIndex];
    expect(employmentAt(wage, scenario)).toBe(equilibriumEmployment(scenario));
    for (const distractor of options.filter((w) => w !== wage)) {
      expect(employmentAt(distractor, scenario)).toBeLessThan(
        equilibriumEmployment(scenario)
      );
    }
  });
});
