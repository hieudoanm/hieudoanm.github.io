import { act, renderHook } from '@testing-library/react';
import { playSpin } from '../utils';
import { useRoulette } from '../useRoulette';

jest.mock('../utils', () => {
  const actual = jest.requireActual('../utils');
  return { ...actual, spinNumber: jest.fn() };
});

const { spinNumber } = jest.requireMock('../utils') as {
  spinNumber: jest.Mock;
};

describe('useRoulette', () => {
  beforeEach(() => {
    spinNumber.mockReset();
  });

  it('does not spin without a bet', () => {
    const { result } = renderHook(() => useRoulette());
    act(() => result.current.spin());
    expect(result.current.phase).toBe('bet');
  });

  it('wins an even-money red bet', () => {
    spinNumber.mockReturnValue(32);
    const { result } = renderHook(() => useRoulette());
    act(() => result.current.selectBet('red'));
    act(() => result.current.spin());
    expect(result.current.phase).toBe('result');
    expect(result.current.landed).toBe(32);
    expect(result.current.lastWon).toBe(20);
    expect(result.current.credits).toBe(210);
  });

  it('loses the bet when zero lands', () => {
    spinNumber.mockReturnValue(0);
    const { result } = renderHook(() => useRoulette());
    act(() => result.current.selectBet('black'));
    act(() => result.current.spin());
    expect(result.current.lastWon).toBe(0);
    expect(result.current.credits).toBe(190);
    act(() => result.current.nextRound());
    expect(result.current.phase).toBe('bet');
    expect(result.current.landed).toBeNull();
  });

  it('keeps the pure helper consistent', () => {
    const outcome = playSpin('even', 14);
    expect(outcome.won).toBe(20);
  });
});
