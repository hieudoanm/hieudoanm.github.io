import { format, formatDate, formatDateTime, formatTime } from '../format';

describe('formatDate', () => {
  it('formats date with default separator', () => {
    const date = new Date(2024, 0, 5);
    expect(formatDate(date)).toBe('2024-01-05');
  });

  it('formats date with custom separator', () => {
    const date = new Date(2024, 0, 5);
    expect(formatDate(date, '/')).toBe('2024/01/05');
    expect(formatDate(date, '.')).toBe('2024.01.05');
  });

  it('pads month and day with zero', () => {
    const date = new Date(2024, 2, 3);
    expect(formatDate(date)).toBe('2024-03-03');
  });
});

describe('formatTime', () => {
  it('formats time without seconds', () => {
    const date = new Date(2024, 0, 1, 9, 5);
    expect(formatTime(date)).toBe('09:05');
  });

  it('formats time with seconds', () => {
    const date = new Date(2024, 0, 1, 9, 5, 3);
    expect(formatTime(date, true)).toBe('09:05:03');
  });

  it('handles midnight', () => {
    const date = new Date(2024, 0, 1, 0, 0);
    expect(formatTime(date)).toBe('00:00');
    expect(formatTime(date, true)).toBe('00:00:00');
  });

  it('handles noon', () => {
    const date = new Date(2024, 0, 1, 12, 30);
    expect(formatTime(date)).toBe('12:30');
  });
});

describe('formatDateTime', () => {
  it('combines date and time with seconds', () => {
    const date = new Date(2024, 0, 5, 9, 5, 3);
    expect(formatDateTime(date)).toBe('2024-01-05 09:05:03');
  });

  it('handles edge times', () => {
    const date = new Date(2024, 11, 31, 23, 59, 59);
    expect(formatDateTime(date)).toBe('2024-12-31 23:59:59');
  });
});

describe('format', () => {
  const date = new Date(2024, 0, 5, 9, 5, 3);

  it('returns an object with date, time, dateTime methods', () => {
    const result = format(date);
    expect(typeof result.date).toBe('function');
    expect(typeof result.time).toBe('function');
    expect(typeof result.dateTime).toBe('function');
  });

  it('date() formats with default separator', () => {
    expect(format(date).date()).toBe('2024-01-05');
  });

  it('date() formats with custom separator', () => {
    expect(format(date).date('/')).toBe('2024/01/05');
  });

  it('time() formats without seconds by default', () => {
    expect(format(date).time()).toBe('09:05');
  });

  it('time() formats with seconds when requested', () => {
    expect(format(date).time(true)).toBe('09:05:03');
  });

  it('dateTime() returns date format only', () => {
    const result = format(date).dateTime();
    expect(result).toBe('2024-01-05');
  });
});
