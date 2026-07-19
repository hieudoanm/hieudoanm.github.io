import {
  buildDeck,
  correctGuess,
  formatAccuracy,
  isCorrectGuess,
  shuffle,
} from '../game';
import type { MythFactItem } from '../../types';

const item = (isTrue: boolean, category = 'test'): MythFactItem => ({
  category,
  myth: `Myth ${isTrue ? 'true' : 'false'}`,
  fact: `Fact for ${category}`,
  isTrue,
});

describe('shuffle', () => {
  it('returns all original items in a different order', () => {
    const items = [item(true), item(false), item(true), item(false)];
    const result = shuffle(items);
    expect(result).toHaveLength(items.length);
    expect(result).toEqual(expect.arrayContaining(items));
  });

  it('does not mutate the input array', () => {
    const items = [item(true), item(false), item(true)];
    const copy = [...items];
    shuffle(items);
    expect(items).toEqual(copy);
  });
});

describe('buildDeck', () => {
  it('returns exactly count items', () => {
    const items = Array.from({ length: 20 }, (_, i) => item(i % 2 === 0));
    const deck = buildDeck(items, 5);
    expect(deck).toHaveLength(5);
  });

  it('does not exceed the source length', () => {
    const items = [item(true), item(false)];
    const deck = buildDeck(items, 10);
    expect(deck).toHaveLength(2);
  });
});

describe('correctGuess', () => {
  it('returns fact when claim is true', () => {
    expect(correctGuess(item(true))).toBe('fact');
  });

  it('returns myth when claim is false', () => {
    expect(correctGuess(item(false))).toBe('myth');
  });
});

describe('isCorrectGuess', () => {
  it('accepts correct guess', () => {
    expect(isCorrectGuess(item(true), 'fact')).toBe(true);
    expect(isCorrectGuess(item(false), 'myth')).toBe(true);
  });

  it('rejects wrong guess', () => {
    expect(isCorrectGuess(item(true), 'myth')).toBe(false);
    expect(isCorrectGuess(item(false), 'fact')).toBe(false);
  });
});

describe('formatAccuracy', () => {
  it('formats percentages rounded to integer', () => {
    expect(formatAccuracy(3, 10)).toBe('30%');
    expect(formatAccuracy(1, 3)).toBe('33%');
    expect(formatAccuracy(0, 0)).toBe('0%');
  });

  it('returns 0% for empty game', () => {
    expect(formatAccuracy(0, 0)).toBe('0%');
  });
});
