'use client';

import { FC, useEffect, useState } from 'react';
import { PiMoonBold, PiSunBold } from 'react-icons/pi';

export const ThemeToggle: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLight(
      document.documentElement.getAttribute('data-theme') === 'luxury'
    );
  }, []);

  if (!mounted) return <div className="btn btn-ghost btn-sm btn-circle" />;

  return (
    <button
      className="btn btn-ghost btn-sm btn-circle"
      onClick={() => {
        const next = isLight ? 'nothing' : 'luxury';
        document.documentElement.setAttribute('data-theme', next);
        setIsLight(!isLight);
      }}
      title="Toggle theme">
      {isLight ? (
        <PiSunBold className="h-4 w-4" />
      ) : (
        <PiMoonBold className="h-4 w-4" />
      )}
    </button>
  );
};
ThemeToggle.displayName = 'ThemeToggle';
