import {
  gapSign,
  longRunPrice,
  priceDirection,
  shortRunOutput,
  shortRunPrice,
} from '../game';

describe('shortRunPrice', () => {
  it('solves the positive root of the AD-AS equilibrium', () => {
    expect(shortRunPrice(10000)).toBeCloseTo(100, 6);
    expect(shortRunPrice(8500)).toBeLessThan(100);
    expect(shortRunPrice(11500)).toBeGreaterThan(100);
    expect(shortRunPrice(12000)).toBeCloseTo(103.2456, 3);
  });
});

describe('shortRunOutput', () => {
  it('moves along the short-run AS curve', () => {
    expect(shortRunOutput(10000)).toBeCloseTo(100, 6);
    expect(shortRunOutput(8500)).toBeLessThan(100);
    expect(shortRunOutput(12000)).toBeGreaterThan(100);
  });
});

describe('gapSign', () => {
  it('classifies recessions, booms and parity', () => {
    expect(gapSign(8500)).toBe('negative');
    expect(gapSign(11500)).toBe('positive');
    expect(gapSign(10000)).toBe('zero');
  });
});

describe('priceDirection', () => {
  it('compares the current price level against the previous round', () => {
    expect(priceDirection(11500, 8500)).toBe('rises');
    expect(priceDirection(8500, 11500)).toBe('falls');
    expect(priceDirection(10000, 10000)).toBe('same');
  });
});

describe('longRunPrice', () => {
  it('resolves output back at potential with adjusted prices', () => {
    expect(longRunPrice(10000)).toBe(100);
    expect(longRunPrice(8500)).toBe(85);
    expect(longRunPrice(12000)).toBe(120);
  });
});
