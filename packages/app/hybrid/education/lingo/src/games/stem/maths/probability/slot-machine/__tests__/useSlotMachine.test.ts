import { act, renderHook } from '@testing-library/react';
import { BET_AMOUNT, INITIAL_CREDITS } from '../constants';
import { randomSymbols } from '../utils';
import { useSlotMachine } from '../useSlotMachine';

jest.mock('../utils', () => {
  const actual = jest.requireActual('../utils');
  return { ...actual, randomSymbols: jest.fn() };
});

const { randomSymbols: mockedRandom } = jest.requireMock('../utils') as {
  randomSymbols: jest.Mock;
};

describe('useSlotMachine', () => {
  beforeEach(() => {
    mockedRandom.mockReset();
  });

  it('starts with initial credits and idle reels', () => {
    const { result } = renderHook(() => useSlotMachine());
    expect(result.current.credits).toBe(INITIAL_CREDITS);
    expect(result.current.reels).toEqual([0, 0, 0]);
    expect(result.current.broke).toBe(false);
  });

  it('spins a losing round and deducts the bet', () => {
    mockedRandom.mockReturnValue([0, 2, 4]);
    const { result } = renderHook(() => useSlotMachine());
    act(() => result.current.spin());
    expect(result.current.reels).toEqual([0, 2, 4]);
    expect(result.current.winAmount).toBe(0);
    expect(result.current.message).toBe('No luck this time');
    expect(result.current.credits).toBe(INITIAL_CREDITS - BET_AMOUNT);
  });

  it('pays out on a winning spin', () => {
    mockedRandom.mockReturnValue([5, 5, 5]);
    const { result } = renderHook(() => useSlotMachine());
    act(() => result.current.spin());
    expect(result.current.winAmount).toBe(500);
    expect(result.current.credits).toBe(INITIAL_CREDITS - 10 + 500);
    expect(result.current.message).toContain('You won');
  });

  it('blocks spins when broke and restores credits on reset', () => {
    mockedRandom.mockReturnValue([0, 1, 2]);
    const { result } = renderHook(() => useSlotMachine());
    for (let index = 0; index < 10; index += 1) {
      act(() => result.current.spin());
    }
    expect(result.current.broke).toBe(true);
    act(() => result.current.spin());
    expect(result.current.credits).toBe(0);
    act(() => result.current.resetCredits());
    expect(result.current.credits).toBe(INITIAL_CREDITS);
    expect(result.current.reels).toEqual([0, 0, 0]);
  });
});
