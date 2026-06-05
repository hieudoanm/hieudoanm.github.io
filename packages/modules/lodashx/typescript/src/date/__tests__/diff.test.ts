import {
  diff,
  diffDays,
  diffHours,
  diffMinutes,
  diffSeconds,
  diffTime,
} from '../diff';

describe('diffTime', () => {
  it('returns 0 for same dates', () => {
    const date = new Date('2024-01-01');
    expect(diffTime(date, date)).toBe(0);
  });

  it('returns absolute difference in milliseconds', () => {
    const a = new Date('2024-01-01T00:00:00');
    const b = new Date('2024-01-01T00:01:00');
    expect(diffTime(a, b)).toBe(60000);
  });

  it('works regardless of argument order', () => {
    const a = new Date('2024-01-02');
    const b = new Date('2024-01-01');
    expect(diffTime(a, b)).toBe(diffTime(b, a));
  });
});

describe('diffDays', () => {
  it('returns 0 for same day', () => {
    const a = new Date('2024-01-01T00:00:00');
    const b = new Date('2024-01-01T23:59:59');
    expect(diffDays(a, b)).toBe(0);
  });

  it('returns 1 for consecutive days', () => {
    const a = new Date('2024-01-01');
    const b = new Date('2024-01-02');
    expect(diffDays(a, b)).toBe(1);
  });

  it('returns correct days across months', () => {
    const a = new Date('2024-01-31');
    const b = new Date('2024-02-01');
    expect(diffDays(a, b)).toBe(1);
  });

  it('returns correct days across leap year February', () => {
    const a = new Date('2024-02-28');
    const b = new Date('2024-03-01');
    expect(diffDays(a, b)).toBe(2);
  });
});

describe('diffHours', () => {
  it('returns 0 for same hour', () => {
    const a = new Date('2024-01-01T10:00:00');
    const b = new Date('2024-01-01T10:30:00');
    expect(diffHours(a, b)).toBe(0);
  });

  it('returns 1 for one hour apart', () => {
    const a = new Date('2024-01-01T10:00:00');
    const b = new Date('2024-01-01T11:00:00');
    expect(diffHours(a, b)).toBe(1);
  });

  it('returns 24 for a full day apart', () => {
    const a = new Date('2024-01-01T00:00:00');
    const b = new Date('2024-01-02T00:00:00');
    expect(diffHours(a, b)).toBe(24);
  });
});

describe('diffMinutes', () => {
  it('returns 0 for same minute', () => {
    const a = new Date('2024-01-01T10:00:00');
    const b = new Date('2024-01-01T10:00:30');
    expect(diffMinutes(a, b)).toBe(0);
  });

  it('returns 1 for one minute apart', () => {
    const a = new Date('2024-01-01T10:00:00');
    const b = new Date('2024-01-01T10:01:00');
    expect(diffMinutes(a, b)).toBe(1);
  });

  it('returns 60 for one hour apart', () => {
    const a = new Date('2024-01-01T10:00:00');
    const b = new Date('2024-01-01T11:00:00');
    expect(diffMinutes(a, b)).toBe(60);
  });
});

describe('diffSeconds', () => {
  it('returns 0 for same time', () => {
    const a = new Date('2024-01-01T10:00:00');
    const b = new Date('2024-01-01T10:00:00');
    expect(diffSeconds(a, b)).toBe(0);
  });

  it('returns 1 for one second apart', () => {
    const a = new Date('2024-01-01T10:00:00');
    const b = new Date('2024-01-01T10:00:01');
    expect(diffSeconds(a, b)).toBe(1);
  });

  it('returns 60 for one minute apart', () => {
    const a = new Date('2024-01-01T10:00:00');
    const b = new Date('2024-01-01T10:01:00');
    expect(diffSeconds(a, b)).toBe(60);
  });
});

describe('diff', () => {
  it('returns an object with days, hours, minutes, seconds methods', () => {
    const a = new Date('2024-01-01');
    const b = new Date('2024-01-02');
    const result = diff(a, b);
    expect(typeof result.days).toBe('function');
    expect(typeof result.hours).toBe('function');
    expect(typeof result.minutes).toBe('function');
    expect(typeof result.seconds).toBe('function');
  });

  it('delegates to the correct underlying functions', () => {
    const a = new Date('2024-01-01T00:00:00');
    const b = new Date('2024-01-03T00:00:00');
    const result = diff(a, b);
    expect(result.days()).toBe(2);
    expect(result.hours()).toBe(48);
    expect(result.minutes()).toBe(2880);
    expect(result.seconds()).toBe(172800);
  });
});
