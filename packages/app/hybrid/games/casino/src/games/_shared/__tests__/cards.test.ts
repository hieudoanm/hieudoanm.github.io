import { createDeck, drawCard, isRedSuit, shuffle } from '../cards';

describe('shared cards', () => {
  it('creates a 52-card deck with unique rank/suit pairs', () => {
    const deck = createDeck();
    expect(deck).toHaveLength(52);
    const keys = deck.map((card) => `${card.rank}${card.suit}`);
    expect(new Set(keys).size).toBe(52);
  });

  it('shuffle keeps all elements and changes order (usually)', () => {
    const deck = createDeck();
    const mixed = shuffle(deck);
    expect(mixed).toHaveLength(52);
    for (const card of deck) expect(mixed).toContainEqual(card);
  });

  it.each([
    ['♥', true],
    ['♦', true],
    ['♠', false],
    ['♣', false],
  ])('isRedSuit(%s) === %s', (suit, expected) => {
    expect(isRedSuit(suit as never)).toBe(expected);
  });

  it('drawCard removes the top card', () => {
    const deck = createDeck();
    const [card, rest] = drawCard(deck);
    expect(card).toEqual({ rank: 'A', suit: '♠' });
    expect(rest).toHaveLength(51);
  });
});
