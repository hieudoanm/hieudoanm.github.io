import { act, renderHook } from '@testing-library/react';
import { useBorder } from '../useBorder';

describe('useBorder', () => {
  it('starts with a question and clean stats', () => {
    const { result } = renderHook(() => useBorder());
    expect(result.current.message).toBeNull();
    expect(result.current.revealed).toBe(false);
    expect(result.current.stats.score).toBe(0);
    expect(result.current.question.options).toHaveLength(4);
  });

  it('scores on a correct neighbour pick', () => {
    const { result } = renderHook(() => useBorder());
    act(() => {
      result.current.guess(result.current.question.correct);
    });
    expect(result.current.stats.score).toBe(1);
    expect(result.current.stats.streak).toBe(1);
    expect(result.current.message?.correct).toBe(true);
  });

  it('reveals neighbours and resets the streak on a wrong pick', () => {
    const { result } = renderHook(() => useBorder());
    const wrong = result.current.question.options.find(
      (option) => option !== result.current.question.correct
    )!;
    act(() => {
      result.current.guess(wrong);
    });
    expect(result.current.revealed).toBe(true);
    expect(result.current.message?.correct).toBe(false);
    expect(result.current.message?.text).toContain('borders');
    expect(result.current.neighbours.length).toBeGreaterThan(0);
    expect(result.current.stats.streak).toBe(0);
  });

  it('ignores guesses while feedback is showing', () => {
    const { result } = renderHook(() => useBorder());
    act(() => {
      result.current.guess(result.current.question.correct);
    });
    const scoreAfterFirst = result.current.stats.score;
    act(() => {
      result.current.guess(result.current.question.correct);
    });
    expect(result.current.stats.score).toBe(scoreAfterFirst);
  });

  it('next deals a fresh question and clears feedback', () => {
    const { result } = renderHook(() => useBorder());
    act(() => {
      result.current.guess(result.current.question.correct);
    });
    act(() => {
      result.current.next();
    });
    expect(result.current.message).toBeNull();
    expect(result.current.revealed).toBe(false);
    expect(result.current.question.options).toHaveLength(4);
  });
});
