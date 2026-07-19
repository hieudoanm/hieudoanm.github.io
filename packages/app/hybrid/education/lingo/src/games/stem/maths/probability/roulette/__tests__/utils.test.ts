import {
  BET_DEFS,
  betWins,
  isRed,
  payoutFor,
  playSpin,
  WHEEL_SIZE,
} from '../utils';

describe('roulette utils', () => {
  it('uses a single-zero wheel of 37 pockets', () => {
    expect(WHEEL_SIZE).toBe(37);
    expect(BET_DEFS).toHaveLength(7);
    expect(payoutFor('red')).toBe(2);
    expect(payoutFor('zero')).toBe(36);
  });

  it('classifies red numbers', () => {
    expect(isRed(1)).toBe(true);
    expect(isRed(32)).toBe(true);
    expect(isRed(2)).toBe(false);
    expect(isRed(0)).toBe(false);
  });

  it('settles outside bets against non-zero numbers', () => {
    expect(betWins('red', 32)).toBe(true);
    expect(betWins('black', 32)).toBe(false);
    expect(betWins('even', 12)).toBe(true);
    expect(betWins('odd', 12)).toBe(false);
    expect(betWins('low', 18)).toBe(true);
    expect(betWins('high', 19)).toBe(true);
    expect(betWins('high', 18)).toBe(false);
    expect(betWins('low', 0)).toBe(false);
  });

  it('only zero wins on zero', () => {
    for (const bet of BET_DEFS.map((def) => def.id)) {
      expect(betWins(bet, 0)).toBe(bet === 'zero');
    }
  });

  it('pays the straight-up multiplier on a zero hit', () => {
    const outcome = playSpin('zero', 0);
    expect(outcome.number).toBe(0);
    expect(outcome.won).toBe(360);
  });

  it('pays even money on a winning colour bet', () => {
    expect(playSpin('red', 18).won).toBe(20);
    expect(playSpin('black', 33).won).toBe(20);
    expect(playSpin('black', 9).won).toBe(0);
  });
});
