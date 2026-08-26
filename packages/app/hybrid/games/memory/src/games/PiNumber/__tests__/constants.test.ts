import {
  getHighScore,
  HIGH_SCORE_KEY,
  DIGIT_WIDTH,
  VIEWPORT_OFFSET,
} from '../constants';

beforeEach(() => {
  localStorage.clear();
});

describe('getHighScore', () => {
  it('returns 0 when nothing stored', () => {
    expect(getHighScore()).toBe(0);
  });

  it('returns stored value', () => {
    localStorage.setItem(HIGH_SCORE_KEY, '42');
    expect(getHighScore()).toBe(42);
  });

  it('returns 0 for NaN stored value', () => {
    localStorage.setItem(HIGH_SCORE_KEY, 'abc');
    expect(getHighScore()).toBe(0);
  });

  it('returns 0 for empty string', () => {
    localStorage.setItem(HIGH_SCORE_KEY, '');
    expect(getHighScore()).toBe(0);
  });
});

describe('constants', () => {
  it('DIGIT_WIDTH is 24', () => {
    expect(DIGIT_WIDTH).toBe(24);
  });

  it('VIEWPORT_OFFSET is 4 * DIGIT_WIDTH', () => {
    expect(VIEWPORT_OFFSET).toBe(4 * DIGIT_WIDTH);
  });

  it('HIGH_SCORE_KEY is correct string', () => {
    expect(HIGH_SCORE_KEY).toBe('pi-high-score');
  });
});
