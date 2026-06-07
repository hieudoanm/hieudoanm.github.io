import { fmt } from '../format';

describe('fmt', () => {
  it('returns string as-is for numbers < 1000', () => {
    expect(fmt(0)).toBe('0');
    expect(fmt(42)).toBe('42');
    expect(fmt(999)).toBe('999');
  });

  it('formats numbers >= 1000 with k suffix', () => {
    expect(fmt(1000)).toBe('1.0k');
    expect(fmt(1500)).toBe('1.5k');
    expect(fmt(10000)).toBe('10.0k');
    expect(fmt(1234567)).toBe('1234.6k');
  });
});
