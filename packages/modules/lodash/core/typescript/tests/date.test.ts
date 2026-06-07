import { now } from '../src/date.js';

describe('now', () => {
  it('should return current timestamp', () => {
    const result = now();
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThan(0);
  });
});
