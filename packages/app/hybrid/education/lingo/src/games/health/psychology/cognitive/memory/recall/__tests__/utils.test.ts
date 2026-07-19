import {
  HIGH_STREAK_KEY,
  MAX_TIME,
  MIN_TIME,
  TIME_PER_DIGIT,
} from '../constants';
import {
  chunkDigits,
  compareDigits,
  generateNumber,
  mistakesOf,
  showDuration,
} from '../utils';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('chunkDigits', () => {
  it('groups digits in threes', () => {
    expect(chunkDigits('123456789')).toBe('123,456,789');
  });

  it('keeps a shorter number intact', () => {
    expect(chunkDigits('1234')).toBe('1,234');
  });

  it('leaves a partial group unseparated at the end', () => {
    expect(chunkDigits('12345')).toBe('12,345');
  });

  it('returns an empty string unchanged', () => {
    expect(chunkDigits('')).toBe('');
  });

  it('honours a custom group size', () => {
    expect(chunkDigits('123456', 2)).toBe('12,34,56');
  });
});

describe('generateNumber', () => {
  it('produces a string of the requested length', () => {
    expect(generateNumber(5)).toHaveLength(5);
  });

  it('contains only digits', () => {
    expect(generateNumber(20)).toMatch(/^\d{20}$/);
  });

  it('varies between calls', () => {
    const values = new Set(Array.from({ length: 20 }, () => generateNumber(8)));

    expect(values.size).toBeGreaterThan(1);
  });
});

describe('showDuration', () => {
  it('grows with the level', () => {
    expect(showDuration(4)).toBe(4 * TIME_PER_DIGIT);
  });

  it('never drops below the floor', () => {
    expect(showDuration(0)).toBe(MIN_TIME);
    expect(showDuration(1)).toBe(MIN_TIME);
  });

  it('never exceeds the ceiling', () => {
    expect(showDuration(100)).toBe(MAX_TIME);
  });
});

describe('compareDigits', () => {
  it('accepts an exact match', () => {
    expect(compareDigits('123', '123')).toBe(true);
  });

  it('rejects a mismatch', () => {
    expect(compareDigits('124', '123')).toBe(false);
  });

  it('rejects a partial answer', () => {
    expect(compareDigits('12', '123')).toBe(false);
  });
});

describe('mistakesOf', () => {
  it('is zero for an exact match', () => {
    expect(mistakesOf('123', '123')).toBe(0);
  });

  it('counts each wrong digit', () => {
    expect(mistakesOf('193', '123')).toBe(1);
    expect(mistakesOf('999', '123')).toBe(3);
  });

  it('counts missing digits as mistakes', () => {
    expect(mistakesOf('12', '123')).toBe(1);
  });
});

describe('constants', () => {
  it('keeps the show window inside its bounds', () => {
    expect(MIN_TIME).toBeLessThan(TIME_PER_DIGIT * 2);
    expect(MAX_TIME).toBeGreaterThan(TIME_PER_DIGIT * 4);
  });

  it('stores the best streak under a stable key', () => {
    expect(HIGH_STREAK_KEY).toBe('recall-high-streak');
  });
});
