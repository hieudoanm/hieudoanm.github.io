'use client';

import { useEffect, useState } from 'react';

export type Theme = 'chemistry-light' | 'chemistry-dark';

const THEME_KEY = 'chemistry:theme';
const DEFAULT_THEME: Theme = 'chemistry-light';

const readStoredTheme = (): Theme => {
  try {
    const raw = window.localStorage.getItem(THEME_KEY);
    return raw === 'chemistry-dark' ? 'chemistry-dark' : DEFAULT_THEME;
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
        current === 'chemistry-dark' ? 'chemistry-light' : 'chemistry-dark'
      ),
  };
};
