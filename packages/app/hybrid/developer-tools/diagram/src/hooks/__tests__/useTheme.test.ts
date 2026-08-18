import { act, renderHook } from '@testing-library/react';
import { useTheme } from '@/hooks/useTheme';

describe('useTheme', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('defaults to dark and applies the diagram theme', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('diagram');
  });

  it('restores a stored theme', () => {
    window.localStorage.setItem('diagram-editor:theme', 'light');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('toggles between dark and light', () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe('light');
    expect(window.localStorage.getItem('diagram-editor:theme')).toBe('light');
    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe('dark');
  });
});
