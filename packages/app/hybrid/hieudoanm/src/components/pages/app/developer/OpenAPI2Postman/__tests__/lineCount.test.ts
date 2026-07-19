import { lineCount } from '../constants';

describe('lineCount', () => {
  it('returns 0 for empty string', () => {
    expect(lineCount('')).toBe(0);
  });

  it('returns 1 for single line', () => {
    expect(lineCount('hello')).toBe(1);
  });

  it('counts multiple lines', () => {
    expect(lineCount('a\nb\nc')).toBe(3);
  });

  it('handles trailing newline', () => {
    expect(lineCount('a\n')).toBe(2);
  });
});
