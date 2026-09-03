'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'eyes-theme';

type Theme = 'eyes-dark' | 'eyes-light';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'eyes-dark';
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'eyes-light'
      ? 'eyes-light'
      : 'eyes-dark';
  } catch {
    return 'eyes-dark';
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
    setTheme((current) => (current === 'eyes-dark' ? 'eyes-light' : 'eyes-dark'));
  };

  return [theme, toggle];
};
