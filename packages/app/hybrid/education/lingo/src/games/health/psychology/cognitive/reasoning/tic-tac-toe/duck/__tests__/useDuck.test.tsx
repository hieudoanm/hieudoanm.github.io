import { act, renderHook } from '@testing-library/react';
import { useDuck } from '../useDuck';

describe('useDuck', () => {
  it('routes clicks through mark then duck phase', () => {
    const { result } = renderHook(() => useDuck());
    act(() => result.current.play(0));
    expect(result.current.phase).toBe('duck');
    act(() => result.current.play(4));
    expect(result.current.phase).toBe('mark');
    expect(result.current.duck).toBe(4);
    expect(result.current.moves).toHaveLength(1);
  });

  it('blocks play once a winner is declared', () => {
    const { result } = renderHook(() => useDuck());
    for (const [mark, duck] of [
      [0, 8],
      [2, 7],
      [3, 5],
      [1, 4],
    ] as [number, number][]) {
      act(() => result.current.play(mark));
      act(() => result.current.play(duck));
    }
    act(() => result.current.play(6));
    expect(result.current.winner?.player).toBe('X');
    const count = result.current.moves.length;
    act(() => result.current.play(8));
    expect(result.current.moves).toHaveLength(count);
  });

  it('undoes across the two phases and resets', () => {
    const { result } = renderHook(() => useDuck());
    act(() => result.current.play(2));
    act(() => result.current.undo());
    expect(result.current.pendingMark).toBeNull();
    act(() => result.current.play(2));
    act(() => result.current.play(8));
    act(() => result.current.reset());
    expect(result.current.duck).toBeNull();
    expect(result.current.moves).toHaveLength(0);
  });
});
