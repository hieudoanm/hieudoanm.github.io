'use client';

import { useEffect, useState } from 'react';

const THEME_KEY = 'diagram-editor:theme';

export type Theme = 'dark' | 'light';

export const useTheme = (): { theme: Theme; toggleTheme: () => void } => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    let stored: Theme | null = null;
    try {
      const raw = window.localStorage.getItem(THEME_KEY);
      if (raw === 'dark' || raw === 'light') stored = raw;
    } catch {
      // ignore storage errors
    }
    setTheme(stored ?? 'dark');
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme =
      theme === 'dark' ? 'diagram' : 'light';
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  return {
    theme,
    toggleTheme: () =>
      setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
  };
};
