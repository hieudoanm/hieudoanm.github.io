import { BET_AMOUNT, getPayout, INITIAL_CREDITS, playRound } from '../utils';

describe('over under seven utils', () => {
  it('pays five to one only on exactly seven', () => {
    expect(getPayout('seven')).toBe(50);
    expect(getPayout('under')).toBe(20);
    expect(getPayout('over')).toBe(20);
  });

  it.each([
    ['under', [2, 3], 'win', 20],
    ['under', [4, 4], 'lose', 0],
    ['over', [5, 4], 'win', 20],
    ['over', [3, 3], 'lose', 0],
    ['seven', [3, 4], 'win', 50],
    ['seven', [6, 6], 'lose', 0],
  ] as const)('playRound(%s, %s) → %s', (bet, dice, result, won) => {
    expect(playRound(bet as never, [...dice] as [number, number])).toEqual({
      dice: [...dice] as [number, number],
      won,
      result,
    });
  });

  it('keeps constants consistent with the docs game', () => {
    expect(BET_AMOUNT).toBe(10);
    expect(INITIAL_CREDITS).toBe(200);
  });
});
