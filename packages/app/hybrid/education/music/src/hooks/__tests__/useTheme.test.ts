import { act, renderHook } from '@testing-library/react';
import { useTheme } from '../useTheme';

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.dataset.theme = '';
  });

  it('defaults to the light theme', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('music-light');
  });

  it('applies theme to document and toggles to dark', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('music-dark');
    expect(document.documentElement.dataset.theme).toBe('music-dark');
    expect(localStorage.getItem('music:theme')).toBe('music-dark');
  });

  it('toggles back to light', () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.toggleTheme();
    });
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('music-light');
    expect(localStorage.getItem('music:theme')).toBe('music-light');
  });

  it('restores stored theme on mount', async () => {
    localStorage.setItem('music:theme', 'music-dark');
    const { result } = renderHook(() => useTheme());
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.theme).toBe('music-dark');
    expect(document.documentElement.dataset.theme).toBe('music-dark');
  });
});
