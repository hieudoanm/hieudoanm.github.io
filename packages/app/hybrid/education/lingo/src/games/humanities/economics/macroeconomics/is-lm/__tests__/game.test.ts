import { DEFAULT_B, DEFAULT_D, SCENARIOS } from '../constants';
import {
  equilibrium,
  isCurve,
  lmCurve,
  matches,
  pointsFor,
  shiftFor,
} from '../game';

describe('isCurve', () => {
  it('returns the goods market interest rate at a given output', () => {
    expect(isCurve(6, 0.8, 5)).toBe(2);
  });
});

describe('lmCurve', () => {
  it('returns the money market interest rate at a given output', () => {
    expect(lmCurve(1, 0.4, 5)).toBe(3);
  });
});

describe('equilibrium', () => {
  it('computes the output where IS and LM cross', () => {
    const eq = equilibrium(6, 1, DEFAULT_B, DEFAULT_D);
    expect(eq.y).toBeCloseTo(4.167, 2);
    expect(eq.r).toBeCloseTo(2.667, 2);
  });

  it('yields the same rate on both curves', () => {
    const eq = equilibrium(6, 1, DEFAULT_B, DEFAULT_D);
    expect(isCurve(6, DEFAULT_B, eq.y)).toBeCloseTo(eq.r, 6);
    expect(lmCurve(1, DEFAULT_D, eq.y)).toBeCloseTo(eq.r, 6);
  });
});

describe('shiftFor', () => {
  it('reports the direction of a parameter change', () => {
    expect(shiftFor(5, 7)).toBe('right');
    expect(shiftFor(9, 7)).toBe('left');
    expect(shiftFor(6, 6)).toBe('none');
  });
});

describe('matches', () => {
  it('compares a chosen shift to the expected shift', () => {
    expect(matches('right', 'right')).toBe(true);
    expect(matches('left', 'right')).toBe(false);
  });
});

describe('pointsFor', () => {
  it('scores each correct policy choice', () => {
    expect(pointsFor(true, true)).toBe(2);
    expect(pointsFor(true, false)).toBe(1);
    expect(pointsFor(false, false)).toBe(0);
  });
});

describe('scenarios', () => {
  it('defines achievable targets for every scenario', () => {
    expect(SCENARIOS).toHaveLength(5);
    for (const s of SCENARIOS) {
      expect(s.targetA + s.targetC).not.toBeNaN();
    }
  });
});
