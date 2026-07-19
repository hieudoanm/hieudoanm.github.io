import { act, renderHook } from '@testing-library/react';

import { initialDifficulty } from '../constants';
import { useLightsOut } from '../useLightsOut';
import { isSolved } from '../utils';

describe('useLightsOut', () => {
  it('starts on a board of the default size with no moves', () => {
    const { result } = renderHook(() => useLightsOut());

    expect(result.current.board).toHaveLength(initialDifficulty.size);
    expect(result.current.moves).toBe(0);
    expect(result.current.solved).toBe(false);
    expect(result.current.par).toBe(initialDifficulty.moves);
  });

  it('counts a move and flips cells on press', () => {
    const { result } = renderHook(() => useLightsOut());
    const before = result.current.board[0][0];

    act(() => result.current.handleClick(0, 0));

    expect(result.current.moves).toBe(1);
    expect(result.current.board[0][0]).toBe(!before);
  });

  it('locks input once the puzzle is solved', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useLightsOut());

    act(() => result.current.toggleAutoSolve());
    act(() => {
      jest.runAllTimers();
    });

    const movesWhenSolved = result.current.moves;
    act(() => result.current.handleClick(0, 0));

    expect(result.current.solved).toBe(true);
    expect(result.current.moves).toBe(movesWhenSolved);
    jest.useRealTimers();
  });

  it('starts a new board on every new game', () => {
    const { result } = renderHook(() => useLightsOut());
    const board = result.current.board;

    act(() => result.current.handleClick(0, 0));
    act(() => result.current.newGame());

    expect(result.current.board).not.toBe(board);
  });

  it('reaches an all-dark board once the solution is played out', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useLightsOut());

    act(() => result.current.toggleAutoSolve());
    act(() => {
      jest.runAllTimers();
    });

    expect(isSolved(result.current.board)).toBe(true);
    expect(result.current.lit).toBe(0);
    jest.useRealTimers();
  });

  it('starts a fresh puzzle with moves reset to zero', () => {
    const { result } = renderHook(() => useLightsOut());

    act(() => result.current.handleClick(1, 1));
    act(() => result.current.newGame());

    expect(result.current.moves).toBe(0);
    expect(result.current.solved).toBe(false);
    expect(result.current.autoSolving).toBe(false);
  });

  it('switches size and par when a difficulty is requested', () => {
    const { result } = renderHook(() => useLightsOut());

    act(() => result.current.newGame(4, 6));

    expect(result.current.board).toHaveLength(4);
    expect(result.current.par).toBe(6);
  });

  it('plays the solution to completion when auto solve starts', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useLightsOut());

    act(() => result.current.toggleAutoSolve());
    expect(result.current.autoSolving).toBe(true);

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.autoSolving).toBe(false);
    expect(isSolved(result.current.board)).toBe(true);
    jest.useRealTimers();
  });

  it('stops an in-flight auto solve on request', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useLightsOut());

    act(() => result.current.toggleAutoSolve());
    act(() => result.current.toggleAutoSolve());

    expect(result.current.autoSolving).toBe(false);
    jest.useRealTimers();
  });
});
