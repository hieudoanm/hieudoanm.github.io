import { act, renderHook } from '@testing-library/react';
import { THEME_BY_PREFERENCE, useTheme } from '../useTheme';

describe('useTheme', () => {
  beforeEach(() => {
    window.localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('applies the persisted theme to the document element', () => {
    window.localStorage.setItem('resume.theme', JSON.stringify('dark'));
    renderHook(() => useTheme());
    expect(document.documentElement.dataset.theme).toBe(
      THEME_BY_PREFERENCE.dark
    );
  });

  it('defaults to light when nothing is stored', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.preference).toBe('light');
    expect(document.documentElement.dataset.theme).toBe(
      THEME_BY_PREFERENCE.light
    );
  });

  it('toggles between light and dark and persists', () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggle());
    expect(result.current.preference).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe(
      THEME_BY_PREFERENCE.dark
    );
    expect(window.localStorage.getItem('resume.theme')).toBe(
      JSON.stringify('dark')
    );
  });
});
