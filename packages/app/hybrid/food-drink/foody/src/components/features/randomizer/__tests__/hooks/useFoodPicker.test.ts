import { act, renderHook } from '@testing-library/react';
import { useFoodPicker } from '../../hooks/useFoodPicker';
import { FIXTURE_FOODS_MAP } from '../../testing/fixtures';

describe('useFoodPicker', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts on all foods with no suggestion and not spinning', () => {
    const { result } = renderHook(() =>
      useFoodPicker({ foodsMap: FIXTURE_FOODS_MAP })
    );
    expect(result.current.food).toBe('all');
    expect(result.current.suggestion).toBe('');
    expect(result.current.spinning).toBe(false);
    expect(result.current.options).toHaveLength(3);
  });

  it('selectFood narrows options and clears the suggestion', () => {
    const { result } = renderHook(() =>
      useFoodPicker({ foodsMap: FIXTURE_FOODS_MAP })
    );
    act(() => result.current.selectFood('japanese'));
    expect(result.current.food).toBe('japanese');
    expect(result.current.options).toEqual(['Sushi']);
  });

  it('spin lands on a suggestion after a random duration', () => {
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);
    const { result } = renderHook(() =>
      useFoodPicker({ foodsMap: FIXTURE_FOODS_MAP })
    );
    act(() => result.current.spin());
    expect(result.current.spinning).toBe(true);
    act(() => jest.advanceTimersByTime(1800));
    expect(result.current.spinning).toBe(false);
    expect(FIXTURE_FOODS_MAP.all).toContain(result.current.suggestion);
    randomSpy.mockRestore();
  });

  it('ignores spins while already spinning', () => {
    const { result } = renderHook(() =>
      useFoodPicker({ foodsMap: FIXTURE_FOODS_MAP })
    );
    act(() => result.current.spin());
    act(() => result.current.spin());
    act(() => jest.advanceTimersByTime(1800));
    expect(result.current.spinning).toBe(false);
    expect(result.current.suggestion).not.toBe('');
  });

  it('does nothing when the selected food has no options', () => {
    const { result } = renderHook(() => useFoodPicker({ foodsMap: {} }));
    act(() => result.current.selectFood('unknown'));
    act(() => result.current.spin());
    expect(result.current.spinning).toBe(false);
    expect(result.current.suggestion).toBe('');
  });

  it('selecting a food mid-spin cancels the spin', () => {
    const { result } = renderHook(() =>
      useFoodPicker({ foodsMap: FIXTURE_FOODS_MAP })
    );
    act(() => result.current.spin());
    expect(result.current.spinning).toBe(true);
    act(() => result.current.selectFood('italian'));
    expect(result.current.spinning).toBe(false);
    expect(result.current.suggestion).toBe('');
    expect(() => jest.advanceTimersByTime(1800)).not.toThrow();
    expect(result.current.suggestion).toBe('');
  });
});
