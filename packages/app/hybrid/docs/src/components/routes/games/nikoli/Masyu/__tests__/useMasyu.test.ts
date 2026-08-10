import { act, renderHook } from '@testing-library/react';
import { useMasyu } from '../useMasyu';
import * as utils from '../utils';

jest.mock('../utils');

const mockedUtils = jest.mocked(utils);

const mockSolution = Array.from({ length: 7 }, () => Array(7).fill(false));
mockSolution[2][2] = true;
mockSolution[2][3] = true;
mockSolution[2][4] = true;
mockSolution[3][4] = true;
mockSolution[4][4] = true;
mockSolution[4][3] = true;
mockSolution[4][2] = true;
mockSolution[3][2] = true;

const mockPearls = [
  { row: 2, col: 2, color: 'black' as const },
  { row: 4, col: 4, color: 'white' as const },
];

beforeEach(() => {
  jest.clearAllMocks();
  mockedUtils.SIZE = 7;
  mockedUtils.generatePuzzle.mockReturnValue({
    pearls: mockPearls,
    solution: mockSolution,
  });
  mockedUtils.checkWin.mockReturnValue(false);
});

describe('useMasyu', () => {
  it('initializes with empty grid', () => {
    const { result } = renderHook(() => useMasyu());
    expect(mockedUtils.generatePuzzle).toHaveBeenCalled();
    expect(result.current.won).toBe(false);
    expect(result.current.size).toBe(7);
    expect(result.current.grid).toHaveLength(7);
  });

  it('toggle marks a cell', () => {
    const { result } = renderHook(() => useMasyu());
    act(() => {
      result.current.toggle(2, 2);
    });
    expect(result.current.grid[2][2]).toBe(true);
  });

  it('toggle twice unmarks a cell', () => {
    const { result } = renderHook(() => useMasyu());
    act(() => {
      result.current.toggle(2, 2);
    });
    act(() => {
      result.current.toggle(2, 2);
    });
    expect(result.current.grid[2][2]).toBe(false);
  });

  it('undo restores previous state', () => {
    const { result } = renderHook(() => useMasyu());
    act(() => {
      result.current.toggle(2, 2);
    });
    act(() => {
      result.current.undo();
    });
    expect(result.current.grid[2][2]).toBe(false);
  });

  it('newGame resets state', () => {
    const { result } = renderHook(() => useMasyu());
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
    const { result } = renderHook(() => useMasyu());
    act(() => {
      result.current.toggle(2, 2);
    });
    expect(result.current.won).toBe(true);
  });

  it('autoSolve starts and stops', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useMasyu());
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
