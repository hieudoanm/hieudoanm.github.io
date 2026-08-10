import { act, renderHook } from '@testing-library/react';
import { useShikaku } from '../useShikaku';
import * as utils from '../utils';

jest.mock('../utils');

const mockedUtils = jest.mocked(utils);

beforeEach(() => {
  jest.clearAllMocks();
  mockedUtils.ROWS = 6;
  mockedUtils.COLS = 6;
  mockedUtils.generateRegions.mockReturnValue([
    { id: 0, row: 0, col: 0, width: 3, height: 2 },
    { id: 1, row: 0, col: 3, width: 3, height: 2 },
    { id: 2, row: 2, col: 0, width: 3, height: 2 },
    { id: 3, row: 2, col: 3, width: 3, height: 2 },
  ]);
  mockedUtils.placeClues.mockReturnValue([
    { row: 0, col: 1, value: 6 },
    { row: 0, col: 4, value: 6 },
    { row: 2, col: 1, value: 6 },
    { row: 2, col: 4, value: 6 },
  ]);
  mockedUtils.getRegionColor.mockReturnValue('oklch(0.85 0.15 250)');
  mockedUtils.validateRegion.mockReturnValue({ valid: false });
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
    expect(result.current.selectedClue).toEqual({
      row: 0,
      col: 1,
      value: 6,
    });
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
    jest.useFakeTimers();
    const { result } = renderHook(() => useShikaku());
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
