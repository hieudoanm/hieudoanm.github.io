import * as calendar from '..';

describe('calendar package exports', () => {
  it('exports all expected functions and classes', () => {
    expect(calendar.generateFullCalendar).toBeDefined();
    expect(calendar.getWeekOfYear).toBeDefined();
    expect(calendar.LunarCalendar).toBeDefined();
  });
});
