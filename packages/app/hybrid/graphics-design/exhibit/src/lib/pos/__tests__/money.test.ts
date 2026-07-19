import { formatMoney } from '@/lib/pos';

describe('formatMoney', () => {
  it('formats a number as a dollar amount with two decimals', () => {
    expect(formatMoney(13)).toBe('$13.00');
  });

  it('rounds to the nearest cent', () => {
    expect(formatMoney(7.567)).toBe('$7.57');
  });

  it('keeps a leading minus sign for negative amounts', () => {
    expect(formatMoney(-2)).toBe('$-2.00');
  });

  it('formats zero', () => {
    expect(formatMoney(0)).toBe('$0.00');
  });
});
