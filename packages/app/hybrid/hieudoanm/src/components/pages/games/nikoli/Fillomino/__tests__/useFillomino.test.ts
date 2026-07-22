import { act, renderHook } from '@testing-library/react';
import { useFillomino } from '../useFillomino';
import * as utils from '../utils';

jest.mock('../utils');

const mockedUtils = jest.mocked(utils);

beforeEach(() => {
  jest.clearAllMocks();
  mockedUtils.SIZE = 6;
  mockedUtils.generatePuzzle.mockReturnValue({
    solution: [
      [2, 2, 1, 1, 1, 3],
      [2, 2, 1, 4, 4, 3],
      [5, 5, 5, 4, 4, 3],
      [5, 5, 5, 6, 6, 6],
      [1, 1, 2, 6, 6, 6],
      [1, 1, 2, 3, 3, 3],
    ],
    puzzle: [
      [2, null, null, null, null, 3],
      [null, 2, null, 4, null, null],
      [5, null, null, null, null, null],
      [null, 5, null, null, 6, null],
      [null, null, 2, null, null, 6],
      [1, null, null, 3, null, null],
    ],
  });
  mockedUtils.isComplete.mockReturnValue(false);
});

describe('useFillomino', () => {
  it('initializes with puzzle state on mount', () => {
    const { result } = renderHook(() => useFillomino());
    expect(mockedUtils.generatePuzzle).toHaveBeenCalled();
    expect(result.current.won).toBe(false);
    expect(result.current.size).toBe(6);
    expect(result.current.grid.length).toBe(6);
  });

  it('handleCellClick selects an empty cell', () => {
    const { result } = renderHook(() => useFillomino());
    act(() => {
      result.current.handleCellClick(0, 1);
    });
    expect(result.current.selected).toEqual([0, 1]);
  });

  it('handleCellClick ignores given cells', () => {
    const { result } = renderHook(() => useFillomino());
    act(() => {
      result.current.handleCellClick(0, 0);
    });
    expect(result.current.selected).toBeNull();
  });

  it('setCell places a value on selected cell', () => {
    const { result } = renderHook(() => useFillomino());
    act(() => {
      result.current.handleCellClick(0, 1);
    });
    act(() => {
      result.current.setCell(2);
    });
    expect(result.current.grid[0][1]).toBe(2);
  });

  it('setCell with 0 clears cell to null', () => {
    const { result } = renderHook(() => useFillomino());
    act(() => {
      result.current.handleCellClick(0, 1);
    });
    act(() => {
      result.current.setCell(2);
    });
    act(() => {
      result.current.setCell(0);
    });
    expect(result.current.grid[0][1]).toBeNull();
  });

  it('undo restores previous state', () => {
    const { result } = renderHook(() => useFillomino());
    act(() => {
      result.current.handleCellClick(0, 1);
    });
    act(() => {
      result.current.setCell(2);
    });
    act(() => {
      result.current.undo();
    });
    expect(result.current.grid[0][1]).toBeNull();
  });

  it('newGame resets state', () => {
    const { result } = renderHook(() => useFillomino());
    act(() => {
      result.current.handleCellClick(0, 1);
    });
    act(() => {
      result.current.setCell(2);
    });
    act(() => {
      result.current.newGame();
    });
    expect(result.current.won).toBe(false);
    expect(mockedUtils.generatePuzzle).toHaveBeenCalledTimes(2);
  });

  it('does not allow click when won', () => {
    mockedUtils.isComplete.mockReturnValue(true);
    const { result } = renderHook(() => useFillomino());
    act(() => {
      result.current.handleCellClick(0, 1);
    });
    act(() => {
      result.current.setCell(2);
    });
    expect(result.current.won).toBe(true);
  });

  it('autoSolve starts and stops', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useFillomino());
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
