import { renderHook, act } from '@testing-library/react';
import { useTheme } from '@/hooks/useTheme';

describe('useTheme', () => {
  afterEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('defaults to keynotes-light and applies it to the document', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('keynotes-light');
    expect(document.documentElement.dataset.theme).toBe('keynotes-light');
  });

  it('toggles between keynotes-light and keynotes-dark, persisting to localStorage', () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggle());
    expect(result.current.theme).toBe('keynotes-dark');
    expect(window.localStorage.getItem('keynotes-theme')).toBe('keynotes-dark');
    expect(document.documentElement.dataset.theme).toBe('keynotes-dark');
    act(() => result.current.toggle());
    expect(result.current.theme).toBe('keynotes-light');
  });
});
