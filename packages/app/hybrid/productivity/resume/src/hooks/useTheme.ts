import { useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type ThemePreference = 'light' | 'dark';

export const THEME_BY_PREFERENCE: Record<ThemePreference, string> = {
  light: 'resume-light',
  dark: 'resume-dark',
};

export const useTheme = (): {
  preference: ThemePreference;
  toggle: () => void;
} => {
  const [preference, setPreference] = useLocalStorage<ThemePreference>(
    'resume.theme',
    'light'
  );

  useEffect(() => {
    document.documentElement.dataset.theme = THEME_BY_PREFERENCE[preference];
  }, [preference]);

  const toggle = useCallback(() => {
    setPreference(preference === 'light' ? 'dark' : 'light');
  }, [preference, setPreference]);

  return { preference, toggle };
};
