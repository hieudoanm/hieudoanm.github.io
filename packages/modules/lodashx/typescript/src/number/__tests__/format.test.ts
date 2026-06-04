import { addZero, formatCurrency } from '../format';

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
