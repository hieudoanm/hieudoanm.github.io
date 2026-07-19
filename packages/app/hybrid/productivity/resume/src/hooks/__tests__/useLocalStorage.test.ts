import { act, renderHook } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('reads a stored value', () => {
    window.localStorage.setItem('key', JSON.stringify('stored'));
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));
    expect(result.current[0]).toBe('stored');
  });

  it('falls back to the initial value when storage is invalid', () => {
    window.localStorage.setItem('key', 'not-json');
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('persists updates to storage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));
    act(() => result.current[1]('updated'));
    expect(window.localStorage.getItem('key')).toBe(JSON.stringify('updated'));
  });

  it('supports functional updates', () => {
    const { result } = renderHook(() => useLocalStorage<number>('count', 1));
    act(() => result.current[1]((previous) => previous + 1));
    expect(result.current[0]).toBe(2);
  });
});
