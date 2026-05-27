import { oklch2hex } from '../src/oklch';

describe('oklch2hex', () => {
  it('returns a string starting with #', () => {
    const result = oklch2hex(0, 0, 0);
    expect(typeof result).toBe('string');
    expect(result.startsWith('#')).toBe(true);
  });

  it('returns a string of at least 4 characters', () => {
    const result = oklch2hex(0.5, 0.1, 180);
    expect(result.length).toBeGreaterThanOrEqual(4);
  });
});
