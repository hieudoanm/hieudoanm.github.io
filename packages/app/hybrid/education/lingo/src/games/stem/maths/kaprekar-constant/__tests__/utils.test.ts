import {
  IGNORE_NUMBERS_3,
  IGNORE_NUMBERS_4,
  KAPREKAR_CONSTANT_3,
  KAPREKAR_CONSTANT_4,
  kaprekarRoutine,
} from '../utils';

describe('kaprekarRoutine', () => {
  it('returns no steps for the 3-digit constant 495', () => {
    expect(kaprekarRoutine(KAPREKAR_CONSTANT_3)).toEqual([]);
  });

  it('returns no steps for the 4-digit constant 6174', () => {
    expect(kaprekarRoutine(KAPREKAR_CONSTANT_4)).toEqual([]);
  });

  it('returns no steps for repdigits', () => {
    [...IGNORE_NUMBERS_3, ...IGNORE_NUMBERS_4].forEach((number) => {
      expect(kaprekarRoutine(number)).toEqual([]);
    });
  });

  it('computes each step as descending minus ascending', () => {
    const steps = kaprekarRoutine(3524);
    expect(steps[0]).toEqual({
      descending: 5432,
      ascending: 2345,
      result: 3087,
    });
    expect(steps[steps.length - 1].result).toBe(KAPREKAR_CONSTANT_4);
  });

  it('routes 4-digit numbers to 6174 within 7 steps', () => {
    for (const number of [1234, 3524, 8520]) {
      const steps = kaprekarRoutine(number);
      expect(steps.length).toBeLessThanOrEqual(7);
      expect(steps[steps.length - 1].result).toBe(KAPREKAR_CONSTANT_4);
    }
  });

  it('routes 3-digit numbers to 495', () => {
    const steps = kaprekarRoutine(100, [], { count: 0, length: 3 });
    expect(steps[steps.length - 1].result).toBe(KAPREKAR_CONSTANT_3);
  });

  it('stops immediately when the count reaches the safety cap', () => {
    expect(kaprekarRoutine(3524, [], { count: 8, length: 4 })).toEqual([]);
  });
});
