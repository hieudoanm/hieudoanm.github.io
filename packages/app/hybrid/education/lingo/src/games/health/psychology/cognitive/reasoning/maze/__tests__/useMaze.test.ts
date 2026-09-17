import { act, renderHook } from '@testing-library/react';

import { DEFAULT_SIZE } from '../constants';
import { useMaze } from '../useMaze';

describe('useMaze', () => {
  it('starts with a grid of the default size', () => {
    const { result } = renderHook(() => useMaze());

    expect(result.current.grid).toHaveLength(DEFAULT_SIZE);
    expect(result.current.size).toBe(DEFAULT_SIZE);
    expect(result.current.path).toEqual([]);
    expect(result.current.solved).toBe(false);
  });

  it('places the endpoints in opposite corners', () => {
    const { result } = renderHook(() => useMaze());

    expect(result.current.start).toEqual({ row: 0, col: 0 });
    expect(result.current.end).toEqual({
      row: DEFAULT_SIZE - 1,
      col: DEFAULT_SIZE - 1,
    });
  });

  it('rebuilds the grid on a new maze', () => {
    const { result } = renderHook(() => useMaze());
    const before = result.current.grid;

    act(() => result.current.newMaze());

    expect(result.current.grid).not.toBe(before);
    expect(result.current.path).toEqual([]);
  });

  it('builds a grid matching the requested size', () => {
    const { result } = renderHook(() => useMaze());

    act(() => result.current.newMaze(5));

    expect(result.current.size).toBe(5);
    expect(result.current.grid).toHaveLength(5);
    expect(result.current.end).toEqual({ row: 4, col: 4 });
  });

  it('reveals the whole path when solving runs to completion', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useMaze());

    act(() => result.current.toggleSolve());
    expect(result.current.solving).toBe(true);

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.solving).toBe(false);
    expect(result.current.solved).toBe(true);
    expect(result.current.revealed).toBe(result.current.path.length);
    jest.useRealTimers();
  });

  it('stops part way through the path', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useMaze());

    act(() => result.current.toggleSolve());
    act(() => {
      jest.advanceTimersByTime(60);
    });
    act(() => result.current.toggleSolve());

    expect(result.current.solving).toBe(false);
    expect(result.current.solved).toBe(false);
    jest.useRealTimers();
  });

  it('clears a solved path when a new maze is generated', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useMaze());

    act(() => result.current.toggleSolve());
    act(() => {
      jest.runAllTimers();
    });
    act(() => result.current.newMaze());

    expect(result.current.path).toEqual([]);
    expect(result.current.revealed).toBe(0);
    jest.useRealTimers();
  });
});
