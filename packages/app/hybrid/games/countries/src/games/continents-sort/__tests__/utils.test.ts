import {
  emptyBuckets,
  pickSortCards,
  placeCard,
  regionOf,
  REGIONS,
  SORT_COUNT,
} from '../utils';

describe('continents-sort utils', () => {
  it('REGIONS lists the five continents', () => {
    expect(REGIONS).toEqual([
      'Africa',
      'Europe',
      'Asia',
      'Oceania',
      'Americas',
    ]);
  });

  it('emptyBuckets returns five empty buckets', () => {
    const buckets = emptyBuckets();
    expect(Object.keys(buckets)).toHaveLength(5);
    for (const region of REGIONS) expect(buckets[region]).toEqual([]);
  });

  it('regionOf resolves known countries and rejects unknown ones', () => {
    expect(regionOf('Chile')).toBe('Americas');
    expect(regionOf('Atlantis')).toBeNull();
  });

  it('pickSortCards deals unique cards with valid regions', () => {
    const cards = pickSortCards();
    expect(cards.length).toBe(SORT_COUNT);
    expect(new Set(cards.map((card) => card.name)).size).toBe(SORT_COUNT);
    for (const card of cards) {
      expect(REGIONS).toContain(card.correctRegion);
      expect(card.placedIn).toBeNull();
    }
  });

  it('placeCard places an unplaced card and reports correctness', () => {
    const cards = pickSortCards(5);
    const buckets = emptyBuckets();
    const target = cards[0];
    const outcome = placeCard(
      cards,
      buckets,
      target.name,
      target.correctRegion
    )!;
    expect(outcome.correct).toBe(true);
    expect(outcome.buckets[target.correctRegion]).toContain(target.name);
    const placed = outcome.cards.find((card) => card.name === target.name)!;
    expect(placed.placedIn).toBe(target.correctRegion);
  });

  it('placeCard flags a wrong bucket but still places the card', () => {
    const cards = pickSortCards(2);
    const buckets = emptyBuckets();
    const wrongRegion =
      cards[0].correctRegion === 'Africa' ? 'Europe' : 'Africa';
    const outcome = placeCard(
      cards,
      buckets,
      cards[0].name,
      wrongRegion as never
    )!;
    expect(outcome.correct).toBe(false);
    expect(outcome.buckets[wrongRegion]).toContain(cards[0].name);
  });

  it('placeCard returns null for unknown or already-placed cards', () => {
    const cards = pickSortCards(2);
    const buckets = emptyBuckets();
    expect(placeCard(cards, buckets, 'Atlantis', 'Africa')).toBeNull();
    const first = placeCard(cards, buckets, cards[0].name, 'Africa')!;
    expect(
      placeCard(first.cards, first.buckets, cards[0].name, 'Africa')
    ).toBeNull();
  });
});
