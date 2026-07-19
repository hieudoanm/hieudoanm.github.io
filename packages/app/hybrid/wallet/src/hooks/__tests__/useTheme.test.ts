import { renderHook, act } from '@testing-library/react';
import { useTheme } from '../useTheme';

const STORAGE_KEY = 'wallet-theme';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});

describe('useTheme', () => {
  it('defaults to night theme', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('night');
    expect(result.current.isDark).toBe(true);
  });

  it('loads stored theme from localStorage', () => {
    localStorage.setItem(STORAGE_KEY, 'winter');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('winter');
    expect(result.current.isDark).toBe(false);
  });

  it('sets theme and persists to localStorage', () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.setTheme('corporate');
    });
    expect(result.current.theme).toBe('corporate');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('corporate');
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'corporate'
    );
  });

  it('toggles between dark and light defaults', () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('winter');
    expect(result.current.isDark).toBe(false);

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('night');
    expect(result.current.isDark).toBe(true);
  });
});
