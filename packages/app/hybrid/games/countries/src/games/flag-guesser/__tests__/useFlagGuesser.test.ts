import { act, renderHook } from '@testing-library/react';
import { useFlagGuesser } from '../useFlagGuesser';

describe('useFlagGuesser', () => {
  it('starts with a clean board', () => {
    const { result } = renderHook(() => useFlagGuesser());
    expect(result.current.message).toBeNull();
    expect(result.current.stats).toEqual({
      score: 0,
      streak: 0,
      bestStreak: 0,
    });
    expect(result.current.question.options).toHaveLength(4);
  });

  it('scores and keeps the streak on a correct guess', () => {
    const { result } = renderHook(() => useFlagGuesser());
    const correct = result.current.question.current.name;
    act(() => {
      result.current.guess(correct);
    });
    expect(result.current.stats.score).toBe(1);
    expect(result.current.stats.streak).toBe(1);
    expect(result.current.message?.correct).toBe(true);
  });

  it('reveals the answer and resets the streak on a wrong guess', () => {
    const { result } = renderHook(() => useFlagGuesser());
    const correct = result.current.question.current.name;
    act(() => {
      result.current.guess(correct);
    });
    act(() => {
      result.current.next();
    });
    const wrong = result.current.question.options.find(
      (option) => option.name !== result.current.question.current.name
    )!.name;
    act(() => {
      result.current.guess(wrong);
    });
    expect(result.current.message?.correct).toBe(false);
    expect(result.current.message?.text).toContain('It was');
    expect(result.current.stats.streak).toBe(0);
    expect(result.current.stats.bestStreak).toBe(1);
  });

  it('ignores guesses while a message is showing', () => {
    const { result } = renderHook(() => useFlagGuesser());
    const wrong = result.current.question.options.find(
      (option) => option.flag !== result.current.question.current.flag
    )!.name;
    act(() => {
      result.current.guess(wrong);
    });
    const scoreAfterFirst = result.current.stats.score;
    act(() => {
      result.current.guess(wrong);
    });
    expect(result.current.stats.score).toBe(scoreAfterFirst);
  });

  it('next deals a fresh question and clears the message', () => {
    const { result } = renderHook(() => useFlagGuesser());
    act(() => {
      result.current.guess(result.current.question.current.name);
    });
    act(() => {
      result.current.next();
    });
    expect(result.current.message).toBeNull();
    expect(result.current.question.options).toHaveLength(4);
  });
});
