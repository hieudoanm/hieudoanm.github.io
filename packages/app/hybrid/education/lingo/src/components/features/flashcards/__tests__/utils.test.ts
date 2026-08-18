import { filterByLanguage, FlashCard, getLanguages, shuffle } from '../utils';

const CARDS: FlashCard[] = [
  { language: 'korean', front: '안녕', back: 'hello' },
  { language: 'spanish', front: 'hola', back: 'hello' },
  { language: 'korean', front: '감사', back: 'thanks' },
];

describe('getLanguages', () => {
  it('returns unique languages in order', () => {
    expect(getLanguages(CARDS)).toEqual(['korean', 'spanish']);
  });

  it('returns empty for empty deck', () => {
    expect(getLanguages([])).toEqual([]);
  });
});

describe('filterByLanguage', () => {
  it('keeps only cards of the language', () => {
    const korean = filterByLanguage(CARDS, 'korean');
    expect(korean).toHaveLength(2);
    expect(korean.every((card) => card.language === 'korean')).toBe(true);
  });
});

describe('shuffle', () => {
  it('returns a new array with same items', () => {
    const shuffled = shuffle(CARDS);
    expect(shuffled).not.toBe(CARDS);
    expect(shuffled).toHaveLength(CARDS.length);
    expect(
      [...shuffled].sort((a, b) => a.front.localeCompare(b.front))
    ).toEqual([...CARDS].sort((a, b) => a.front.localeCompare(b.front)));
  });

  it('does not mutate the input', () => {
    const before = [...CARDS];
    shuffle(CARDS);
    expect(CARDS).toEqual(before);
  });
});
