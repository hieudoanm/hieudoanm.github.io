import { act, renderHook } from '@testing-library/react';
import { useT3 } from '../useT3';

describe('useT3', () => {
  it('alternates turns and keeps at most three marks per player', () => {
    const { result } = renderHook(() => useT3());
    for (const idx of [0, 3, 1, 4, 2, 5]) {
      act(() => result.current.play(idx));
    }
    expect(result.current.winner?.player).toBe('X');
    expect(result.current.history.X).toEqual([0, 1, 2]);
  });

  it('undoes and resets', () => {
    const { result } = renderHook(() => useT3());
    act(() => result.current.play(8));
    act(() => result.current.undo());
    expect(result.current.moves).toHaveLength(0);
    act(() => result.current.play(6));
    act(() => result.current.reset());
    expect(result.current.board.every((cell) => cell === null)).toBe(true);
  });
});
