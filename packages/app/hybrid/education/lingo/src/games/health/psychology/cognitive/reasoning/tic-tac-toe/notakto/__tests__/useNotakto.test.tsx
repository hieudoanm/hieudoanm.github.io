import { act, renderHook } from '@testing-library/react';
import { useNotakto } from '../useNotakto';

describe('useNotakto', () => {
  it('alternates between player 1 and 2', () => {
    const { result } = renderHook(() => useNotakto());
    expect(result.current.current).toBe(1);
    act(() => result.current.play(0));
    expect(result.current.current).toBe(2);
    act(() => result.current.play(4));
    expect(result.current.current).toBe(1);
  });

  it('ends the game when a line is completed and keeps the loser as current', () => {
    const { result } = renderHook(() => useNotakto());
    for (const idx of [0, 3, 1, 4, 2]) {
      act(() => result.current.play(idx));
    }
    expect(result.current.loserCells).toEqual([0, 1, 2]);
    expect(result.current.current).toBe(1);
  });

  it('undoes moves and resets', () => {
    const { result } = renderHook(() => useNotakto());
    act(() => result.current.play(8));
    act(() => result.current.undo());
    expect(result.current.moves).toHaveLength(0);
    act(() => result.current.reset());
    expect(result.current.board.every((cell) => cell === null)).toBe(true);
  });
});
