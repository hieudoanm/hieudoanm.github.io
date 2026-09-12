import { createDeck, drawCard, shuffle, type Card } from '../_shared/cards';
import { PAYOUTS, type Bet, type DealOutcome, type RoundResult } from './types';

/** Six-deck baccarat shoe. */
export const createShoe = (): Card[] =>
  shuffle(Array.from({ length: 6 }, () => createDeck()).flat());

export const cardValue = (card: Card): number => {
  if (card.rank === 'A') return 1;
  if (['10', 'J', 'Q', 'K'].includes(card.rank)) return 0;
  return parseInt(card.rank, 10);
};

export const handValue = (hand: Card[]): number =>
  hand.reduce((sum, card) => sum + cardValue(card), 0) % 10;

export const playerDrawRule = (playerValue: number): boolean =>
  playerValue <= 5;

export const bankerDrawRule = (
  bankerValue: number,
  playerThird?: Card
): boolean => {
  if (bankerValue <= 2) return true;
  if (bankerValue === 3)
    return playerThird ? cardValue(playerThird) !== 8 : true;
  if (bankerValue === 4)
    return playerThird
      ? [2, 3, 4, 5, 6, 7].includes(cardValue(playerThird))
      : true;
  if (bankerValue === 5)
    return playerThird ? [4, 5, 6, 7].includes(cardValue(playerThird)) : true;
  if (bankerValue === 6)
    return playerThird ? [6, 7].includes(cardValue(playerThird)) : false;
  return false;
};

const winner = (player: number, banker: number): RoundResult => {
  if (player > banker) return 'player';
  if (banker > player) return 'banker';
  return 'tie';
};

/** Pure deal transition — consumes the shoe and settles the bet. */
export const resolveRound = (shoe: Card[], bet: Bet): DealOutcome | null => {
  if (shoe.length < 10) return null;
  let rest = shoe;
  let cards: Card[] = [];
  for (let index = 0; index < 4; index += 1) {
    const [card, next] = drawCard(rest);
    cards = [...cards, card];
    rest = next;
  }
  const playerHand = [cards[0], cards[2]];
  const bankerHand = [cards[1], cards[3]];

  const playerValue = handValue(playerHand);
  const bankerValue = handValue(bankerHand);
  const natural = playerValue >= 8 || bankerValue >= 8 ? true : false;

  if (!natural && playerDrawRule(playerValue)) {
    const [third, next] = drawCard(rest);
    playerHand.push(third);
    rest = next;
    if (bankerDrawRule(bankerValue, third)) {
      const [bankerThird, nextNext] = drawCard(rest);
      bankerHand.push(bankerThird);
      rest = nextNext;
    }
  } else if (
    !natural &&
    !playerDrawRule(playerValue) &&
    bankerDrawRule(bankerValue)
  ) {
    const [bankerThird, next] = drawCard(rest);
    bankerHand.push(bankerThird);
    rest = next;
  }

  const result = winner(handValue(playerHand), handValue(bankerHand));
  const won = bet === result ? PAYOUTS[bet] : 0;
  return { shoe: rest, playerHand, bankerHand, result, won };
};
