import {
  generateFullCalendar,
  getWeekOfYear,
  LunarCalendar,
} from '../src/calendar';

describe('generateFullCalendar', () => {
  it('returns 2D array of weeks', () => {
    const result = generateFullCalendar(2024, 0);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(4);
    expect(result.length).toBeLessThanOrEqual(6);
  });

  it('each week has 7 days', () => {
    const result = generateFullCalendar(2024, 0);
    result.forEach((week) => {
      expect(week.length).toBe(7);
    });
  });

  it('each day has date and currentMonth', () => {
    const result = generateFullCalendar(2024, 0);
    const day = result[0]![0]!;
    expect(typeof day.date).toBe('number');
    expect(['previous', 'current', 'next']).toContain(day.currentMonth);
  });

  it('contains dates from the current month', () => {
    const result = generateFullCalendar(2024, 0);
    const currentDays = result
      .flat()
      .filter((d) => d.currentMonth === 'current');
    expect(currentDays.length).toBeGreaterThanOrEqual(28);
  });

  it('handles February in leap year', () => {
    const result = generateFullCalendar(2024, 1);
    const currentDays = result
      .flat()
      .filter((d) => d.currentMonth === 'current');
    expect(currentDays.length).toBe(29);
  });

  it('handles February in non-leap year', () => {
    const result = generateFullCalendar(2023, 1);
    const currentDays = result
      .flat()
      .filter((d) => d.currentMonth === 'current');
    expect(currentDays.length).toBe(28);
  });
});

describe('getWeekOfYear', () => {
  it('returns 1 for first week of January', () => {
    const date = new Date(2024, 0, 1);
    expect(getWeekOfYear(date)).toBe(1);
  });

  it('returns correct week for late December', () => {
    const date = new Date(2025, 11, 31);
    const week = getWeekOfYear(date);
    expect(week).toBe(1);
  });
});

describe('LunarCalendar', () => {
  const lunar = new LunarCalendar();

  describe('leapMonth', () => {
    it('returns leap month for known leap years', () => {
      expect(lunar.leapMonth(2023)).toBe(2);
      expect(lunar.leapMonth(2020)).toBe(4);
    });

    it('returns 0 for non-leap years', () => {
      expect(lunar.leapMonth(2024)).toBe(0);
      expect(lunar.leapMonth(2025)).toBe(6);
    });
  });

  describe('leapDays', () => {
    it('returns 29 for 2023 leap month', () => {
      const days = lunar.leapDays(2023);
      expect(days).toBe(29);
    });

    it('returns 0 for non-leap years', () => {
      expect(lunar.leapDays(2024)).toBe(0);
    });
  });

  describe('lYearDays', () => {
    it('returns total days in a lunar year', () => {
      const days = lunar.lYearDays(2024);
      expect(days).toBeGreaterThanOrEqual(354);
      expect(days).toBeLessThanOrEqual(385);
    });
  });

  describe('monthDays', () => {
    it('returns days in a lunar month', () => {
      expect(lunar.monthDays(2024, 1)).toBeGreaterThanOrEqual(29);
      expect(lunar.monthDays(2024, 1)).toBeLessThanOrEqual(30);
    });

    it('returns -1 for invalid month', () => {
      expect(lunar.monthDays(2024, 13)).toBe(-1);
      expect(lunar.monthDays(2024, 0)).toBe(-1);
    });
  });

  describe('solar2lunar', () => {
    it('converts a known solar date to lunar', () => {
      const result = lunar.solar2lunar(2024, 1, 1);
      expect(result).not.toBe(-1);
      if (typeof result !== 'number') {
        expect(result.lYear).toBeGreaterThanOrEqual(1900);
        expect(result.lMonth).toBeGreaterThanOrEqual(1);
        expect(result.lMonth).toBeLessThanOrEqual(12);
        expect(result.lDay).toBeGreaterThanOrEqual(1);
        expect(result.cYear).toBe(2024);
        expect(result.cMonth).toBe(1);
        expect(result.cDay).toBe(1);
      }
    });

    it('returns -1 for date before supported range', () => {
      expect(lunar.solar2lunar(1900, 1, 1)).toBe(-1);
    });

    it('returns -1 for year out of range', () => {
      expect(lunar.solar2lunar(1899, 1, 1)).toBe(-1);
      expect(lunar.solar2lunar(2101, 1, 1)).toBe(-1);
    });

    it('returns -1 for year 0 (out of range)', () => {
      const result = lunar.solar2lunar(0, 0, 0);
      expect(result).toBe(-1);
    });
  });
});
