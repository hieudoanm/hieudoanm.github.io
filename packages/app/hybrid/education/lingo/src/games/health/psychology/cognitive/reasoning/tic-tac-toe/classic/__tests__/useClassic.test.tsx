import { act, renderHook } from '@testing-library/react';
import { useClassic } from '../useClassic';

describe('useClassic', () => {
  it('starts on an empty board with X to move', () => {
    const { result } = renderHook(() => useClassic());
    expect(result.current.board).toHaveLength(9);
    expect(result.current.current).toBe('X');
    expect(result.current.moves).toHaveLength(0);
  });

  it('alternates turns as marks are placed', () => {
    const { result } = renderHook(() => useClassic());
    act(() => result.current.play(0));
    expect(result.current.current).toBe('O');
    act(() => result.current.play(4));
    expect(result.current.current).toBe('X');
  });

  it('ignores moves onto occupied cells', () => {
    const { result } = renderHook(() => useClassic());
    act(() => result.current.play(0));
    act(() => result.current.play(0));
    expect(result.current.current).toBe('O');
    expect(result.current.moves).toHaveLength(1);
  });

  it('locks the game after a win', () => {
    const { result } = renderHook(() => useClassic());
    for (const idx of [0, 3, 1, 4, 2]) {
      act(() => result.current.play(idx));
    }
    expect(result.current.winner?.player).toBe('X');
    const moveCount = result.current.moves.length;
    act(() => result.current.play(8));
    expect(result.current.moves).toHaveLength(moveCount);
  });

  it('undoes and resets the game', () => {
    const { result } = renderHook(() => useClassic());
    act(() => result.current.play(0));
    act(() => result.current.undo());
    expect(result.current.board[0]).toBeNull();
    act(() => result.current.play(8));
    act(() => result.current.reset());
    expect(result.current.board.every((cell) => cell === null)).toBe(true);
    expect(result.current.winner).toBeNull();
  });
});
