import type { Card } from '../../_shared/cards';
import { PAYOUTS } from '../types';
import {
  bankerDrawRule,
  cardValue,
  createShoe,
  handValue,
  playerDrawRule,
  resolveRound,
} from '../utils';

const card = (rank: string, suit: Card['suit']): Card =>
  ({ rank, suit }) as Card;

const filler = Array.from({ length: 20 }, () => card('2', '♠'));

describe('baccarat utils', () => {
  it('createShoe builds six decks', () => {
    const shoe = createShoe();
    expect(shoe).toHaveLength(312);
    expect(shoe.filter((c) => c.rank === 'A' && c.suit === '♠')).toHaveLength(
      6
    );
  });

  it.each([
    ['A', 1],
    ['9', 9],
    ['10', 0],
    ['K', 0],
    ['Q', 0],
    ['J', 0],
  ])('cardValue(%s) === %d', (rank, expected) => {
    expect(cardValue(card(rank, '♠'))).toBe(expected);
  });

  it('handValue wraps at ten', () => {
    expect(handValue([card('9', '♠'), card('5', '♥')])).toBe(4);
    expect(handValue([card('A', '♠'), card('K', '♥')])).toBe(1);
  });

  it('player draws on five or less', () => {
    expect(playerDrawRule(5)).toBe(true);
    expect(playerDrawRule(6)).toBe(false);
  });

  it('banker follows the third-card matrix', () => {
    const eight = card('8', '♠');
    expect(bankerDrawRule(2)).toBe(true);
    expect(bankerDrawRule(3, eight)).toBe(false);
    expect(bankerDrawRule(3, card('7', '♠'))).toBe(true);
    expect(bankerDrawRule(4, card('2', '♠'))).toBe(true);
    expect(bankerDrawRule(4, eight)).toBe(false);
    expect(bankerDrawRule(5, card('4', '♠'))).toBe(true);
    expect(bankerDrawRule(5, card('3', '♠'))).toBe(false);
    expect(bankerDrawRule(6, card('6', '♠'))).toBe(true);
    expect(bankerDrawRule(6, eight)).toBe(false);
    expect(bankerDrawRule(7)).toBe(false);
  });

  it('resolveRound returns null on a short shoe', () => {
    expect(resolveRound([card('A', '♠')], 'player')).toBeNull();
  });

  it('resolves a natural player win and pays the bet', () => {
    // player 5+4=9 natural beats banker 4+3=7 — no third cards drawn
    const shoe = [
      card('5', '♠'),
      card('4', '♦'),
      card('4', '♣'),
      card('3', '♥'),
      ...filler,
    ];
    const outcome = resolveRound(shoe, 'player')!;
    expect(outcome.result).toBe('player');
    expect(outcome.won).toBe(PAYOUTS.player);
    expect(handValue(outcome.playerHand)).toBe(9);
  });

  it('pays tie odds on a tie after third-card draws', () => {
    // both hands 4 → player draws 2 → 6; banker (4) sees a 2 and draws → 6
    const shoe = [
      card('5', '♠'),
      card('5', '♦'),
      card('9', '♣'),
      card('9', '♥'),
      ...filler,
    ];
    const outcome = resolveRound(shoe, 'tie')!;
    expect(outcome.result).toBe('tie');
    expect(outcome.won).toBe(PAYOUTS.tie);
    expect(outcome.playerHand).toHaveLength(3);
    expect(outcome.bankerHand).toHaveLength(3);
    expect(outcome.shoe.length).toBe(shoe.length - 6);
  });

  it('settles nothing when the player bet loses to a banker natural', () => {
    // player 5 vs banker natural 9 — round ends immediately
    const shoe = [
      card('2', '♠'),
      card('9', '♦'),
      card('3', '♣'),
      card('K', '♥'),
      ...filler,
    ];
    const outcome = resolveRound(shoe, 'player')!;
    expect(outcome.result).toBe('banker');
    expect(outcome.won).toBe(0);
  });
});
