import { act, renderHook } from '@testing-library/react';
import { useHeyawake } from '../useHeyawake';
import * as utils from '../utils';

jest.mock('../utils');

const mockedUtils = jest.mocked(utils);

const mockGrid = Array.from({ length: 6 }, () =>
  Array.from({ length: 6 }, () => ({ shaded: false, roomId: 0 }))
);

const mockSolution = Array.from({ length: 6 }, () =>
  Array.from({ length: 6 }, () => ({ shaded: false, roomId: 0 }))
);
mockSolution[0][0].shaded = true;
mockSolution[0][1].shaded = true;

const mockRooms = [
  {
    id: 0,
    cells: [[0, 0] as [number, number], [0, 1] as [number, number]],
    clue: 1,
  },
  {
    id: 1,
    cells: [
      [0, 2] as [number, number],
      [0, 3] as [number, number],
      [1, 2] as [number, number],
    ],
    clue: 0,
  },
];

beforeEach(() => {
  jest.clearAllMocks();
  mockedUtils.SIZE = 6;
  mockedUtils.generatePuzzle.mockReturnValue({
    grid: mockSolution,
    rooms: mockRooms,
  });
  mockedUtils.checkWin.mockReturnValue(false);
});

describe('useHeyawake', () => {
  it('initializes with empty grid', () => {
    const { result } = renderHook(() => useHeyawake());
    expect(mockedUtils.generatePuzzle).toHaveBeenCalled();
    expect(result.current.won).toBe(false);
    expect(result.current.size).toBe(6);
  });

  it('toggle shades a cell', () => {
    const { result } = renderHook(() => useHeyawake());
    act(() => {
      result.current.toggle(0, 0);
    });
    expect(result.current.grid[0][0].shaded).toBe(true);
  });

  it('toggle twice unshades a cell', () => {
    const { result } = renderHook(() => useHeyawake());
    act(() => {
      result.current.toggle(0, 0);
    });
    act(() => {
      result.current.toggle(0, 0);
    });
    expect(result.current.grid[0][0].shaded).toBe(false);
  });

  it('undo restores previous state', () => {
    const { result } = renderHook(() => useHeyawake());
    act(() => {
      result.current.toggle(0, 0);
    });
    act(() => {
      result.current.undo();
    });
    expect(result.current.grid[0][0].shaded).toBe(false);
  });

  it('newGame resets state', () => {
    const { result } = renderHook(() => useHeyawake());
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
    mockedUtils.checkWin.mockReturnValue(true);
    const { result } = renderHook(() => useHeyawake());
    act(() => {
      result.current.toggle(0, 0);
    });
    expect(result.current.won).toBe(true);
  });

  it('autoSolve starts and stops', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useHeyawake());
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
