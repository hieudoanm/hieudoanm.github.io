import type { Card } from '../../_shared/cards';
import { isGuessCorrect, rankStrength } from '../utils';

const c = (rank: string): Card => ({ rank, suit: '♠' }) as Card;

describe('hi-lo utils', () => {
  it('ranks ace high and two low', () => {
    expect(rankStrength(c('A'))).toBe(14);
    expect(rankStrength(c('K'))).toBe(13);
    expect(rankStrength(c('2'))).toBe(2);
    expect(rankStrength(c('10'))).toBe(10);
  });

  it('accepts strictly higher guesses', () => {
    expect(isGuessCorrect('higher', c('9'), c('K'))).toBe(true);
    expect(isGuessCorrect('higher', c('K'), c('9'))).toBe(false);
    expect(isGuessCorrect('lower', c('9'), c('4'))).toBe(true);
    expect(isGuessCorrect('lower', c('4'), c('9'))).toBe(false);
  });

  it('counts ties as losses', () => {
    expect(isGuessCorrect('higher', c('7'), c('7'))).toBe(false);
    expect(isGuessCorrect('lower', c('7'), c('7'))).toBe(false);
  });
});
