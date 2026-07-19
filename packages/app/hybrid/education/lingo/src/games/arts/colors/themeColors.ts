'use client';

import { useEffect, useState } from 'react';

export interface ThemeSwatch {
  key: string;
  label: string;
  value: string;
}

export const THEME_SWATCH_DEFS: { key: string; label: string }[] = [
  { key: 'primary', label: 'Primary' },
  { key: 'primary-content', label: 'Primary Content' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'secondary-content', label: 'Secondary Content' },
  { key: 'accent', label: 'Accent' },
  { key: 'accent-content', label: 'Accent Content' },
  { key: 'neutral', label: 'Neutral' },
  { key: 'neutral-content', label: 'Neutral Content' },
  { key: 'base-100', label: 'Base 100' },
  { key: 'base-200', label: 'Base 200' },
  { key: 'base-300', label: 'Base 300' },
  { key: 'base-content', label: 'Base Content' },
  { key: 'info', label: 'Info' },
  { key: 'info-content', label: 'Info Content' },
  { key: 'success', label: 'Success' },
  { key: 'success-content', label: 'Success Content' },
  { key: 'warning', label: 'Warning' },
  { key: 'warning-content', label: 'Warning Content' },
  { key: 'error', label: 'Error' },
  { key: 'error-content', label: 'Error Content' },
];

const readColor = (): string => {
  const root = document.documentElement;
  const value = root.dataset.theme ?? '';
  const fallback: Record<string, string> = {
    'colors-dark': '#818cf8',
    'colors-light': '#6366f1',
  };
  return fallback[value] ?? '#6366f1';
};

export const useThemeColors = (): ThemeSwatch[] => {
  const [swatches, setSwatches] = useState<ThemeSwatch[]>([]);

  useEffect(() => {
    const read = () => {
      const root = document.documentElement;
      const computed = getComputedStyle(root);
      setSwatches(
        THEME_SWATCH_DEFS.map(({ key, label }) => {
          const value =
            computed.getPropertyValue(`--color-${key}`).trim() || readColor();
          return { key, label, value };
        })
      );
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  return swatches;
};
