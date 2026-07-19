import { renderHook, act } from '@testing-library/react';
import { useEvalHistory } from '../useEvalHistory';

describe('useEvalHistory', () => {
  const baseOpts = {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: [
      {
        san: 'e4',
        fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
      },
    ],
    depth: 3,
  };

  it('starts with null points and not busy', () => {
    const { result } = renderHook(() => useEvalHistory(baseOpts));
    expect(result.current.points).toBeNull();
    expect(result.current.busy).toBe(false);
  });

  it('computes eval points', () => {
    const { result } = renderHook(() => useEvalHistory(baseOpts));
    act(() => result.current.compute());
    expect(result.current.points).not.toBeNull();
    expect(result.current.points).toHaveLength(2);
    expect(result.current.points![0].san).toBe('Start');
    expect(result.current.points![1].san).toBe('e4');
  });

  it('computes with empty moves', () => {
    const { result } = renderHook(() =>
      useEvalHistory({ ...baseOpts, moves: [] })
    );
    act(() => result.current.compute());
    expect(result.current.points).toHaveLength(1);
    expect(result.current.points![0].san).toBe('Start');
  });
});
