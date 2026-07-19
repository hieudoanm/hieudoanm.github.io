import {
  formatCurrency,
  formatDate,
  formatDateTime,
  formatPercent,
} from '../format';

describe('formatCurrency', () => {
  it('formats VND currency', () => {
    const result = formatCurrency(1_000_000);
    expect(result).toContain('1');
    expect(result).toContain('000');
  });

  it('formats zero', () => {
    const result = formatCurrency(0);
    expect(result).toBeDefined();
  });
});

describe('formatDate', () => {
  it('formats a date string', () => {
    const result = formatDate('2026-01-15');
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });
});

describe('formatDateTime', () => {
  it('formats a datetime string', () => {
    const result = formatDateTime('2026-01-15T10:30:00');
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });
});

describe('formatPercent', () => {
  it('formats 0.05 as 5.00%', () => {
    expect(formatPercent(0.05)).toBe('5.00%');
  });

  it('formats 0 as 0.00%', () => {
    expect(formatPercent(0)).toBe('0.00%');
  });

  it('formats 1 as 100.00%', () => {
    expect(formatPercent(1)).toBe('100.00%');
  });
});
