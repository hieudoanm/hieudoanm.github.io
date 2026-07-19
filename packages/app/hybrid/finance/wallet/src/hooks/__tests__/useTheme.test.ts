import { renderHook, act } from '@testing-library/react';
import { useTheme } from '../useTheme';

const STORAGE_KEY = 'wallet-theme';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});

describe('useTheme', () => {
  it('defaults to wallet-dark theme', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('wallet-dark');
    expect(result.current.isDark).toBe(true);
  });

  it('loads stored theme from localStorage', () => {
    localStorage.setItem(STORAGE_KEY, 'wallet-light');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('wallet-light');
    expect(result.current.isDark).toBe(false);
  });

  it('sets theme and persists to localStorage', () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.setTheme('wallet-light');
    });
    expect(result.current.theme).toBe('wallet-light');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('wallet-light');
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'wallet-light'
    );
  });

  it('toggles between dark and light defaults', () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('wallet-light');
    expect(result.current.isDark).toBe(false);

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('wallet-dark');
    expect(result.current.isDark).toBe(true);
  });
});
