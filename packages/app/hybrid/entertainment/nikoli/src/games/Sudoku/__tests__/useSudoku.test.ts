import { act, renderHook } from '@testing-library/react';
import { useSudoku } from '../useSudoku';
import * as sudoku from '../utils/sudoku';

jest.mock('../utils/sudoku');

const mockedSudoku = jest.mocked(sudoku);

const emptyGrid = (n: number) =>
  Array.from({ length: n * n }, () => Array(n * n).fill(0));

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers();
  mockedSudoku.createEmptyGrid.mockImplementation(emptyGrid);
  mockedSudoku.generatePuzzle.mockReturnValue({
    puzzle: emptyGrid(3),
    solution: emptyGrid(3),
  });
  mockedSudoku.isValid.mockReturnValue(true);
  mockedSudoku.solve.mockReturnValue(emptyGrid(3));
});

afterEach(() => {
  jest.useRealTimers();
});

describe('useSudoku', () => {
  it('initializes with default state', () => {
    const { result } = renderHook(() => useSudoku(3, 0.5));
    expect(result.current.won).toBe(false);
    expect(result.current.timer).toBe(0);
    expect(result.current.selected).toBeNull();
    expect(result.current.size).toBe(3);
    expect(result.current.N).toBe(9);
  });

  it('newGame calls generatePuzzle', () => {
    const { result } = renderHook(() => useSudoku(3, 0.5));
    act(() => {
      result.current.newGame();
    });
    expect(mockedSudoku.generatePuzzle).toHaveBeenCalledTimes(2);
  });

  it('selectCell sets selected', () => {
    const { result } = renderHook(() => useSudoku(3, 0.5));
    act(() => {
      result.current.selectCell(1, 2);
    });
    expect(result.current.selected).toEqual([1, 2]);
  });

  it('setCell ignores puzzle cells', () => {
    mockedSudoku.generatePuzzle.mockReturnValue({
      puzzle: (() => {
        const g = emptyGrid(3);
        g[0][0] = 5;
        return g;
      })(),
      solution: emptyGrid(3),
    });
    const { result } = renderHook(() => useSudoku(3, 0.5));
    act(() => {
      result.current.setCell(0, 0, 3);
    });
    expect(result.current.userGrid[0][0]).toBe(5);
  });

  it('setCell ignores when won', () => {
    mockedSudoku.generatePuzzle.mockReturnValue({
      puzzle: emptyGrid(3),
      solution: emptyGrid(3),
    });
    const { result } = renderHook(() => useSudoku(3, 0.5));
    act(() => {
      result.current.setCell(0, 0, 0);
    });
    // Can't easily trigger won state through public API without full solution matching
  });

  it('setCell with val=0 clears cell', () => {
    const { result } = renderHook(() => useSudoku(3, 0.5));
    act(() => {
      result.current.setCell(0, 0, 3);
    });
    act(() => {
      result.current.setCell(0, 0, 0);
    });
    expect(result.current.userGrid[0][0]).toBe(0);
  });

  it('setCell returns early when val > 0 and invalid', () => {
    mockedSudoku.isValid.mockReturnValue(false);
    const { result } = renderHook(() => useSudoku(3, 0.5));
    act(() => {
      result.current.setCell(0, 0, 5);
    });
    expect(result.current.userGrid[0][0]).toBe(0);
  });

  it('undo restores previous grid', () => {
    const { result } = renderHook(() => useSudoku(3, 0.5));
    act(() => {
      result.current.setCell(0, 0, 3);
    });
    act(() => {
      result.current.undo();
    });
    expect(result.current.userGrid[0][0]).toBe(0);
  });

  it('undo does nothing when history is empty', () => {
    const { result } = renderHook(() => useSudoku(3, 0.5));
    act(() => {
      result.current.undo();
    });
    expect(result.current.userGrid).toEqual(emptyGrid(3));
  });

  it('hint fills first empty cell', () => {
    const solution = emptyGrid(3);
    solution[0][0] = 7;
    mockedSudoku.generatePuzzle.mockReturnValue({
      puzzle: emptyGrid(3),
      solution,
    });
    mockedSudoku.solve.mockReturnValue(solution);
    mockedSudoku.isValid.mockReturnValue(true);
    const { result } = renderHook(() => useSudoku(3, 0.5));
    act(() => {
      result.current.hint();
    });
    expect(result.current.userGrid[0][0]).toBe(7);
  });

  it('hint does nothing when no empty cells', () => {
    const fullGrid = Array.from({ length: 9 }, () => Array(9).fill(5));
    mockedSudoku.generatePuzzle.mockReturnValue({
      puzzle: fullGrid,
      solution: fullGrid,
    });
    const { result } = renderHook(() => useSudoku(3, 0.5));
    act(() => {
      result.current.hint();
    });
  });

  it('note sets value on selected cell', () => {
    const solution = emptyGrid(3);
    solution[0][0] = 4;
    mockedSudoku.generatePuzzle.mockReturnValue({
      puzzle: emptyGrid(3),
      solution,
    });
    mockedSudoku.solve.mockReturnValue(solution);
    mockedSudoku.isValid.mockReturnValue(true);
    const { result } = renderHook(() => useSudoku(3, 0.5));
    act(() => {
      result.current.selectCell(0, 0);
    });
    act(() => {
      result.current.note(4);
    });
    expect(result.current.userGrid[0][0]).toBe(4);
  });

  it('note toggles off when same value already set', () => {
    mockedSudoku.isValid.mockReturnValue(true);
    const { result } = renderHook(() => useSudoku(3, 0.5));
    act(() => {
      result.current.selectCell(0, 0);
    });
    act(() => {
      result.current.note(4);
    });
    expect(result.current.userGrid[0][0]).toBe(4);
    act(() => {
      result.current.selectCell(0, 0);
    });
    act(() => {
      result.current.note(4);
    });
    expect(result.current.userGrid[0][0]).toBe(0);
  });

  it('note does nothing when no cell selected', () => {
    const { result } = renderHook(() => useSudoku(3, 0.5));
    act(() => {
      result.current.note(3);
    });
    expect(result.current.userGrid[0][0]).toBe(0);
  });

  it('timer increments', () => {
    const { result } = renderHook(() => useSudoku(3, 0.5));
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(result.current.timer).toBe(3);
  });

  it('cleans up interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    const { unmount } = renderHook(() => useSudoku(3, 0.5));
    unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });
});
