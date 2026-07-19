import { renderHook, act } from '@testing-library/react';
import { useTheme } from '@/hooks/useTheme';

describe('useTheme', () => {
  afterEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('defaults to night and applies it to the document', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('night');
    expect(document.documentElement.dataset.theme).toBe('night');
  });

  it('toggles between night and light, persisting to localStorage', () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggle());
    expect(result.current.theme).toBe('light');
    expect(window.localStorage.getItem('keynotes-theme')).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
    act(() => result.current.toggle());
    expect(result.current.theme).toBe('night');
  });
});
