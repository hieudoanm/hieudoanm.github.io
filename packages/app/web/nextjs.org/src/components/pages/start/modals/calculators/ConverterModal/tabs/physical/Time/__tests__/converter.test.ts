import { convertTime } from '../converter';

describe('convertTime', () => {
  it('converts milliseconds to seconds', () => {
    expect(convertTime(1000, 'milliseconds', 'seconds')).toBe(1);
  });

  it('converts seconds to minutes', () => {
    expect(convertTime(60, 'seconds', 'minutes')).toBe(1);
  });

  it('converts minutes to hours', () => {
    expect(convertTime(60, 'minutes', 'hours')).toBe(1);
  });

  it('converts hours to days', () => {
    expect(convertTime(24, 'hours', 'days')).toBe(1);
  });

  it('converts days to weeks', () => {
    expect(convertTime(7, 'days', 'weeks')).toBe(1);
  });

  it('converts milliseconds to hours', () => {
    const result = convertTime(3600000, 'milliseconds', 'hours');
    expect(result).toBe(1);
  });

  it('converts weeks to milliseconds', () => {
    const result = convertTime(1, 'weeks', 'milliseconds');
    expect(result).toBe(604800000);
  });

  it('converts months to milliseconds approximately', () => {
    const result = convertTime(1, 'months', 'milliseconds') as number;
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(86400000 * 32);
  });

  it('converts years to milliseconds approximately', () => {
    const result = convertTime(1, 'years', 'milliseconds') as number;
    expect(result).toBeGreaterThan(0);
  });

  it('converts 0 to 0', () => {
    expect(convertTime(0, 'milliseconds', 'seconds')).toBe(0);
    expect(convertTime(0, 'hours', 'days')).toBe(0);
  });

  it('converts milliseconds to date string', () => {
    const result = convertTime(0, 'milliseconds', 'date');
    expect(typeof result).toBe('string');
    expect(result).not.toBe('Invalid Date');
  });

  it('returns Invalid Date for NaN ms to date', () => {
    const result = convertTime(NaN, 'milliseconds', 'date');
    expect(result).toBe('Invalid Date');
  });

  it('handles date unit as passthrough', () => {
    const ms = new Date('2024-01-15').getTime();
    const result = convertTime(ms, 'date', 'milliseconds');
    expect(result).toBe(ms);
  });

  it('roundtrips milliseconds through days', () => {
    const ms = 86400000;
    const days = convertTime(ms, 'milliseconds', 'days');
    const back = convertTime(days as number, 'days', 'milliseconds');
    expect(back).toBe(ms);
  });

  it('converts between all pairs without throwing', () => {
    const units: Array<import('../constants').TimeUnit> = [
      'milliseconds',
      'seconds',
      'minutes',
      'hours',
      'days',
      'weeks',
      'months',
      'years',
    ];
    for (const from of units) {
      for (const to of units) {
        const result = convertTime(1, from, to);
        expect(typeof result).toBe('number');
        expect(result).not.toBeNaN();
      }
    }
  });
});
