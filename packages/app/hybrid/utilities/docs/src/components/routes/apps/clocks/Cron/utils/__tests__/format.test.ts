import { cronToDescription, formatNext } from '../format';

describe('cronToDescription', () => {
  it('returns Invalid expression for wrong part count', () => {
    expect(cronToDescription('* * * *')).toBe('Invalid expression');
  });

  it('returns Invalid expression for empty string', () => {
    expect(cronToDescription('')).toBe('Invalid expression');
  });

  it('returns Every minute for all stars', () => {
    expect(cronToDescription('* * * * *')).toBe('Every minute');
  });

  it('returns Every N minutes for */N patterns', () => {
    expect(cronToDescription('*/5 * * * *')).toBe('Every 5 minutes');
    expect(cronToDescription('*/15 * * * *')).toBe('Every 15 minutes');
  });

  it('returns Every hour for 0 * * * *', () => {
    expect(cronToDescription('0 * * * *')).toBe('Every hour');
  });

  it('returns Every hour for 0 0 * * * (rule 4 matches first)', () => {
    expect(cronToDescription('0 0 * * *')).toBe('Every hour');
  });

  it('returns At midnight for 0 0 * * 0', () => {
    expect(cronToDescription('0 0 * * 0')).toBe('At midnight, only on Sunday');
  });

  it('returns At midnight, only on Sunday for 0 0 * * 7', () => {
    expect(cronToDescription('0 0 * * 7')).toBe('At midnight, only on Sunday');
  });

  it('returns At midnight, only on Monday for 0 0 * * 1', () => {
    expect(cronToDescription('0 0 * * 1')).toBe('At midnight, only on Monday');
  });

  it('returns At midnight, only on Tuesday for 0 0 * * 2', () => {
    expect(cronToDescription('0 0 * * 2')).toBe('At midnight, only on Tuesday');
  });

  it('returns At midnight, only on Wednesday for 0 0 * * 3', () => {
    expect(cronToDescription('0 0 * * 3')).toBe(
      'At midnight, only on Wednesday'
    );
  });

  it('returns At midnight, only on Thursday for 0 0 * * 4', () => {
    expect(cronToDescription('0 0 * * 4')).toBe(
      'At midnight, only on Thursday'
    );
  });

  it('returns At midnight, only on Friday for 0 0 * * 5', () => {
    expect(cronToDescription('0 0 * * 5')).toBe('At midnight, only on Friday');
  });

  it('returns At midnight, only on Saturday for 0 0 * * 6', () => {
    expect(cronToDescription('0 0 * * 6')).toBe(
      'At midnight, only on Saturday'
    );
  });

  it('returns At midnight with comma-separated days', () => {
    expect(cronToDescription('0 0 * * 1,3,5')).toBe(
      'At midnight, only on Mon, Wed, Fri'
    );
  });

  it('returns At midnight, on day N for unknown day value', () => {
    expect(cronToDescription('0 0 * * 8')).toBe('At midnight, on day 8');
  });

  it('describes specific minute and hour with : format', () => {
    const result = cronToDescription('30 6 * * *');
    expect(result).toContain(':30');
    expect(result).toContain('past hour 6');
  });

  it('describes step minutes with specific hour as : list', () => {
    const result = cronToDescription('*/10 6 * * *');
    expect(result).toContain(':00,');
    expect(result).toContain('past hour 6');
  });

  it('describes multiple minutes with specific hour', () => {
    const result = cronToDescription('0,15,30,45 9 * * *');
    expect(result).toContain(':00,');
    expect(result).toContain('past hour 9');
  });

  it('describes multiple hours as every N when evenly spaced', () => {
    const result = cronToDescription('0 9,17 * * 1-5');
    expect(result).toContain('every 8 hours');
    expect(result).toContain('on Mon,Tue,Wed,Thu,Fri');
  });

  it('describes specific day of month', () => {
    const result = cronToDescription('0 0 15 * *');
    expect(result).toContain(':00');
    expect(result).toContain('past hour 0');
    expect(result).toContain('on day 15');
  });

  it('describes multiple days of month', () => {
    const result = cronToDescription('0 0 1,15 * *');
    expect(result).toContain('on days 1,15');
  });

  it('describes month', () => {
    const result = cronToDescription('0 0 1 1 *');
    expect(result).toContain('in Jan');
  });

  it('describes multiple months', () => {
    const result = cronToDescription('0 0 1 1,6,12 *');
    expect(result).toContain('in Jan,Jun,Dec');
  });

  it('describes day of week', () => {
    const result = cronToDescription('30 6 * * 1');
    expect(result).toContain('on Mon');
  });

  it('describes multiple days of week', () => {
    const result = cronToDescription('30 6 * * 1-5');
    expect(result).toContain('on Mon,Tue,Wed,Thu,Fri');
  });

  it('returns raw expression when parse gives empty parts', () => {
    const result = cronToDescription('60 6 * * *');
    expect(result).toBe('past hour 6');
  });

  it('describes combined complex expression', () => {
    const result = cronToDescription('30 6 15 1 1');
    expect(result).toContain(':30');
    expect(result).toContain('past hour 6');
    expect(result).toContain('on day 15');
    expect(result).toContain('in Jan');
    expect(result).toContain('on Mon');
  });

  it('handles step value like 1-10/2 in minute field', () => {
    const result = cronToDescription('1-10/2 * * * *');
    expect(result).toBe('Every 2 minutes');
  });

  it('handles step value with range in minute and specific hour', () => {
    const result = cronToDescription('1-10/2 6 * * *');
    expect(result).toContain(':01,');
    expect(result).toContain('past hour 6');
  });

  it('returns raw expression for unrecognized pattern that parse handles', () => {
    const result = cronToDescription('99 99 * * *');
    expect(result).toBe('99 99 * * *');
  });
});

describe('formatNext', () => {
  it('formats a date', () => {
    const d = new Date(2025, 0, 15, 14, 30, 0);
    const result = formatNext(d);
    expect(result).toContain('Wed');
    expect(result).toContain('Jan');
    expect(result).toContain('15');
    expect(result).toContain('14:30');
  });
});
