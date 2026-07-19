import { useState, useEffect, useCallback } from 'react';
import type { Theme } from '@/types';
import { themes } from '@/types';

const STORAGE_KEY = 'wallet-theme';
const DARK_DEFAULT = 'night';
const LIGHT_DEFAULT = 'winter';
const DARK_THEMES = [
  'dark',
  'synthwave',
  'cyberpunk',
  'halloween',
  'forest',
  'black',
  'luxury',
  'dracula',
  'business',
  'night',
  'coffee',
  'dim',
  'nord',
  'sunset',
];

export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(DARK_DEFAULT);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored && themes.some((t) => t.value === stored)) {
      setThemeState(stored);
      document.documentElement.setAttribute('data-theme', stored);
    }
  }, []);

  const isDark = DARK_THEMES.includes(theme);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(isDark ? LIGHT_DEFAULT : DARK_DEFAULT);
  }, [isDark, setTheme]);

  return { theme, setTheme, toggleTheme, isDark };
};
