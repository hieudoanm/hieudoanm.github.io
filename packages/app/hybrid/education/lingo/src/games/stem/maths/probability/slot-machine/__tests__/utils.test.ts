import { SYMBOLS } from '../constants';
import { calcWinnings, randomSymbols } from '../utils';

describe('slot machine utils', () => {
  it('pays the full multiplier on three of a kind', () => {
    expect(calcWinnings([0, 0, 0])).toBe(20);
    expect(calcWinnings([5, 5, 5], 10)).toBe(500);
    expect(calcWinnings([3, 3, 3], 25)).toBe(250);
  });

  it('pays half the multiplier of the pair symbol', () => {
    expect(calcWinnings([1, 1, 0])).toBe(15);
    expect(calcWinnings([2, 4, 4], 10)).toBe(75);
    expect(calcWinnings([0, 5, 0], 10)).toBe(10);
  });

  it('pays nothing on three distinct symbols', () => {
    expect(calcWinnings([0, 2, 4])).toBe(0);
    expect(calcWinnings([1, 3, 5])).toBe(0);
  });

  it('generates three valid reel indices', () => {
    for (const index of randomSymbols()) {
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(SYMBOLS.length);
    }
  });
});
