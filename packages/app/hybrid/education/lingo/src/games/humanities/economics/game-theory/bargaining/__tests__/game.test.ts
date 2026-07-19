import { formatCurrency, offerFor, randomThreshold, resolve } from '../game';
import { MAX_THRESHOLD, MIN_THRESHOLD, POOL } from '../constants';

describe('randomThreshold', () => {
  it('returns a value within [MIN_THRESHOLD, MAX_THRESHOLD]', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    expect(randomThreshold()).toBe(MIN_THRESHOLD);
    jest.spyOn(Math, 'random').mockReturnValue(0.999);
    expect(randomThreshold()).toBe(MAX_THRESHOLD);
    jest.restoreAllMocks();
  });
});

describe('offerFor', () => {
  it('returns POOL minus keep', () => {
    expect(offerFor(0)).toBe(POOL);
    expect(offerFor(50)).toBe(50);
    expect(offerFor(POOL)).toBe(0);
  });
});

describe('resolve', () => {
  it('accepts when offer meets threshold', () => {
    const result = resolve(60, 40);
    expect(result.accepted).toBe(true);
    expect(result.payoff).toBe(60);
  });

  it('rejects when offer is below threshold', () => {
    const result = resolve(70, 40);
    expect(result.accepted).toBe(false);
    expect(result.payoff).toBe(0);
  });

  it('accepts at the exact threshold', () => {
    const result = resolve(55, 45);
    expect(result.accepted).toBe(true);
    expect(result.payoff).toBe(55);
  });

  it('rejects when offer is one below threshold', () => {
    const result = resolve(56, 45);
    expect(result.accepted).toBe(false);
    expect(result.payoff).toBe(0);
  });
});

describe('formatCurrency', () => {
  it('formats numbers as dollar amounts', () => {
    expect(formatCurrency(0)).toBe('$0');
    expect(formatCurrency(100)).toBe('$100');
    expect(formatCurrency(1000)).toBe('$1,000');
  });
});
