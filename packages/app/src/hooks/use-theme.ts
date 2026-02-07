import { useState, useEffect } from 'react';

export enum Theme {
  LIGHT = 'nord',
  DARK = 'luxury',
}

const getInitialTheme = (): Theme => {
  if (globalThis.window === undefined) return Theme.LIGHT;
  return (
    (localStorage.getItem('store-theme') as Theme.LIGHT | Theme.DARK) ??
    Theme.LIGHT
  );
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('store-theme', theme);
  }, [theme]);

  return {
    theme,
    toggleTheme: () =>
      setTheme((t) => (t === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)),
  };
};
