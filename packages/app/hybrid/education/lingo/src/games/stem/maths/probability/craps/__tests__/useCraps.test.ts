import { act, renderHook } from '@testing-library/react';
import type { RollOutcome } from '../types';
import { playComeOut, playPoint } from '../utils';
import { useCraps } from '../useCraps';

jest.mock('../utils', () => {
  const actual = jest.requireActual('../utils');
  return {
    ...actual,
    playComeOut: jest.fn(actual.playComeOut),
    playPoint: jest.fn(actual.playPoint),
  };
});

const { playComeOut: mockedComeOut, playPoint: mockedPoint } = jest.requireMock(
  '../utils'
) as {
  playComeOut: jest.Mock;
  playPoint: jest.Mock;
};

describe('useCraps', () => {
  beforeEach(() => {
    mockedComeOut.mockReset();
    mockedPoint.mockReset();
  });

  it('wins immediately on a come-out natural', () => {
    mockedComeOut.mockReturnValue({
      dice: [5, 6],
      total: 11,
      phase: 'result',
      won: 20,
    });
    const { result } = renderHook(() => useCraps());
    act(() => result.current.roll());
    expect(result.current.phase).toBe('result');
    expect(result.current.finished).toBe(true);
    expect(result.current.lastWon).toBe(20);
    expect(result.current.credits).toBe(200 - 10 + 20);
  });

  it('sets a point then makes it across rolls', () => {
    mockedComeOut.mockReturnValueOnce({
      dice: [2, 3],
      total: 5,
      phase: 'point',
      won: 0,
    });
    mockedPoint.mockReturnValueOnce({
      dice: [1, 4],
      total: 5,
      phase: 'result',
      won: 20,
    });
    const { result } = renderHook(() => useCraps());
    act(() => result.current.roll());
    expect(result.current.point).toBe(5);
    expect(result.current.finished).toBe(false);
    act(() => result.current.roll());
    expect(mockedPoint).toHaveBeenCalledWith(5);
    expect(result.current.phase).toBe('result');
    expect(result.current.lastWon).toBe(20);
    expect(result.current.credits).toBe(200 - 10 + 20);
  });

  it('seven-out loses after the point is set', () => {
    mockedComeOut.mockReturnValueOnce({
      dice: [4, 2],
      total: 6,
      phase: 'point',
      won: 0,
    });
    mockedPoint.mockReturnValueOnce({
      dice: [3, 4],
      total: 7,
      phase: 'result',
      won: 0,
    });
    const { result } = renderHook(() => useCraps());
    act(() => result.current.roll());
    expect(result.current.point).toBe(6);
    act(() => result.current.roll());
    expect(result.current.lastWon).toBe(0);
    expect(result.current.credits).toBe(190);
  });

  it('ignores rolls when the round is finished', () => {
    mockedComeOut.mockReturnValue({
      dice: [6, 5],
      total: 11,
      phase: 'result',
      won: 20,
    });
    const { result } = renderHook(() => useCraps());
    act(() => result.current.roll());
    const creditsBefore = result.current.credits;
    act(() => result.current.roll());
    expect(result.current.credits).toBe(creditsBefore);
    expect(mockedComeOut).toHaveBeenCalledTimes(1);
  });

  it('resets to a fresh come-out', () => {
    mockedComeOut.mockReturnValueOnce({
      dice: [2, 2],
      total: 4,
      phase: 'point',
      won: 0,
    });
    const { result } = renderHook(() => useCraps());
    act(() => result.current.roll());
    act(() => result.current.nextRound());
    expect(result.current.phase).toBe('comeout');
    expect(result.current.point).toBeNull();
    expect(result.current.finished).toBe(false);
  });

  it('keeps the outcome type intact', () => {
    const outcome: RollOutcome = {
      dice: [1, 2],
      total: 3,
      phase: 'result',
      won: 0,
    };
    expect(outcome.won).toBe(0);
  });
});
