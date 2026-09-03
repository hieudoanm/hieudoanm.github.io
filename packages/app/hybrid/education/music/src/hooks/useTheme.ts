'use client';

import { useEffect, useState } from 'react';

export type Theme = 'music-light' | 'music-dark';

const THEME_KEY = 'music:theme';
const DEFAULT_THEME: Theme = 'music-light';

const readStoredTheme = (): Theme => {
  try {
    const raw = window.localStorage.getItem(THEME_KEY);
    return raw === 'music-dark' ? 'music-dark' : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
};

export const useTheme = (): {
  theme: Theme;
  toggleTheme: () => void;
} => {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  useEffect(() => {
    setTheme(readStoredTheme());
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  return {
    theme,
    toggleTheme: () =>
      setTheme((current) =>
        current === 'music-dark' ? 'music-light' : 'music-dark'
      ),
  };
};
