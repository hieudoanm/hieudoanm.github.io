import { act, renderHook } from '@testing-library/react';
import { useCardCounter } from '../useCardCounter';

describe('useCardCounter', () => {
  it('starts with a full deck and zero count', () => {
    const { result } = renderHook(() => useCardCounter());
    expect(result.current.deck).toHaveLength(52);
    expect(result.current.cardsLeft).toBe(52);
    expect(result.current.count).toBe(0);
    expect(result.current.current).toBeNull();
    expect(result.current.done).toBe(false);
  });

  it('deals cards and accumulates the running count', () => {
    const { result } = renderHook(() => useCardCounter());
    act(() => result.current.deal());
    const first = result.current.current!;
    expect(result.current.cardsLeft).toBe(51);
    expect(result.current.count).toBe(first.value);
    expect(result.current.revealed).toBe(false);
    act(() => result.current.reveal());
    expect(result.current.revealed).toBe(true);
  });

  it('marks the session done when the deck is exhausted', () => {
    const { result } = renderHook(() => useCardCounter());
    for (let index = 0; index < 52; index += 1) {
      act(() => result.current.deal());
    }
    expect(result.current.cardsLeft).toBe(0);
    act(() => result.current.deal());
    expect(result.current.done).toBe(true);
    expect(result.current.current).toBeNull();
    act(() => result.current.deal());
    expect(result.current.done).toBe(true);
  });

  it('resets to a fresh deck', () => {
    const { result } = renderHook(() => useCardCounter());
    act(() => result.current.deal());
    act(() => result.current.reset());
    expect(result.current.deck).toHaveLength(52);
    expect(result.current.count).toBe(0);
    expect(result.current.current).toBeNull();
    expect(result.current.done).toBe(false);
  });
});
