import { act, renderHook } from '@testing-library/react';
import { useHighStreak } from '../useHighStreak';

beforeEach(() => {
  localStorage.clear();
});

it('returns 0 initially', () => {
  const { result } = renderHook(() => useHighStreak());
  expect(result.current.highStreak).toBe(0);
});

it('reads stored value from localStorage', () => {
  localStorage.setItem('highStreak', '5');
  const { result } = renderHook(() => useHighStreak());
  expect(result.current.highStreak).toBe(5);
});

it('updates high streak and persists to localStorage', () => {
  const { result } = renderHook(() => useHighStreak());
  act(() => result.current.updateHighStreak(3));
  expect(result.current.highStreak).toBe(3);
  expect(localStorage.getItem('highStreak')).toBe('3');
});

it('does not decrease high streak', () => {
  const { result } = renderHook(() => useHighStreak());
  act(() => result.current.updateHighStreak(5));
  act(() => result.current.updateHighStreak(2));
  expect(result.current.highStreak).toBe(5);
  expect(localStorage.getItem('highStreak')).toBe('5');
});
