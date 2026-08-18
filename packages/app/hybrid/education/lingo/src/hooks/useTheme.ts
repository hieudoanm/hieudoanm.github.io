'use client';

import { useEffect, useState } from 'react';

export type Theme = 'lingo' | 'lingo-dark';

const THEME_KEY = 'lingo:theme';
const DEFAULT_THEME: Theme = 'lingo';

const readStoredTheme = (): Theme => {
  try {
    const raw = window.localStorage.getItem(THEME_KEY);
    return raw === 'lingo-dark' ? 'lingo-dark' : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
};

export const useTheme = (): { theme: Theme; toggleTheme: () => void } => {
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
        current === 'lingo-dark' ? 'lingo' : 'lingo-dark'
      ),
  };
};
