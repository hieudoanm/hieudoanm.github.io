'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'eyes-theme';

type Theme = 'luxury' | 'light';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'luxury';
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'light'
      ? 'light'
      : 'luxury';
  } catch {
    return 'luxury';
  }
};

export const useTheme = (): [Theme, () => void] => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const toggle = (): void => {
    setTheme((current) => (current === 'luxury' ? 'light' : 'luxury'));
  };

  return [theme, toggle];
};
