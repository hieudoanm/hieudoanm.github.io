import {
  buildDeck,
  correctGuess,
  formatAccuracy,
  isCorrectGuess,
  shuffle,
} from '../game';
import { Claim, MythFactItem } from '../../types';

const item = (isTrue: boolean, category = 'Health'): MythFactItem => ({
  category,
  myth: 'myth text',
  fact: 'fact text',
  isTrue,
});

describe('shuffle', () => {
  it('returns all original items in a different order', () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8];
    const result = shuffle(items);
    expect(result).toHaveLength(items.length);
    expect(result.sort()).toEqual(items.sort());
  });

  it('does not mutate the input array', () => {
    const items = [1, 2, 3];
    shuffle(items);
    expect(items).toEqual([1, 2, 3]);
  });
});

describe('buildDeck', () => {
  const items = [item(false), item(true), item(false), item(true)];

  it('returns exactly count items', () => {
    expect(buildDeck(items, 3)).toHaveLength(3);
  });

  it('does not exceed the source length', () => {
    expect(buildDeck(items, 10)).toHaveLength(4);
  });
});

describe('correctGuess', () => {
  it('returns fact when the claim is true', () => {
    expect(correctGuess(item(true))).toBe('fact');
  });

  it('returns myth when the claim is false', () => {
    expect(correctGuess(item(false))).toBe('myth');
  });
});

describe('isCorrectGuess', () => {
  it('accepts the correct guess', () => {
    expect(isCorrectGuess(item(true), 'fact')).toBe(true);
    expect(isCorrectGuess(item(false), 'myth')).toBe(true);
  });

  it('rejects the wrong guess', () => {
    expect(isCorrectGuess(item(true), 'myth')).toBe(false);
    expect(isCorrectGuess(item(false), 'fact')).toBe(false);
  });
});

describe('formatAccuracy', () => {
  it('formats percentages rounded to integer', () => {
    expect(formatAccuracy(3, 10)).toBe('30%');
    expect(formatAccuracy(1, 3)).toBe('33%');
  });

  it('returns 0% for an empty game', () => {
    expect(formatAccuracy(0, 0)).toBe('0%');
  });
});
