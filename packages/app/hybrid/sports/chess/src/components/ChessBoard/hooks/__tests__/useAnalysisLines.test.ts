import { renderHook, act } from '@testing-library/react';
import { useAnalysisLines } from '../useAnalysisLines';
import { createGame } from '@chess/ts';

describe('useAnalysisLines', () => {
  const getGame = () => createGame();

  it('starts with null lines and not busy', () => {
    const { result } = renderHook(() =>
      useAnalysisLines({ getGame, depth: 3 })
    );
    expect(result.current.lines).toBeNull();
    expect(result.current.busy).toBe(false);
  });

  it('computes analysis lines', () => {
    const { result } = renderHook(() =>
      useAnalysisLines({ getGame, depth: 3 })
    );
    act(() => result.current.analyze());
    expect(result.current.lines).not.toBeNull();
    expect(result.current.lines!.length).toBeLessThanOrEqual(3);
    expect(result.current.lines![0].san).toBeTruthy();
    expect(result.current.lines![0].move).toBeDefined();
  });

  it('marks busy during computation', () => {
    const { result } = renderHook(() =>
      useAnalysisLines({ getGame, depth: 3 })
    );
    act(() => result.current.analyze());
    expect(result.current.busy).toBe(false);
  });
});
