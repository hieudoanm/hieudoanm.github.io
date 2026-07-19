import { createDeck, drawCard, isRedSuit, shuffle } from '../cards';
import { DICE_FACES, rollDice, rollDie } from '../dice';

describe('probability shared cards', () => {
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

describe('probability shared dice', () => {
  it('rollDie stays within 1..6 across many rolls', () => {
    for (let attempt = 0; attempt < 200; attempt += 1) {
      const value = rollDie();
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(6);
    }
  });

  it('rollDice returns two independent faces', () => {
    const dice = rollDice();
    expect(dice).toHaveLength(2);
    for (const face of dice) {
      expect(DICE_FACES[face]).toBeDefined();
    }
  });
});
