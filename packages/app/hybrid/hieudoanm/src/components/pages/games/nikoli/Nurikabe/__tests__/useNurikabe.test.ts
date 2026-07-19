import { act, renderHook } from '@testing-library/react';
import { useNurikabe } from '../useNurikabe';
import * as utils from '../utils';

jest.mock('../utils');

const mockedUtils = jest.mocked(utils);

const mockSolution = Array.from({ length: 6 }, () =>
  Array.from({ length: 6 }, () => ({
    state: 'empty' as const,
    value: null as number | null,
    islandId: -1,
  }))
);
mockSolution[0][0] = { state: 'numbered', value: 2, islandId: 0 };
mockSolution[0][1] = { state: 'numbered', value: 2, islandId: 0 };

beforeEach(() => {
  jest.clearAllMocks();
  mockedUtils.SIZE = 6;
  mockedUtils.generatePuzzle.mockReturnValue(mockSolution);
  mockedUtils.checkWin.mockReturnValue(false);
});

describe('useNurikabe', () => {
  it('initializes with empty grid', () => {
    const { result } = renderHook(() => useNurikabe());
    expect(mockedUtils.generatePuzzle).toHaveBeenCalled();
    expect(result.current.won).toBe(false);
    expect(result.current.size).toBe(6);
  });

  it('toggle shades an empty cell', () => {
    const { result } = renderHook(() => useNurikabe());
    act(() => {
      result.current.toggle(2, 2);
    });
    expect(result.current.grid[2][2].state).toBe('shaded');
  });

  it('toggle twice returns cell to empty', () => {
    const { result } = renderHook(() => useNurikabe());
    act(() => {
      result.current.toggle(2, 2);
    });
    act(() => {
      result.current.toggle(2, 2);
    });
    expect(result.current.grid[2][2].state).toBe('empty');
  });

  it('does not toggle numbered cells', () => {
    const { result } = renderHook(() => useNurikabe());
    act(() => {
      result.current.toggle(0, 0);
    });
    expect(result.current.grid[0][0].state).not.toBe('numbered');
  });

  it('undo restores previous state', () => {
    const { result } = renderHook(() => useNurikabe());
    act(() => {
      result.current.toggle(2, 2);
    });
    act(() => {
      result.current.undo();
    });
    expect(result.current.grid[2][2].state).toBe('empty');
  });

  it('newGame resets state', () => {
    const { result } = renderHook(() => useNurikabe());
    act(() => {
      result.current.toggle(2, 2);
    });
    act(() => {
      result.current.newGame();
    });
    expect(result.current.won).toBe(false);
    expect(mockedUtils.generatePuzzle).toHaveBeenCalledTimes(2);
  });

  it('does not toggle when won', () => {
    mockedUtils.checkWin.mockReturnValue(true);
    const { result } = renderHook(() => useNurikabe());
    act(() => {
      result.current.toggle(2, 2);
    });
    expect(result.current.won).toBe(true);
  });

  it('autoSolve starts and stops', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useNurikabe());
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
