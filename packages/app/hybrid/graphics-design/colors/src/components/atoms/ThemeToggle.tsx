'use client';

import { FC, useEffect } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '@/hooks/useTheme';

export const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="btn btn-ghost btn-sm"
      aria-label="Toggle theme">
      {theme === 'colors-dark' ? <FiSun /> : <FiMoon />}
    </button>
  );
};
