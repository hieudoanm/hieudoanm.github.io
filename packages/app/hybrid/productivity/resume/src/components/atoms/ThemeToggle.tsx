'use client';

import type { FC } from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle: FC = () => {
  const { preference, toggle } = useTheme();
  return (
    <button
      type="button"
      className="btn btn-ghost btn-sm"
      aria-label={
        preference === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      }
      onClick={toggle}>
      {preference === 'dark' ? (
        <>
          <LuSun /> Light
        </>
      ) : (
        <>
          <LuMoon /> Dark
        </>
      )}
    </button>
  );
};

ThemeToggle.displayName = 'ThemeToggle';
