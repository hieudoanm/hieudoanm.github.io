import { act, renderHook } from '@testing-library/react';
import { useTheme } from '../useTheme';

const THEME_KEY = 'colors:theme';

const getDatasetTheme = () => document.documentElement.dataset.theme ?? null;

const getStored = () => window.localStorage.getItem(THEME_KEY);

describe('useTheme', () => {
  beforeEach(() => {
    window.localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  afterEach(() => {
    window.localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  it('defaults to colors-dark', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('colors-dark');
  });

  it('stores the default theme in localStorage and sets dataset.theme', () => {
    renderHook(() => useTheme());
    expect(getStored()).toBe('colors-dark');
    expect(getDatasetTheme()).toBe('colors-dark');
  });

  it('reads a stored light theme from localStorage', () => {
    window.localStorage.setItem(THEME_KEY, 'colors-light');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('colors-light');
    expect(getDatasetTheme()).toBe('colors-light');
  });

  it('toggleTheme flips to colors-light and back', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('colors-light');
    expect(getStored()).toBe('colors-light');
    expect(getDatasetTheme()).toBe('colors-light');

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('colors-dark');
    expect(getStored()).toBe('colors-dark');
    expect(getDatasetTheme()).toBe('colors-dark');
  });

  it('falls back to colors-dark when localStorage is unavailable', () => {
    const getItem = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => {
        throw new Error('storage denied');
      });
    const setItem = jest
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('storage denied');
      });

    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('colors-dark');

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('colors-light');

    getItem.mockRestore();
    setItem.mockRestore();
  });
});
