'use client';

import { useCallback, useEffect, useState } from 'react';

export type AppTheme = 'keynotes-light' | 'keynotes-dark';

const STORAGE_KEY = 'keynotes-theme';

const readStored = (): AppTheme => {
  if (typeof window === 'undefined') return 'keynotes-light';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === 'keynotes-dark' ? 'keynotes-dark' : 'keynotes-light';
};

export const useTheme = (): { theme: AppTheme; toggle: () => void } => {
  const [theme, setTheme] = useState<AppTheme>('keynotes-light');

  useEffect(() => {
    setTheme(readStored());
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next: AppTheme =
        t === 'keynotes-dark' ? 'keynotes-light' : 'keynotes-dark';
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return { theme, toggle };
};
