import * as calendar from '..';

describe('calendar package exports', () => {
  it('exports all expected functions and classes', () => {
    expect(calendar.calendar).toBeDefined();
    expect(calendar.weekOfYear).toBeDefined();
    expect(calendar.LunarCalendar).toBeDefined();
  });
});
