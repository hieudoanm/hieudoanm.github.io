import { COST_HIGH, COST_LOW, COUNT, HIGH, LOW } from '../constants';
import type { CandidateType } from '../types';
import {
  acceptsWage,
  applicantPayoff,
  choosesEducation,
  firmProfit,
  premiumFor,
  resolveCandidates,
  scheduleCandidates,
  separatesPremium,
  totalProfit,
} from '../game';

const rand = (value: number): number[] =>
  Array.from({ length: COUNT }, () => value);

describe('scheduleCandidates', () => {
  it('returns n candidates with an even high/low mix', () => {
    const candidates = scheduleCandidates(rand(0), COUNT);
    expect(candidates).toHaveLength(COUNT);
    expect(candidates.filter((t) => t === 'high')).toHaveLength(COUNT / 2);
    expect(candidates.filter((t) => t === 'low')).toHaveLength(COUNT / 2);
  });

  it('is deterministic for a fixed random array', () => {
    const input = [0.6, 0.2, 0.9, 0.1, 0.7, 0.4, 0.8, 0.5];
    expect(scheduleCandidates(input, COUNT)).toEqual(
      scheduleCandidates(input, COUNT)
    );
  });

  it('stacks all highs first when every draw picks the front', () => {
    expect(scheduleCandidates(rand(0), COUNT)).toEqual([
      'high',
      'high',
      'high',
      'high',
      'low',
      'low',
      'low',
      'low',
    ]);
  });
});

describe('choosesEducation', () => {
  it('separates when the premium exceeds the high cost only', () => {
    expect(choosesEducation('high', COST_HIGH, COST_LOW, 50, 75)).toBe(true);
    expect(choosesEducation('low', COST_HIGH, COST_LOW, 50, 75)).toBe(false);
  });

  it('pools when the premium reaches the low cost', () => {
    expect(choosesEducation('low', COST_HIGH, COST_LOW, 50, 85)).toBe(true);
  });

  it('gets no education when the premium is below the high cost', () => {
    expect(choosesEducation('high', COST_HIGH, COST_LOW, 50, 54)).toBe(false);
  });

  it('takes education at the exact cost boundary', () => {
    expect(choosesEducation('high', COST_HIGH, COST_LOW, 50, 55)).toBe(true);
    expect(choosesEducation('low', COST_HIGH, COST_LOW, 50, 80)).toBe(true);
  });
});

describe('acceptsWage', () => {
  it('accepts a high candidate at 75% of their productivity', () => {
    expect(acceptsWage('high', 75)).toBe(true);
    expect(acceptsWage('high', 74)).toBe(false);
  });

  it('accepts a low candidate at 75% of their productivity', () => {
    expect(acceptsWage('low', 45)).toBe(true);
    expect(acceptsWage('low', 44)).toBe(false);
  });
});

describe('applicantPayoff', () => {
  it('returns the net payoff of the best signal choice', () => {
    expect(applicantPayoff('high', 50, 75, 5)).toBe(70);
    expect(applicantPayoff('low', 50, 75, 30)).toBe(50);
    expect(applicantPayoff('high', 40, 80, 30)).toBe(50);
  });
});

describe('firmProfit', () => {
  it('earns productivity minus wage only when accepted', () => {
    expect(firmProfit('high', 80, true)).toBe(HIGH - 80);
    expect(firmProfit('high', 80, false)).toBe(0);
    expect(firmProfit('low', 50, true)).toBe(LOW - 50);
  });
});

describe('premiumFor and separatesPremium', () => {
  it('computes the signal premium', () => {
    expect(premiumFor(50, 75)).toBe(25);
  });

  it('separates for a premium in [COST_HIGH, COST_LOW)', () => {
    expect(separatesPremium(5)).toBe(true);
    expect(separatesPremium(29)).toBe(true);
    expect(separatesPremium(4)).toBe(false);
    expect(separatesPremium(30)).toBe(false);
  });
});

describe('resolveCandidates', () => {
  const types = ['high', 'low'] as const;

  it('computes education, wage, acceptance and profit per candidate', () => {
    const candidates = resolveCandidates([...types], { w0: 50, w1: 75 });
    expect(candidates).toHaveLength(2);
    expect(candidates[0]).toEqual({
      id: 0,
      type: 'high',
      education: 1,
      wage: 75,
      accepted: true,
      profit: 25,
    });
    expect(candidates[1]).toEqual({
      id: 1,
      type: 'low',
      education: 0,
      wage: 50,
      accepted: true,
      profit: 10,
    });
  });
});

describe('totalProfit', () => {
  const types: CandidateType[] = [
    'high',
    'high',
    'high',
    'high',
    'low',
    'low',
    'low',
    'low',
  ];

  it('sums profit across a separating premium', () => {
    expect(totalProfit(types, { w0: 50, w1: 75 })).toBe(140);
  });

  it('erodes profit when the premium pools everyone', () => {
    expect(totalProfit(types, { w0: 50, w1: 85 })).toBe(-40);
  });
});
