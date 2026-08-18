import { act, renderHook } from '@testing-library/react';
import { useTheme } from '../useTheme';

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.dataset.theme = '';
  });

  it('defaults to the light theme', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('lingo');
  });

  it('applies theme to document and toggles to dark', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('lingo-dark');
    expect(document.documentElement.dataset.theme).toBe('lingo-dark');
    expect(localStorage.getItem('lingo:theme')).toBe('lingo-dark');
  });

  it('toggles back to light', () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.toggleTheme();
    });
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('lingo');
    expect(localStorage.getItem('lingo:theme')).toBe('lingo');
  });

  it('restores stored theme on mount', async () => {
    localStorage.setItem('lingo:theme', 'lingo-dark');
    const { result } = renderHook(() => useTheme());
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.theme).toBe('lingo-dark');
    expect(document.documentElement.dataset.theme).toBe('lingo-dark');
  });
});
