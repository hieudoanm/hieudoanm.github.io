import { isCountry } from '../../_shared/countries';
import type { LetterStatus } from '../types';
import {
  ANSWER_POOL,
  dailyAnswer,
  dailyAnswerIndex,
  evaluateGuess,
  GUESSABLE,
  isValidGuess,
  mergeKeyboard,
  submitGuess,
  todayKey,
} from '../utils';

describe('ANSWER_POOL', () => {
  it('contains only single-word countries of length 4-10', () => {
    for (const name of ANSWER_POOL) {
      expect(isCountry(name)).toBe(true);
      expect(name).not.toContain(' ');
      expect(name.length).toBeGreaterThanOrEqual(4);
      expect(name.length).toBeLessThanOrEqual(10);
    }
  });

  it('includes well known answers', () => {
    expect(ANSWER_POOL).toContain('Chile');
    expect(ANSWER_POOL).toContain('Japan');
  });
});

describe('isValidGuess', () => {
  it.each(['CHILE', 'chile'])('accepts single-word country %s', (guess) => {
    expect(isValidGuess(guess)).toBe(true);
  });

  it.each(['COSTA RICA', 'NOTACOUNTRY'])('rejects %s', (guess) => {
    expect(isValidGuess(guess)).toBe(false);
  });
});

describe('GUESSABLE', () => {
  it('holds normalized names', () => {
    expect(GUESSABLE.has('CHAD')).toBe(true);
    expect(GUESSABLE.has('chad')).toBe(false);
  });
});

describe('evaluateGuess', () => {
  it('marks every tile correct on an exact match', () => {
    expect(evaluateGuess('JAPAN', 'JAPAN')).toEqual([
      'correct',
      'correct',
      'correct',
      'correct',
      'correct',
    ]);
  });

  it('handles duplicates without over-counting', () => {
    // answer has three A's; guess has two A's and one B
    const statuses = evaluateGuess('ABABAB', 'BANANA');
    expect(statuses).toEqual([
      'present',
      'present',
      'present',
      'absent',
      'present',
      'absent',
    ]);
  });

  it('prefers exact positions before present counts', () => {
    expect(evaluateGuess('PANAMA', 'CANADA')).toEqual([
      'absent',
      'correct',
      'correct',
      'correct',
      'absent',
      'correct',
    ]);
  });

  it('marks everything absent when nothing matches', () => {
    expect(evaluateGuess('EGYPT', 'BOLIV')).toEqual([
      'absent',
      'absent',
      'absent',
      'absent',
      'absent',
    ]);
  });
});

describe('mergeKeyboard', () => {
  it('upgrades letter hints but never downgrades', () => {
    let keyboard = mergeKeyboard({}, 'AT', ['absent', 'correct']);
    expect(keyboard).toEqual({ A: 'absent', T: 'correct' });
    keyboard = mergeKeyboard(keyboard, 'AB', ['present', 'present']);
    expect(keyboard.A).toBe('present');
    expect(keyboard.B).toBe('present');
    keyboard = mergeKeyboard(keyboard, 'A', ['correct']);
    expect(keyboard.A).toBe('correct');
    keyboard = mergeKeyboard(keyboard, 'T', ['absent']);
    expect(keyboard.T).toBe('correct');
  });
});

describe('dailyAnswerIndex', () => {
  it('is deterministic per date key', () => {
    expect(dailyAnswerIndex('2026-01-01')).toBe(dailyAnswerIndex('2026-01-01'));
    expect(dailyAnswerIndex('2026-01-01')).toBeLessThan(ANSWER_POOL.length);
    expect(dailyAnswerIndex('2026-01-01')).toBeGreaterThanOrEqual(0);
  });

  it('maps date keys to answers inside the pool', () => {
    expect(ANSWER_POOL).toContain(dailyAnswer('2026-08-22'));
    expect(dailyAnswer('2026-08-22')).toBe(dailyAnswer('2026-08-22'));
  });
});

describe('todayKey', () => {
  it('formats a date as YYYY-MM-DD with zero padding', () => {
    expect(todayKey(new Date(2026, 0, 5))).toBe('2026-01-05');
    expect(todayKey(new Date(2026, 11, 31))).toBe('2026-12-31');
  });
});

describe('submitGuess', () => {
  it('rejects a guess shorter than the answer', () => {
    const result = submitGuess('CHA', 'CHILE', [], {});
    expect(result.guesses).toHaveLength(0);
    expect(result.message).toBe('Not enough letters');
    expect(result.status).toBe('playing');
  });

  it('rejects a non-country word of matching length', () => {
    const result = submitGuess('XYZZY', 'CHILE', [], {});
    expect(result.message).toBe('Not a country name');
    expect(result.guesses).toHaveLength(0);
  });

  it('records a valid wrong guess and updates the keyboard', () => {
    const result = submitGuess('GHANA', 'CHILE', [], {});
    expect(result.guesses).toHaveLength(1);
    expect(result.guesses[0].word).toBe('GHANA');
    expect(result.keyboard.H).toBe('correct');
    expect(result.keyboard.G).toBe('absent');
    expect(result.status).toBe('playing');
    expect(result.message).toBeNull();
  });

  it('wins on an exact match', () => {
    const result = submitGuess('CHILE', 'CHILE', [], {});
    expect(result.status).toBe('won');
    expect(result.keyboard.C).toBe('correct');
  });

  it('loses after the sixth wrong guess', () => {
    let guesses: ReturnType<typeof submitGuess>['guesses'] = [];
    let keyboard: Record<string, LetterStatus> = {};
    const fillers = ['GHANA', 'INDIA', 'KENYA', 'MALTA', 'EGYPT'];
    for (const filler of fillers) {
      const step = submitGuess(filler, 'CHILE', guesses, keyboard);
      guesses = step.guesses;
      keyboard = step.keyboard;
    }
    expect(guesses).toHaveLength(5);
    const final = submitGuess('MALTA', 'CHILE', guesses, keyboard);
    expect(final.guesses).toHaveLength(6);
    expect(final.status).toBe('lost');
  });
});
