import { padZero, formatCurrency } from '../format';

describe('padZero', () => {
  it('pads single digit to default length 2', () => {
    expect(padZero(5)).toBe('05');
  });

  it('does not pad if same length', () => {
    expect(padZero(42)).toBe('42');
  });

  it('does not pad if longer than length', () => {
    expect(padZero(123)).toBe('123');
  });

  it('pads to custom length', () => {
    expect(padZero(7, 4)).toBe('0007');
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
