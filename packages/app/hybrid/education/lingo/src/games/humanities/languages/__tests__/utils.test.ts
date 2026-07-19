import {
  filterByLanguage,
  FlashCard,
  formatLanguage,
  getHubLanguages,
  getLanguages,
  shuffle,
} from '../utils';

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

describe('getHubLanguages', () => {
  it('leads with feature languages then unique deck languages', () => {
    expect(getHubLanguages(CARDS)).toEqual([
      'english',
      'sign',
      'korean',
      'spanish',
    ]);
  });

  it('does not duplicate feature languages already in the deck', () => {
    const withEnglish = [
      ...CARDS,
      { language: 'english', front: 'hello', back: 'hola' },
    ];
    expect(getHubLanguages(withEnglish)).toEqual([
      'english',
      'sign',
      'korean',
      'spanish',
    ]);
  });
});

describe('filterByLanguage', () => {
  it('keeps only cards of the language', () => {
    const korean = filterByLanguage(CARDS, 'korean');
    expect(korean).toHaveLength(2);
    expect(korean.every((card) => card.language === 'korean')).toBe(true);
  });
});

describe('formatLanguage', () => {
  it('capitalizes simple slugs', () => {
    expect(formatLanguage('korean')).toBe('Korean');
  });

  it('splits underscores into readable names', () => {
    expect(formatLanguage('myanmar_(burmese)')).toBe('Myanmar (Burmese)');
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
