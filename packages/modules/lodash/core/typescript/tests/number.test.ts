import { clamp, inRange, random } from '../src/number.js';

describe('clamp', () => {
  it('should clamp number', () => {
    expect(clamp(-10, -5, 5)).toBe(-5);
    expect(clamp(10, -5, 5)).toBe(5);
    expect(clamp(0, -5, 5)).toBe(0);
  });
});

describe('inRange', () => {
  it('should check if in range', () => {
    expect(inRange(3, 2, 4)).toBe(true);
    expect(inRange(4, 8)).toBe(true);
    expect(inRange(4, 2)).toBe(false);
    expect(inRange(2, 2)).toBe(false);
    expect(inRange(1.2, 2)).toBe(true);
  });
});

describe('random', () => {
  it('should return random number', () => {
    const result = random(0, 5);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(5);
    expect(Number.isInteger(result)).toBe(true);
  });

  it('should handle single arg', () => {
    const result = random(5);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(5);
  });

  it('should handle floating', () => {
    const result = random(1.5, 1.9);
    expect(result).toBeGreaterThanOrEqual(1.5);
    expect(result).toBeLessThanOrEqual(1.9);
  });
});
