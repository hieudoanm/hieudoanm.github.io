import { act, renderHook } from '@testing-library/react';
import { playRound } from '../utils';
import { useOverUnderSeven } from '../useOverUnderSeven';

jest.mock('../utils', () => {
  const actual = jest.requireActual('../utils');
  return { ...actual, playRound: jest.fn(actual.playRound) };
});

const { playRound: mockedPlay } = jest.requireMock('../utils') as {
  playRound: jest.Mock;
};

describe('useOverUnderSeven', () => {
  beforeEach(() => {
    mockedPlay.mockReset();
    mockedPlay.mockImplementation(
      () =>
        ({
          dice: [3, 4],
          won: 50,
          result: 'win',
        }) as never
    );
  });

  it('does not roll without a bet', () => {
    const { result } = renderHook(() => useOverUnderSeven());
    act(() => result.current.rollDice());
    expect(result.current.phase).toBe('bet');
    expect(mockedPlay).not.toHaveBeenCalled();
  });

  it('rolls a winning under bet deterministically', () => {
    mockedPlay.mockReturnValueOnce({ dice: [2, 3], won: 20, result: 'win' });
    const { result } = renderHook(() => useOverUnderSeven());
    act(() => result.current.selectBet('under'));
    act(() => result.current.rollDice());
    expect(result.current.phase).toBe('result');
    expect(result.current.dice).toEqual([2, 3]);
    expect(result.current.result).toBe('win');
    expect(result.current.lastWon).toBe(20);
    expect(result.current.credits).toBe(200 - 10 + 20);
  });

  it('settles a lost seven bet and resets on next round', () => {
    mockedPlay.mockReturnValueOnce({ dice: [5, 6], won: 0, result: 'lose' });
    const { result } = renderHook(() => useOverUnderSeven());
    act(() => result.current.selectBet('seven'));
    act(() => result.current.rollDice());
    expect(result.current.result).toBe('lose');
    expect(result.current.credits).toBe(190);
    act(() => result.current.nextRound());
    expect(result.current.phase).toBe('bet');
    expect(result.current.bet).toBeNull();
  });
});
