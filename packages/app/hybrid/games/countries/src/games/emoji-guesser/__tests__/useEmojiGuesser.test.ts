import { act, renderHook } from '@testing-library/react';
import { useEmojiGuesser } from '../useEmojiGuesser';

describe('useEmojiGuesser', () => {
  it('starts with a clean board', () => {
    const { result } = renderHook(() => useEmojiGuesser());
    expect(result.current.message).toBeNull();
    expect(result.current.stats).toEqual({
      score: 0,
      streak: 0,
      bestStreak: 0,
    });
    expect(result.current.question.options).toHaveLength(4);
  });

  it('scores on a correct flag pick', () => {
    const { result } = renderHook(() => useEmojiGuesser());
    const correct = result.current.question.current.flag;
    act(() => {
      result.current.guess(correct);
    });
    expect(result.current.stats.score).toBe(1);
    expect(result.current.message?.correct).toBe(true);
  });

  it('reveals the country and resets the streak on a wrong pick', () => {
    const { result } = renderHook(() => useEmojiGuesser());
    const wrong = result.current.question.options.find(
      (option) => option.flag !== result.current.question.current.flag
    )!.flag;
    act(() => {
      result.current.guess(wrong);
    });
    expect(result.current.message?.correct).toBe(false);
    expect(result.current.message?.text).toContain('It was');
    expect(result.current.stats.streak).toBe(0);
  });

  it('ignores guesses while feedback is showing', () => {
    const { result } = renderHook(() => useEmojiGuesser());
    act(() => {
      result.current.guess(result.current.question.current.flag);
    });
    const scoreAfterFirst = result.current.stats.score;
    act(() => {
      result.current.guess(result.current.question.current.flag);
    });
    expect(result.current.stats.score).toBe(scoreAfterFirst);
  });

  it('next deals a fresh question and clears the message', () => {
    const { result } = renderHook(() => useEmojiGuesser());
    act(() => {
      result.current.guess(result.current.question.current.flag);
    });
    act(() => {
      result.current.next();
    });
    expect(result.current.message).toBeNull();
    expect(result.current.question.options).toHaveLength(4);
  });
});
