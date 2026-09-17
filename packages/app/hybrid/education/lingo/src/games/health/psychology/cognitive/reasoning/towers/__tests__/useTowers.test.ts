import { act, renderHook } from '@testing-library/react';

import { useTowers } from '../useTowers';
import { isSolved } from '../utils';

describe('useTowers', () => {
  it('stacks every disk on the first peg', () => {
    const { result } = renderHook(() => useTowers());

    expect(result.current.towers[0]).toHaveLength(3);
    expect(result.current.moves).toBe(0);
    expect(result.current.par).toBe(7);
  });

  it('selects a peg holding a disk', () => {
    const { result } = renderHook(() => useTowers());

    act(() => result.current.select(0));

    expect(result.current.selected).toBe(0);
  });

  it('ignores a selection on an empty peg', () => {
    const { result } = renderHook(() => useTowers());

    act(() => result.current.select(1));

    expect(result.current.selected).toBeNull();
  });

  it('moves the top disk and counts the move', () => {
    const { result } = renderHook(() => useTowers());

    act(() => result.current.select(0));
    act(() => result.current.select(1));

    expect(result.current.towers[1]).toEqual([1]);
    expect(result.current.moves).toBe(1);
    expect(result.current.selected).toBeNull();
  });

  it('rejects an illegal drop and flags the peg', () => {
    const { result } = renderHook(() => useTowers());

    act(() => result.current.select(0));
    act(() => result.current.select(2));
    expect(result.current.towers).toEqual([[3, 2], [], [1]]);

    act(() => result.current.select(0));
    act(() => result.current.select(2));

    expect(result.current.towers).toEqual([[3, 2], [], [1]]);
    expect(result.current.shakeTower).toBe(2);
  });

  it('marks valid targets while a disk is held', () => {
    const { result } = renderHook(() => useTowers());

    act(() => result.current.select(0));

    expect(result.current.isTarget(1)).toBe(true);
    expect(result.current.isTarget(0)).toBe(false);
  });

  it('undoes and redoes a move', () => {
    const { result } = renderHook(() => useTowers());

    act(() => result.current.select(0));
    act(() => result.current.select(1));
    expect(result.current.canUndo).toBe(true);

    act(() => result.current.undo());
    expect(result.current.towers[0]).toEqual([3, 2, 1]);
    expect(result.current.canRedo).toBe(true);

    act(() => result.current.redo());
    expect(result.current.towers[1]).toEqual([1]);
  });

  it('does nothing when there is nothing to undo', () => {
    const { result } = renderHook(() => useTowers());

    act(() => result.current.undo());

    expect(result.current.moves).toBe(0);
    expect(result.current.canUndo).toBe(false);
  });

  it('resets to a new disk count', () => {
    const { result } = renderHook(() => useTowers());

    act(() => result.current.reset(5));

    expect(result.current.diskCount).toBe(5);
    expect(result.current.towers[0]).toHaveLength(5);
    expect(result.current.moves).toBe(0);
  });

  it('reaches the optimum with the automatic solution', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useTowers());

    act(() => result.current.startAutoSolve());
    expect(result.current.autoPlaying).toBe(true);

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.autoPlaying).toBe(false);
    expect(isSolved(result.current.towers, 3)).toBe(true);
    jest.useRealTimers();
  });

  it('stops the automatic solution part way through', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useTowers());

    act(() => result.current.startAutoSolve());
    act(() => {
      jest.advanceTimersByTime(500);
    });
    act(() => result.current.stopAutoSolve());

    expect(result.current.autoPlaying).toBe(false);
    expect(isSolved(result.current.towers, 3)).toBe(false);
    jest.useRealTimers();
  });
});
