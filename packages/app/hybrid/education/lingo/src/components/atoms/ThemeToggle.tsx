'use client';

import { PiMoon, PiSun } from 'react-icons/pi';
import { FC } from 'react';
import { useTheme } from '@/hooks/useTheme';

export const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      className="btn btn-ghost btn-sm"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      data-testid="theme-toggle">
      {theme === 'lingo-dark' ? (
        <PiSun className="text-lg" />
      ) : (
        <PiMoon className="text-lg" />
      )}
    </button>
  );
};
