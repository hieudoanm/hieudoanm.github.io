import { shuffle, createCards, formatTime, getEmojis } from '../utils';

describe('shuffle', () => {
  it('preserves all elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffle(arr);
    expect(result.sort()).toEqual(arr);
  });

  it('does not mutate original', () => {
    const arr = [1, 2, 3, 4, 5];
    const copy = [...arr];
    shuffle(arr);
    expect(arr).toEqual(copy);
  });
});

describe('getEmojis', () => {
  it('returns correct number of emojis', () => {
    const emojis = getEmojis('animals', 6);
    expect(emojis).toHaveLength(6);
  });

  it('falls back to animals for unknown category', () => {
    const emojis = getEmojis('unknown', 4);
    expect(emojis).toHaveLength(4);
  });
});

describe('createCards', () => {
  it('creates paired cards for 4x4 grid', () => {
    const cards = createCards(4, 4, 'animals');
    expect(cards).toHaveLength(16);
    const emojis = cards.map((c) => c.emoji);
    const counts = new Map<string, number>();
    emojis.forEach((e) => counts.set(e, (counts.get(e) || 0) + 1));
    expect([...counts.values()].every((c) => c === 2)).toBe(true);
  });

  it('each card has unique id', () => {
    const cards = createCards(4, 4, 'food');
    const ids = cards.map((c) => c.id);
    expect(new Set(ids).size).toBe(16);
  });
});

describe('formatTime', () => {
  it('formats 0 as 0:00', () => expect(formatTime(0)).toBe('0:00'));
  it('formats 65 as 1:05', () => expect(formatTime(65)).toBe('1:05'));
  it('formats 3600 as 60:00', () => expect(formatTime(3600)).toBe('60:00'));
});
