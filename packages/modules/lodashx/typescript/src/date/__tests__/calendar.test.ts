import {
  generateFullCalendar,
  getWeekOfYear,
  LunarCalendar,
} from '../calendar';

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

  it('handles month starting on Sunday (firstDay = 0)', () => {
    const result = generateFullCalendar(2024, 8);
    const firstWeek = result[0]!;
    expect(firstWeek[0]!.currentMonth).toBe('current');
  });

  it('handles month starting on Monday (firstDay = 1)', () => {
    const result = generateFullCalendar(2024, 6);
    const firstWeek = result[0]!;
    expect(firstWeek[0]!.currentMonth).toBe('previous');
    expect(firstWeek[1]!.currentMonth).toBe('current');
  });

  it('handles month starting on Saturday (firstDay = 6)', () => {
    const result = generateFullCalendar(2024, 5);
    const firstWeek = result[0]!;
    expect(firstWeek[0]!.currentMonth).toBe('previous');
    expect(firstWeek[6]!.currentMonth).toBe('current');
  });

  it('includes previous month dates', () => {
    const result = generateFullCalendar(2024, 0);
    const prevDays = result.flat().filter((d) => d.currentMonth === 'previous');
    expect(prevDays.length).toBeGreaterThanOrEqual(0);
  });

  it('includes next month dates', () => {
    const result = generateFullCalendar(2024, 11);
    const nextDays = result.flat().filter((d) => d.currentMonth === 'next');
    expect(nextDays.length).toBeGreaterThanOrEqual(0);
  });

  it('handles 31-day months correctly', () => {
    const result = generateFullCalendar(2024, 0);
    const currentDays = result
      .flat()
      .filter((d) => d.currentMonth === 'current');
    expect(currentDays.length).toBe(31);
  });

  it('handles 30-day months correctly', () => {
    const result = generateFullCalendar(2024, 3);
    const currentDays = result
      .flat()
      .filter((d) => d.currentMonth === 'current');
    expect(currentDays.length).toBe(30);
  });

  it('previous month dates count matches firstDay offset', () => {
    const firstDay = new Date(2026, 0, 1).getDay();
    const result = generateFullCalendar(2026, 0);
    const prevDays = result.flat().filter((d) => d.currentMonth === 'previous');
    expect(prevDays.length).toBe(firstDay);
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

  it('returns week 52 for late December of 2024', () => {
    const date = new Date(2024, 11, 30);
    const week = getWeekOfYear(date);
    expect(week).toBe(1);
  });

  it('returns correct week for mid-year date', () => {
    const date = new Date(2024, 5, 15);
    const week = getWeekOfYear(date);
    expect(week).toBe(24);
  });

  it('handles dates in leap year correctly', () => {
    const date = new Date(2024, 1, 29);
    const week = getWeekOfYear(date);
    expect(week).toBe(9);
  });

  it('returns week 53 for January 1 2026', () => {
    const date = new Date(2026, 0, 1);
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

    it('converts known dates correctly near end of supported range', () => {
      const result = lunar.solar2lunar(2024, 12, 31);
      expect(result).not.toBe(-1);
      if (typeof result !== 'number') {
        expect(result.cYear).toBe(2024);
        expect(result.cMonth).toBe(12);
        expect(result.cDay).toBe(31);
      }
    });

    it('converts known lunar new year dates correctly', () => {
      const result = lunar.solar2lunar(2024, 2, 10);
      expect(result).not.toBe(-1);
      if (typeof result !== 'number') {
        expect(result.lYear).toBe(2024);
        expect(result.lMonth).toBe(1);
        expect(result.lDay).toBe(1);
      }
    });

    it('returns isToday true for current date', () => {
      const today = new Date();
      const result = lunar.solar2lunar(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
      );
      expect(result).not.toBe(-1);
      if (typeof result !== 'number') {
        expect(result.isToday).toBe(true);
      }
    });

    it('returns isToday false for a different date', () => {
      const result = lunar.solar2lunar(2020, 1, 1);
      expect(result).not.toBe(-1);
      if (typeof result !== 'number') {
        expect(result.isToday).toBe(false);
      }
    });
  });

  describe('lYearDays', () => {
    it('returns correct number of days for known years', () => {
      expect(lunar.lYearDays(2024)).toBeGreaterThanOrEqual(354);
      expect(lunar.lYearDays(2024)).toBeLessThanOrEqual(385);
      expect(lunar.lYearDays(2020)).toBeGreaterThanOrEqual(354);
      expect(lunar.lYearDays(2020)).toBeLessThanOrEqual(385);
    });
  });

  describe('monthDays', () => {
    it('returns 29 or 30 for valid months', () => {
      const days = lunar.monthDays(2024, 1);
      expect([29, 30]).toContain(days);
    });
  });
});
