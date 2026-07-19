import { population } from '../../_shared/population';
import {
  formatNum,
  HL_POOL,
  isHigherCorrect,
  pickPair,
  populationOf,
} from '../utils';

describe('higher-or-lower utils', () => {
  it('HL_POOL only contains ranked countries with known populations', () => {
    expect(HL_POOL.length).toBeGreaterThan(0);
    for (const entry of HL_POOL) {
      expect(entry.rank).toBeGreaterThan(0);
      expect(population[entry.name]).toBeDefined();
    }
  });

  it('pickPair deals two distinct countries', () => {
    for (let index = 0; index < 20; index += 1) {
      const { left, right } = pickPair();
      expect(left.name).not.toBe(right.name);
    }
  });

  it('isHigherCorrect accepts ties on either side', () => {
    expect(isHigherCorrect('left', 100, 100)).toBe(true);
    expect(isHigherCorrect('right', 100, 100)).toBe(true);
    expect(isHigherCorrect('left', 200, 100)).toBe(true);
    expect(isHigherCorrect('left', 100, 200)).toBe(false);
    expect(isHigherCorrect('right', 100, 200)).toBe(true);
    expect(isHigherCorrect('right', 200, 100)).toBe(false);
  });

  it('populationOf falls back to zero for unknown countries', () => {
    expect(populationOf('Atlantis')).toBe(0);
    expect(populationOf('Chile')).toBe(population.Chile);
  });

  it.each([
    [1_412_000_000, '1.4B'],
    [3_319_000_00 * 10, '3.3B'],
    [275_500_000, '275.5M'],
    [643_000, '643.0K'],
    [987, '987'],
  ])('formatNum(%d) === %s', (value, expected) => {
    expect(formatNum(value)).toBe(expected);
  });
});
