import { formatCurrency } from '../formatCurrency';

describe('formatCurrency', () => {
  it('formats USD', () => {
    expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
  });

  it('formats EUR', () => {
    expect(formatCurrency(99.99, 'EUR')).toBe('€99.99');
  });

  it('formats JPY (no decimals)', () => {
    expect(formatCurrency(5000, 'JPY')).toBe('¥5,000');
  });

  it('formats zero', () => {
    expect(formatCurrency(0, 'USD')).toBe('$0.00');
  });
});
