import { act, renderHook } from '@testing-library/react';
import { useWild } from '../useWild';

describe('useWild', () => {
  it('defaults to mark X for player 1', () => {
    const { result } = renderHook(() => useWild());
    expect(result.current.selectedMark).toBe('X');
    act(() => result.current.play(0));
    expect(result.current.board[0]).toBe('X');
  });

  it('switches the selected mark on demand', () => {
    const { result } = renderHook(() => useWild());
    act(() => result.current.chooseMark('O'));
    expect(result.current.selectedMark).toBe('O');
    act(() => result.current.play(4));
    expect(result.current.board[4]).toBe('O');
  });

  it('ends the game when either mark lines up', () => {
    const { result } = renderHook(() => useWild());
    // both players cooperate to line up O on column 1-4-7
    for (const idx of [1, 4, 7]) {
      act(() => result.current.chooseMark('O'));
      act(() => result.current.play(idx));
    }
    expect(result.current.winner?.player).toBe('O');
    const count = result.current.moves.length;
    act(() => result.current.play(0));
    expect(result.current.moves).toHaveLength(count);
  });
});
