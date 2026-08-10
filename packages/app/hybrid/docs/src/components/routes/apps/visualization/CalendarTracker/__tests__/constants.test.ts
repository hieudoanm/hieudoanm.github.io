import {
  isLeapYear,
  daysOfMonths,
  months,
  START_YEAR,
  END_YEAR,
  years,
  View,
} from '../constants';

describe('isLeapYear', () => {
  it('returns true for leap year', () => {
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(2000)).toBe(true);
  });

  it('returns false for non-leap year', () => {
    expect(isLeapYear(2023)).toBe(false);
    expect(isLeapYear(2100)).toBe(false);
  });
});

describe('constants', () => {
  it('has 12 months', () => {
    expect(months).toHaveLength(12);
  });

  it('has 12 daysOfMonths', () => {
    expect(daysOfMonths).toHaveLength(12);
    expect(daysOfMonths[0]).toBe(31);
    expect(daysOfMonths[1]).toBe(28);
  });

  it('has correct START_YEAR and END_YEAR', () => {
    expect(START_YEAR).toBe(1970);
    expect(END_YEAR).toBe(2100);
  });

  it('generates correct years array', () => {
    expect(years).toHaveLength(131);
    expect(years[0]).toBe(1970);
    expect(years[years.length - 1]).toBe(2100);
  });

  it('has View enum values', () => {
    expect(View.DAILY).toBe('daily');
    expect(View.MONTHLY).toBe('monthly');
  });
});
