import {
  formatCurrency,
  formatDate,
  formatDateTime,
  formatRelativeDate,
  maskCardNumber,
  toDateString,
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

  it('coerces null amounts to zero', () => {
    expect(formatCurrency(null as unknown as number)).toBe('$0.00');
  });

  it('coerces NaN amounts to zero', () => {
    expect(formatCurrency(Number.NaN)).toBe('$0.00');
  });

  it('falls back to USD for an empty currency', () => {
    expect(formatCurrency(10, '')).toBe('$10.00');
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

describe('formatDateTime', () => {
  it('formats date and time', () => {
    const result = formatDateTime('2026-07-22T10:30:00');
    expect(result).toContain('Jul');
    expect(result).toContain('22');
    expect(result).toMatch(/10|AM/);
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

  it('returns the formatted date for older dates', () => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    expect(formatRelativeDate(date.toISOString())).toContain(
      String(date.getFullYear())
    );
  });
});

describe('toDateString', () => {
  it('formats a date as YYYY-MM-DD', () => {
    expect(toDateString(new Date(2026, 6, 22))).toBe('2026-07-22');
  });

  it('pads month and day with zeros', () => {
    expect(toDateString(new Date(2026, 0, 5))).toBe('2026-01-05');
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
