import { act, renderHook } from '@testing-library/react';
import { useGuess } from '../useGuess';

describe('useGuess', () => {
  it('starts in flag mode with a clean round', () => {
    const { result } = renderHook(() => useGuess());
    expect(result.current.mode).toBe('flag');
    expect(result.current.question.mode).toBe('flag');
    expect(result.current.message).toBeNull();
    expect(result.current.revealed).toBe(false);
    expect(result.current.stats.score).toBe(0);
  });

  it('switches modes and rebuilds the question', () => {
    const { result } = renderHook(() => useGuess());
    act(() => {
      result.current.chooseMode('emoji');
    });
    expect(result.current.mode).toBe('emoji');
    expect(result.current.question.mode).toBe('emoji');
    expect(result.current.message).toBeNull();
  });

  it('scores on a correct flag pick', () => {
    const { result } = renderHook(() => useGuess());
    const question = result.current.question;
    if (question.mode !== 'flag') throw new Error('expected flag question');
    act(() => {
      result.current.guess(question.current.name);
    });
    expect(result.current.stats.score).toBe(1);
    expect(result.current.stats.streak).toBe(1);
    expect(result.current.message?.correct).toBe(true);
  });

  it('records an incorrect emoji pick with the right answer', () => {
    const { result } = renderHook(() => useGuess());
    act(() => {
      result.current.chooseMode('emoji');
    });
    const question = result.current.question;
    if (question.mode !== 'emoji') throw new Error('expected emoji question');
    act(() => {
      result.current.guess('🏳️');
    });
    expect(result.current.message?.correct).toBe(false);
    expect(result.current.message?.text).toContain(question.current.name);
    expect(result.current.stats.streak).toBe(0);
  });

  it('reveals neighbours on a wrong border pick', () => {
    const { result } = renderHook(() => useGuess());
    act(() => {
      result.current.chooseMode('border');
    });
    const question = result.current.question;
    if (question.mode !== 'border') throw new Error('expected border question');
    const wrong = question.options.find(
      (option) => option !== question.correct
    )!;
    act(() => {
      result.current.guess(wrong);
    });
    expect(result.current.revealed).toBe(true);
    expect(result.current.message?.text).toContain('borders');
    expect(result.current.neighbours.length).toBeGreaterThan(0);
  });

  it('ignores guesses while feedback is showing', () => {
    const { result } = renderHook(() => useGuess());
    act(() => {
      result.current.guess('🇽🇽');
    });
    const scoreAfterFirst = result.current.stats.score;
    act(() => {
      result.current.guess('🇿🇿');
    });
    expect(result.current.stats.score).toBe(scoreAfterFirst);
  });

  it('next deals a fresh question and clears feedback', () => {
    const { result } = renderHook(() => useGuess());
    act(() => {
      result.current.guess('🇽🇽');
    });
    act(() => {
      result.current.next();
    });
    expect(result.current.message).toBeNull();
    expect(result.current.revealed).toBe(false);
  });
});
