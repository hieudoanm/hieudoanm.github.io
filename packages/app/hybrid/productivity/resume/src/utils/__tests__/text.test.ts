import { isBlank, splitComma, splitLines } from '../text';

describe('splitComma', () => {
  it('splits comma separated values and trims them', () => {
    expect(splitComma('React, Next.js, TypeScript')).toEqual([
      'React',
      'Next.js',
      'TypeScript',
    ]);
  });

  it('filters out empty values', () => {
    expect(splitComma('React,,Next.js,')).toEqual(['React', 'Next.js']);
  });

  it('returns an empty array for an empty string', () => {
    expect(splitComma('')).toEqual([]);
  });
});

describe('splitLines', () => {
  it('splits multiline text into trimmed lines', () => {
    expect(splitLines('First line.\nSecond line.')).toEqual([
      'First line.',
      'Second line.',
    ]);
  });

  it('filters out blank lines', () => {
    expect(splitLines('\nFirst line.\n\n')).toEqual(['First line.']);
  });
});

describe('isBlank', () => {
  it('returns true for whitespace-only strings', () => {
    expect(isBlank('   ')).toBe(true);
    expect(isBlank('')).toBe(true);
  });

  it('returns false for non-blank strings', () => {
    expect(isBlank('hello')).toBe(false);
  });
});
