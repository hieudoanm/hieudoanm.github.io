'use client';

import { type FC } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '@/hooks/useTheme';

export const ThemeToggle: FC = () => {
  const { theme, toggle } = useTheme();
  const dark = theme === 'night';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}
      title={`Switch to ${dark ? 'light' : 'dark'} theme`}
      className="btn btn-ghost btn-xs gap-1">
      {dark ? <FiSun className="size-3.5" /> : <FiMoon className="size-3.5" />}
    </button>
  );
};
