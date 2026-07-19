import {
  formatCurrency,
  formatDate,
  formatRelativeDate,
  maskCardNumber,
} from '../format';

describe('formatCurrency', () => {
  it('formats positive amounts', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('formats negative amounts', () => {
    expect(formatCurrency(-500)).toBe('-$500.00');
  });

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('formats with different currency', () => {
    expect(formatCurrency(100, 'EUR')).toMatch(/100/);
  });
});

describe('formatDate', () => {
  it('formats a date string', () => {
    const result = formatDate('2026-07-22T10:30:00');
    expect(result).toContain('Jul');
    expect(result).toContain('22');
    expect(result).toContain('2026');
  });
});

describe('formatRelativeDate', () => {
  it('returns Today for current date', () => {
    const now = new Date().toISOString();
    expect(formatRelativeDate(now)).toBe('Today');
  });

  it('returns Yesterday for previous day', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(formatRelativeDate(yesterday.toISOString())).toBe('Yesterday');
  });

  it('returns X days ago for recent dates', () => {
    const date = new Date();
    date.setDate(date.getDate() - 3);
    expect(formatRelativeDate(date.toISOString())).toBe('3 days ago');
  });
});

describe('maskCardNumber', () => {
  it('masks card number showing last 4 digits', () => {
    expect(maskCardNumber('4532 1234 5678 1234')).toBe('•••• •••• •••• 1234');
  });

  it('handles numbers without spaces', () => {
    expect(maskCardNumber('4532123456781234')).toBe('•••• •••• •••• 1234');
  });
});
