import { act, renderHook } from '@testing-library/react';
import { useReverse } from '../useReverse';

describe('useReverse', () => {
  it('alternates turns', () => {
    const { result } = renderHook(() => useReverse());
    act(() => result.current.play(0));
    expect(result.current.current).toBe('O');
  });

  it('locks the game once someone loses', () => {
    const { result } = renderHook(() => useReverse());
    for (const idx of [0, 3, 1, 4, 2]) {
      act(() => result.current.play(idx));
    }
    expect(result.current.loser?.player).toBe('X');
    const count = result.current.moves.length;
    act(() => result.current.play(8));
    expect(result.current.moves).toHaveLength(count);
  });

  it('undoes and resets cleanly', () => {
    const { result } = renderHook(() => useReverse());
    act(() => result.current.play(0));
    act(() => result.current.play(1));
    act(() => result.current.undo());
    expect(result.current.moves).toHaveLength(1);
    act(() => result.current.reset());
    expect(result.current.moves).toHaveLength(0);
    expect(result.current.loser).toBeNull();
  });
});
