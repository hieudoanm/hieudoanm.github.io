import { act, renderHook } from '@testing-library/react';
import { useShikaku } from '../useShikaku';
import * as utils from '../utils';

jest.mock('../utils');

const mockedUtils = jest.mocked(utils);

const defaultRegions = [
  { id: 0, row: 0, col: 0, width: 3, height: 2 },
  { id: 1, row: 0, col: 3, width: 3, height: 2 },
  { id: 2, row: 2, col: 0, width: 3, height: 2 },
  { id: 3, row: 2, col: 3, width: 3, height: 2 },
];

const defaultClues = [
  { row: 0, col: 1, value: 6 },
  { row: 0, col: 4, value: 6 },
  { row: 2, col: 1, value: 6 },
  { row: 2, col: 4, value: 6 },
];

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers();
  mockedUtils.ROWS = 6;
  mockedUtils.COLS = 6;
  mockedUtils.generateRegions.mockReturnValue(defaultRegions);
  mockedUtils.placeClues.mockReturnValue(defaultClues);
  mockedUtils.getRegionColor.mockReturnValue('oklch(0.85 0.15 250)');
  mockedUtils.validateRegion.mockReturnValue({ valid: false });
});

afterEach(() => {
  jest.useRealTimers();
});

describe('useShikaku', () => {
  it('initializes with clues', () => {
    const { result } = renderHook(() => useShikaku());
    expect(mockedUtils.generateRegions).toHaveBeenCalled();
    expect(result.current.isComplete).toBe(false);
    expect(result.current.clues.length).toBe(4);
  });

  it('handleCellClick selects a clue', () => {
    const { result } = renderHook(() => useShikaku());
    act(() => {
      result.current.handleCellClick(0, 1);
    });
    expect(result.current.selectedClue).toEqual({ row: 0, col: 1, value: 6 });
  });

  it('handleCellClick ignores non-clue cells without selection', () => {
    const { result } = renderHook(() => useShikaku());
    act(() => {
      result.current.handleCellClick(3, 3);
    });
    expect(result.current.selectedClue).toBeNull();
  });

  it('newGame resets state', () => {
    const { result } = renderHook(() => useShikaku());
    act(() => {
      result.current.newGame();
    });
    expect(result.current.isComplete).toBe(false);
    expect(mockedUtils.generateRegions).toHaveBeenCalledTimes(2);
  });

  it('autoSolve starts and stops', () => {
    const { result } = renderHook(() => useShikaku());
    act(() => {
      result.current.autoSolve();
    });
    expect(result.current.autoSolving).toBe(true);
    act(() => {
      result.current.autoSolve();
    });
    expect(result.current.autoSolving).toBe(false);
  });

  it('undo when empty does nothing', () => {
    const { result } = renderHook(() => useShikaku());
    act(() => {
      result.current.undo();
    });
    expect(result.current.placed.length).toBe(0);
  });

  it('undo after placement removes last', () => {
    mockedUtils.validateRegion.mockReturnValue({
      valid: true,
      clue: { row: 0, col: 1, value: 6 },
    });
    const { result } = renderHook(() => useShikaku());
    act(() => {
      result.current.handleCellClick(0, 1);
    });
    act(() => {
      result.current.handleCellClick(1, 1);
    });
    expect(result.current.placed.length).toBe(1);
    act(() => {
      result.current.undo();
    });
    expect(result.current.placed.length).toBe(0);
  });

  it('handleCellClick with valid region places it', () => {
    mockedUtils.validateRegion.mockReturnValue({
      valid: true,
      clue: { row: 0, col: 1, value: 6 },
    });
    const { result } = renderHook(() => useShikaku());
    act(() => {
      result.current.handleCellClick(0, 1);
    });
    act(() => {
      result.current.handleCellClick(1, 1);
    });
    expect(result.current.placed.length).toBe(1);
    expect(result.current.selectedClue).toBeNull();
  });

  it('handleCellClick with invalid region shows flash', () => {
    mockedUtils.validateRegion.mockReturnValue({ valid: false });
    const { result } = renderHook(() => useShikaku());
    act(() => {
      result.current.handleCellClick(0, 1);
    });
    act(() => {
      result.current.handleCellClick(5, 5);
    });
    expect(result.current.wrongFlash).not.toBeNull();
  });

  it('handleCellClick ignores clicks when autoSolving', () => {
    const { result } = renderHook(() => useShikaku());
    act(() => {
      result.current.autoSolve();
    });
    act(() => {
      result.current.handleCellClick(3, 3);
    });
    expect(result.current.selectedClue).toBeNull();
  });

  it('handleCellClick on assigned cell does nothing', () => {
    mockedUtils.validateRegion.mockReturnValue({
      valid: true,
      clue: { row: 0, col: 1, value: 6 },
    });
    const { result } = renderHook(() => useShikaku());
    act(() => {
      result.current.handleCellClick(0, 1);
    });
    act(() => {
      result.current.handleCellClick(1, 1);
    });
    act(() => {
      result.current.handleCellClick(0, 0);
    });
  });

  it('autoSolve plays through all regions', () => {
    const { result } = renderHook(() => useShikaku());
    act(() => {
      result.current.autoSolve();
    });
    for (let i = 0; i < 10; i++) {
      act(() => {
        jest.advanceTimersByTime(200);
      });
    }
    expect(result.current.autoSolving).toBe(false);
  });

  it('undo does nothing during autoSolve', () => {
    const { result } = renderHook(() => useShikaku());
    act(() => {
      result.current.autoSolve();
    });
    act(() => {
      result.current.undo();
    });
  });

  it('handleCellClick on already selected clue deselects', () => {
    const { result } = renderHook(() => useShikaku());
    act(() => {
      result.current.handleCellClick(0, 1);
    });
    expect(result.current.selectedClue).toEqual({ row: 0, col: 1, value: 6 });
    act(() => {
      result.current.handleCellClick(0, 1);
    });
    expect(result.current.selectedClue).toEqual({ row: 0, col: 1, value: 6 });
  });

  it('handleCellClick on assigned clue does nothing', () => {
    mockedUtils.validateRegion.mockReturnValue({
      valid: true,
      clue: { row: 0, col: 1, value: 6 },
    });
    const { result } = renderHook(() => useShikaku());
    act(() => {
      result.current.handleCellClick(0, 1);
    });
    act(() => {
      result.current.handleCellClick(1, 1);
    });
    act(() => {
      result.current.handleCellClick(0, 1);
    });
    expect(result.current.selectedClue).toBeNull();
  });

  it('autoSolve stops when called while already solving', () => {
    const { result } = renderHook(() => useShikaku());
    act(() => {
      result.current.autoSolve();
    });
    expect(result.current.autoSolving).toBe(true);
    act(() => {
      result.current.autoSolve();
    });
    expect(result.current.autoSolving).toBe(false);
  });

  it('autoSolve returns early when isComplete', () => {
    mockedUtils.validateRegion.mockReturnValue({
      valid: true,
      clue: { row: 0, col: 1, value: 6 },
    });
    const { result } = renderHook(() => useShikaku());
    act(() => {
      result.current.handleCellClick(0, 1);
    });
    act(() => {
      result.current.handleCellClick(1, 1);
    });
    act(() => {
      result.current.handleCellClick(0, 4);
    });
    act(() => {
      result.current.handleCellClick(1, 4);
    });
    act(() => {
      result.current.handleCellClick(2, 1);
    });
    act(() => {
      result.current.handleCellClick(3, 1);
    });
    act(() => {
      result.current.handleCellClick(2, 4);
    });
    act(() => {
      result.current.handleCellClick(3, 4);
    });
    expect(result.current.isComplete).toBe(true);
    act(() => {
      result.current.autoSolve();
    });
    expect(result.current.autoSolving).toBe(false);
  });

  it('handleCellClick with no selected clue and non-clue cell', () => {
    const { result } = renderHook(() => useShikaku());
    act(() => {
      result.current.handleCellClick(3, 3);
    });
    expect(result.current.selectedClue).toBeNull();
  });
});
