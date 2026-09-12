import { act, renderHook } from '@testing-library/react';
import { INITIAL_CREDITS, STAKE } from '../types';
import { useBaccarat } from '../useBaccarat';

describe('useBaccarat', () => {
  it('starts in the betting phase with full credits', () => {
    const { result } = renderHook(() => useBaccarat());
    expect(result.current.phase).toBe('bet');
    expect(result.current.credits).toBe(INITIAL_CREDITS);
    expect(result.current.bet).toBeNull();
  });

  it('does not deal without a selected bet', () => {
    const { result } = renderHook(() => useBaccarat());
    act(() => result.current.deal());
    expect(result.current.phase).toBe('bet');
  });

  it('deals a round and settles the chosen bet', () => {
    const { result } = renderHook(() => useBaccarat());
    act(() => result.current.selectBet('player'));
    act(() => result.current.deal());
    expect(result.current.phase).toBe('result');
    expect(result.current.playerHand.length).toBeGreaterThanOrEqual(2);
    expect(result.current.bankerHand.length).toBeGreaterThanOrEqual(2);
    const expected =
      result.current.result === 'player'
        ? INITIAL_CREDITS - STAKE + 20
        : INITIAL_CREDITS - STAKE;
    expect(result.current.credits).toBe(expected);
  });

  it('returns to the betting phase on next round', () => {
    const { result } = renderHook(() => useBaccarat());
    act(() => result.current.selectBet('banker'));
    act(() => result.current.deal());
    act(() => result.current.nextRound());
    expect(result.current.phase).toBe('bet');
    expect(result.current.bet).toBeNull();
    expect(result.current.playerHand).toHaveLength(0);
  });
});
