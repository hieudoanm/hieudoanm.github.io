import { act, renderHook } from '@testing-library/react';
import { useHigherOrLower } from '../useHigherOrLower';
import type { HLQuestion } from '../types';

const leftWins = (question: HLQuestion): boolean =>
  question.mode === 'passport'
    ? question.leftValue <= question.rightValue
    : question.leftValue >= question.rightValue;

describe('useHigherOrLower', () => {
  it('starts with a population pair and clean stats', () => {
    const { result } = renderHook(() => useHigherOrLower());
    expect(result.current.mode).toBe('population');
    expect(result.current.question.pair.left.name).not.toBe(
      result.current.question.pair.right.name
    );
    expect(result.current.revealed).toBe(false);
    expect(result.current.games).toBe(0);
    expect(result.current.message).toBeNull();
  });

  it('scores, counts games and reveals on a correct pick', () => {
    const { result } = renderHook(() => useHigherOrLower());
    act(() => {
      result.current.guess(
        leftWins(result.current.question) ? 'left' : 'right'
      );
    });
    expect(result.current.stats.score).toBe(1);
    expect(result.current.games).toBe(1);
    expect(result.current.revealed).toBe(true);
    expect(result.current.message?.correct).toBe(true);
  });

  it('resets the streak on a wrong pick', () => {
    const { result } = renderHook(() => useHigherOrLower());
    act(() => {
      result.current.guess(
        leftWins(result.current.question) ? 'left' : 'right'
      );
    });
    act(() => {
      result.current.next();
    });
    const second = result.current.question;
    act(() => {
      result.current.guess(leftWins(second) ? 'right' : 'left');
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

  it('chooseMode swaps the question and resets feedback', () => {
    const { result } = renderHook(() => useHigherOrLower());
    act(() => {
      result.current.guess('left');
    });
    act(() => {
      result.current.chooseMode('passport');
    });
    expect(result.current.mode).toBe('passport');
    expect(result.current.question.mode).toBe('passport');
    expect(result.current.revealed).toBe(false);
    expect(result.current.message).toBeNull();
  });
});
