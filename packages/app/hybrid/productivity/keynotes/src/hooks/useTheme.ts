'use client';

import { useCallback, useEffect, useState } from 'react';

export type AppTheme = 'night' | 'light';

const STORAGE_KEY = 'keynotes-theme';

const readStored = (): AppTheme => {
  if (typeof window === 'undefined') return 'night';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === 'light' ? 'light' : 'night';
};

export const useTheme = (): { theme: AppTheme; toggle: () => void } => {
  const [theme, setTheme] = useState<AppTheme>('night');

  useEffect(() => {
    setTheme(readStored());
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next: AppTheme = t === 'night' ? 'light' : 'night';
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return { theme, toggle };
};
