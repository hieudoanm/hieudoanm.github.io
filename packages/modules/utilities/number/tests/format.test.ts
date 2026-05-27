import { addZero, range, formatCurrency } from '../src/format';

describe('addZero', () => {
  it('pads single digit to default length 2', () => {
    expect(addZero(5)).toBe('05');
  });

  it('does not pad if same length', () => {
    expect(addZero(42)).toBe('42');
  });

  it('does not pad if longer than length', () => {
    expect(addZero(123)).toBe('123');
  });

  it('pads to custom length', () => {
    expect(addZero(7, 4)).toBe('0007');
  });
});

describe('range', () => {
  it('generates range from start to stop', () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('returns empty if stop <= start', () => {
    expect(range(5, 1)).toEqual([]);
  });

  it('uses custom step', () => {
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8, 10]);
  });

  it('returns ascending range with positive step', () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('formatCurrency', () => {
  it('formats USD by default', () => {
    const result = formatCurrency(1000);
    expect(result).toContain('.');
    expect(result).toContain('$');
  });

  it('formats with custom currency', () => {
    const result = formatCurrency(100, 'EUR');
    expect(result).toContain('€');
  });

  it('formats zero', () => {
    const result = formatCurrency(0);
    expect(result).toContain('0');
  });
});
