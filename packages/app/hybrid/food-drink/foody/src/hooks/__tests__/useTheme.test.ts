import { act, renderHook } from '@testing-library/react';
import { useTheme } from '../useTheme';

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.dataset.theme = '';
  });

  it('defaults to the light theme', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('foody-light');
  });

  it('applies theme to document and toggles to dark', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('foody-dark');
    expect(document.documentElement.dataset.theme).toBe('foody-dark');
    expect(localStorage.getItem('foody:theme')).toBe('foody-dark');
  });

  it('toggles back to light', () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.toggleTheme();
    });
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('foody-light');
    expect(localStorage.getItem('foody:theme')).toBe('foody-light');
  });

  it('restores stored theme on mount', async () => {
    localStorage.setItem('foody:theme', 'foody-dark');
    const { result } = renderHook(() => useTheme());
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.theme).toBe('foody-dark');
    expect(document.documentElement.dataset.theme).toBe('foody-dark');
  });
});
