import { act, renderHook } from '@testing-library/react';
import { useNorinori } from '../useNorinori';
import * as utils from '../utils';

jest.mock('../utils');

const mockedUtils = jest.mocked(utils);

beforeEach(() => {
  jest.clearAllMocks();
  mockedUtils.SIZE = 6;
  mockedUtils.generatePuzzle.mockReturnValue({
    solution: [
      [true, false, false, false, false, false],
      [false, false, true, false, false, false],
      [false, false, false, false, true, false],
      [false, true, false, false, false, false],
      [false, false, false, true, false, false],
      [false, false, false, false, false, true],
    ],
    clues: {
      rows: [1, 1, 1, 1, 1, 1],
      cols: [1, 1, 1, 1, 1, 1],
    },
  });
  mockedUtils.validate.mockReturnValue(false);
});

describe('useNorinori', () => {
  it('initializes with empty grid', () => {
    const { result } = renderHook(() => useNorinori());
    expect(mockedUtils.generatePuzzle).toHaveBeenCalled();
    expect(result.current.won).toBe(false);
    expect(result.current.size).toBe(6);
  });

  it('toggle shades a cell', () => {
    const { result } = renderHook(() => useNorinori());
    act(() => {
      result.current.toggle(0, 0);
    });
    expect(result.current.grid[0][0]).toBe(true);
  });

  it('toggle twice unshades a cell', () => {
    const { result } = renderHook(() => useNorinori());
    act(() => {
      result.current.toggle(0, 0);
    });
    act(() => {
      result.current.toggle(0, 0);
    });
    expect(result.current.grid[0][0]).toBe(false);
  });

  it('undo restores previous state', () => {
    const { result } = renderHook(() => useNorinori());
    act(() => {
      result.current.toggle(0, 0);
    });
    act(() => {
      result.current.undo();
    });
    expect(result.current.grid[0][0]).toBe(false);
  });

  it('newGame resets state', () => {
    const { result } = renderHook(() => useNorinori());
    act(() => {
      result.current.toggle(0, 0);
    });
    act(() => {
      result.current.newGame();
    });
    expect(result.current.won).toBe(false);
    expect(mockedUtils.generatePuzzle).toHaveBeenCalledTimes(2);
  });

  it('does not toggle when won', () => {
    mockedUtils.validate.mockReturnValue(true);
    const { result } = renderHook(() => useNorinori());
    act(() => {
      result.current.toggle(0, 0);
    });
    expect(result.current.won).toBe(true);
  });

  it('autoSolve starts and stops', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useNorinori());
    act(() => {
      result.current.autoSolve();
    });
    expect(result.current.autoSolving).toBe(true);
    act(() => {
      result.current.autoSolve();
    });
    expect(result.current.autoSolving).toBe(false);
    jest.useRealTimers();
  });
});
