import { act, renderHook } from '@testing-library/react';
import { useLightsOut } from '../useLightsOut';
import * as utils from '../utils';

jest.mock('../utils');

const mockedUtils = jest.mocked(utils);

beforeEach(() => {
  jest.clearAllMocks();
  mockedUtils.generatePuzzle.mockReturnValue({
    board: [
      [false, true, false, true, false],
      [true, true, false, false, true],
      [false, false, false, false, false],
      [true, false, false, true, false],
      [false, true, false, false, false],
    ],
    solution: [
      [2, 2],
      [0, 1],
      [4, 1],
    ],
  });
  mockedUtils.isSolved.mockReturnValue(false);
  mockedUtils.createBoard.mockReturnValue(
    Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => false))
  );
  mockedUtils.toggleCell.mockImplementation(
    (board: boolean[][], row: number, col: number) => {
      const next = board.map((r) => [...r]);
      next[row][col] = !next[row][col];
      return next;
    }
  );
});

describe('useLightsOut', () => {
  it('starts a new game on mount', () => {
    const { result } = renderHook(() => useLightsOut());
    expect(mockedUtils.generatePuzzle).toHaveBeenCalledWith(5);
    expect(result.current.solved).toBe(false);
  });

  it('handleClick toggles cell', () => {
    const { result } = renderHook(() => useLightsOut());
    act(() => {
      result.current.handleClick(2, 2);
    });
    expect(result.current.movesCount).toBe(1);
    expect(mockedUtils.toggleCell).toHaveBeenCalled();
  });

  it('ignores click when solved', () => {
    mockedUtils.isSolved.mockReturnValue(true);
    const { result } = renderHook(() => useLightsOut());
    act(() => {
      result.current.handleClick(2, 2);
    });
    expect(result.current.solved).toBe(true);
    expect(result.current.movesCount).toBe(1);

    act(() => {
      result.current.handleClick(0, 0);
    });
    expect(result.current.movesCount).toBe(1);
  });

  it('startAutoSolve replays solution in reverse', async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useLightsOut());
    act(() => {
      result.current.startAutoSolve();
    });
    expect(result.current.autoSolving).toBe(true);
    act(() => {
      jest.advanceTimersByTime(600);
    });
    expect(result.current.autoSolving).toBe(false);
    jest.useRealTimers();
  });

  it('newGame resets board', () => {
    const { result } = renderHook(() => useLightsOut());
    act(() => {
      result.current.handleClick(2, 2);
    });
    act(() => {
      result.current.newGame();
    });
    expect(result.current.movesCount).toBe(0);
    expect(mockedUtils.generatePuzzle).toHaveBeenCalledTimes(2);
  });
});
