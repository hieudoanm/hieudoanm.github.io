import {
  EMOJI_CATEGORIES,
  createCards,
  formatTime,
  getEmojis,
  hasWholePairs,
  pairCount,
  shuffle,
} from '../utils';

describe('shuffle', () => {
  it('preserves every element exactly once', () => {
    const items = [1, 2, 3, 4, 5];

    expect([...shuffle(items)].sort()).toEqual(items);
  });

  it('leaves the original array untouched', () => {
    const items = [1, 2, 3, 4, 5];

    shuffle(items);

    expect(items).toEqual([1, 2, 3, 4, 5]);
  });

  it('returns an empty array unchanged', () => {
    expect(shuffle([])).toEqual([]);
  });
});

describe('getEmojis', () => {
  it('returns the requested number of emojis for a known category', () => {
    expect(getEmojis('animals', 6)).toHaveLength(6);
  });

  it('falls back to animals for an unknown category', () => {
    expect(getEmojis('unknown', 4)).toEqual(getEmojis('animals', 4));
  });

  it('never returns more emojis than the category holds', () => {
    expect(getEmojis('food', 99).length).toBeLessThanOrEqual(99);
  });

  it('exposes categories in a stable order', () => {
    expect(EMOJI_CATEGORIES).toEqual([
      'animals',
      'food',
      'nature',
      'sports',
      'smileys',
    ]);
  });
});

describe('pairCount', () => {
  it('is half the grid size', () => {
    expect(pairCount(4, 4)).toBe(8);
  });

  it('reports a non-integer when the grid cannot be paired', () => {
    expect(hasWholePairs(3, 3)).toBe(false);
    expect(hasWholePairs(3, 4)).toBe(true);
  });
});

describe('createCards', () => {
  it('creates one card per cell for a 4x4 grid', () => {
    expect(createCards(4, 4, 'animals')).toHaveLength(16);
  });

  it('assigns every emoji exactly twice', () => {
    const counts = new Map<string, number>();

    for (const card of createCards(4, 4, 'animals')) {
      counts.set(card.emoji, (counts.get(card.emoji) ?? 0) + 1);
    }

    expect([...counts.values()].every((count) => count === 2)).toBe(true);
  });

  it('gives every card a unique id', () => {
    const ids = createCards(4, 4, 'food').map((card) => card.id);

    expect(new Set(ids).size).toBe(16);
  });

  it('starts with every card face down and unmatched', () => {
    const cards = createCards(2, 4, 'nature');

    expect(cards.every((card) => !card.flipped && !card.matched)).toBe(true);
  });
});

describe('formatTime', () => {
  it('pads seconds below ten', () => {
    expect(formatTime(0)).toBe('0:00');
    expect(formatTime(5)).toBe('0:05');
  });

  it('rolls over into minutes', () => {
    expect(formatTime(65)).toBe('1:05');
  });

  it('does not roll minutes over at an hour', () => {
    expect(formatTime(3600)).toBe('60:00');
  });
});
