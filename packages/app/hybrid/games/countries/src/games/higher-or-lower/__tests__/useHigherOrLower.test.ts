import { act, renderHook } from '@testing-library/react';
import { useHigherOrLower } from '../useHigherOrLower';

describe('useHigherOrLower', () => {
  it('starts with a pair and clean stats', () => {
    const { result } = renderHook(() => useHigherOrLower());
    expect(result.current.pair.left.name).not.toBe(
      result.current.pair.right.name
    );
    expect(result.current.revealed).toBe(false);
    expect(result.current.games).toBe(0);
    expect(result.current.message).toBeNull();
  });

  it('scores, counts games and reveals populations on a correct pick', () => {
    const { result } = renderHook(() => useHigherOrLower());
    const { leftPop, rightPop } = result.current;
    act(() => {
      result.current.guess(leftPop >= rightPop ? 'left' : 'right');
    });
    expect(result.current.stats.score).toBe(1);
    expect(result.current.games).toBe(1);
    expect(result.current.revealed).toBe(true);
    expect(result.current.message?.correct).toBe(true);
  });

  it('resets the streak on a wrong pick', () => {
    const { result } = renderHook(() => useHigherOrLower());
    const { leftPop, rightPop } = result.current;
    act(() => {
      result.current.guess(leftPop >= rightPop ? 'left' : 'right');
    });
    act(() => {
      result.current.next();
    });
    const next = result.current;
    act(() => {
      result.current.guess(next.leftPop >= next.rightPop ? 'right' : 'left');
    });
    expect(result.current.message?.correct).toBe(false);
    expect(result.current.stats.streak).toBe(0);
    expect(result.current.games).toBe(2);
  });

  it('ignores guesses once revealed', () => {
    const { result } = renderHook(() => useHigherOrLower());
    act(() => {
      result.current.guess('left');
    });
    const gamesAfterFirst = result.current.games;
    act(() => {
      result.current.guess('right');
    });
    expect(result.current.games).toBe(gamesAfterFirst);
  });

  it('next deals a fresh pair and hides feedback', () => {
    const { result } = renderHook(() => useHigherOrLower());
    act(() => {
      result.current.guess('left');
    });
    act(() => {
      result.current.next();
    });
    expect(result.current.revealed).toBe(false);
    expect(result.current.message).toBeNull();
  });
});
