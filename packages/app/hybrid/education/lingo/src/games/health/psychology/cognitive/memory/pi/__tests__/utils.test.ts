import {
  ADVANCE_DELAY,
  DIGIT_WIDTH,
  HIGH_SCORE_KEY,
  INITIAL_PI_STATE,
  KEYPAD,
  PREVENTED_KEYS,
  VIEWPORT_OFFSET,
  getHighScore,
  saveHighScore,
} from '../constants';
import {
  DIGITS,
  applyDigit,
  clearFeedback,
  isDigitKey,
  nudgeIndex,
} from '../utils';
import { PI_DIGITS } from '../piDigits';

beforeEach(() => {
  localStorage.clear();
});

describe('pi digits', () => {
  it('starts with 3.141', () => {
    expect(DIGITS.slice(0, 5).join('')).toBe('3.141');
  });

  it('splits the constant into single characters', () => {
    expect(DIGITS).toHaveLength(PI_DIGITS.length);
  });
});

describe('getHighScore', () => {
  it('is zero when nothing is stored', () => {
    expect(getHighScore()).toBe(0);
  });

  it('reads the stored value', () => {
    localStorage.setItem(HIGH_SCORE_KEY, '42');

    expect(getHighScore()).toBe(42);
  });

  it('falls back to zero for a corrupt value', () => {
    localStorage.setItem(HIGH_SCORE_KEY, 'abc');

    expect(getHighScore()).toBe(0);
  });

  it('round-trips through saveHighScore', () => {
    saveHighScore(17);

    expect(getHighScore()).toBe(17);
  });
});

describe('constants', () => {
  it('sizes the digit strip from the digit width', () => {
    expect(DIGIT_WIDTH).toBe(24);
    expect(VIEWPORT_OFFSET).toBe(96);
  });

  it('offers every digit plus the decimal point on the keypad', () => {
    expect(KEYPAD).toHaveLength(11);
    expect(KEYPAD).toContain('.');
  });

  it('suppresses page scrolling for navigation keys', () => {
    expect(PREVENTED_KEYS).toEqual(['ArrowLeft', 'ArrowRight', ' ']);
  });

  it('starts unplayed with no high score', () => {
    expect(INITIAL_PI_STATE).toEqual({
      locked: false,
      lastResult: null,
      revealedIndex: null,
      highScore: 0,
    });
  });
});

describe('isDigitKey', () => {
  it('accepts digits and the decimal point', () => {
    expect(isDigitKey('7')).toBe(true);
    expect(isDigitKey('.')).toBe(true);
  });

  it('rejects letters and named keys', () => {
    expect(isDigitKey('a')).toBe(false);
    expect(isDigitKey('ArrowRight')).toBe(false);
  });
});

describe('nudgeIndex', () => {
  it('moves right within bounds', () => {
    expect(nudgeIndex('ArrowRight', 4, 9)).toBe(5);
  });

  it('stops at the last digit when moving right', () => {
    expect(nudgeIndex('ArrowRight', 9, 9)).toBe(9);
  });

  it('moves left and stops at zero', () => {
    expect(nudgeIndex('ArrowLeft', 4, 9)).toBe(3);
    expect(nudgeIndex('ArrowLeft', 0, 9)).toBe(0);
  });

  it('leaves the index alone for any other key', () => {
    expect(nudgeIndex('x', 4, 9)).toBe(4);
  });
});

describe('applyDigit', () => {
  const digits = ['3', '.', '1'];

  it('ignores keys that are not digits', () => {
    const outcome = applyDigit('ArrowRight', 0, digits, INITIAL_PI_STATE);

    expect(outcome).toEqual({ state: INITIAL_PI_STATE, advance: false });
  });

  it('confirms a correct digit and asks to advance', () => {
    const outcome = applyDigit('3', 0, digits, INITIAL_PI_STATE);

    expect(outcome.advance).toBe(true);
    expect(outcome.state.lastResult).toBe('correct');
    expect(outcome.state.revealedIndex).toBe(0);
  });

  it('locks the run on a wrong digit', () => {
    const outcome = applyDigit('7', 0, digits, INITIAL_PI_STATE);

    expect(outcome.advance).toBe(false);
    expect(outcome.state.locked).toBe(true);
    expect(outcome.state.lastResult).toBe('wrong');
  });

  it('keeps the best score when a later run ends sooner', () => {
    const state = { ...INITIAL_PI_STATE, highScore: 10 };
    const outcome = applyDigit('7', 4, digits, state);

    expect(outcome.state.highScore).toBe(10);
  });

  it('raises the best score to the digit reached', () => {
    const state = { ...INITIAL_PI_STATE, highScore: 2 };
    const outcome = applyDigit('7', 5, digits, state);

    expect(outcome.state.highScore).toBe(5);
  });
});

describe('clearFeedback', () => {
  it('drops the result and the revealed digit', () => {
    const state = {
      ...INITIAL_PI_STATE,
      lastResult: 'correct' as const,
      revealedIndex: 3,
    };

    expect(clearFeedback(state)).toEqual(INITIAL_PI_STATE);
  });
});

describe('advance timing', () => {
  it('gives brief feedback before the next digit', () => {
    expect(ADVANCE_DELAY).toBeGreaterThan(0);
    expect(ADVANCE_DELAY).toBeLessThan(1000);
  });
});
