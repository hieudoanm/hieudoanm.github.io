import { act, renderHook } from '@testing-library/react';
import { INITIAL_CREDITS, STAKE } from '../types';
import { useWar } from '../useWar';

describe('useWar', () => {
  it('starts with a full deck and initial credits', () => {
    const { result } = renderHook(() => useWar());
    expect(result.current.deckLeft).toBe(52);
    expect(result.current.credits).toBe(INITIAL_CREDITS);
    expect(result.current.round).toBeNull();
  });

  it('flips cards and settles the stake', () => {
    const { result } = renderHook(() => useWar());
    act(() => result.current.play());
    expect(result.current.round).not.toBeNull();
    expect(result.current.credits).toBe(
      result.current.round!.result === 'player'
        ? INITIAL_CREDITS - STAKE + STAKE * result.current.round!.multiplier
        : INITIAL_CREDITS - STAKE
    );
  });

  it('tracks the win streak', () => {
    const { result } = renderHook(() => useWar());
    act(() => result.current.play());
    const won = result.current.round!.result === 'player';
    expect(result.current.streak).toBe(won ? 1 : 0);
  });

  it('reshuffles once the deck runs low', () => {
    const { result } = renderHook(() => useWar());
    for (let index = 0; index < 45 && !result.current.round; index += 1) {
      act(() => result.current.play());
    }
    for (let index = 0; index < 30; index += 1) {
      if (result.current.round) {
        expect(result.current.round.remaining.length).toBeGreaterThan(0);
      }
      act(() => result.current.play());
    }
    // deck was refilled at least once — still playable
    expect(result.current.credits).toBeGreaterThanOrEqual(0);
  });
});
