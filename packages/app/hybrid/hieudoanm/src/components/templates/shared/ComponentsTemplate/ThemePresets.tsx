import { FC } from 'react';

export interface ThemeConfig {
  name: string;
  colors: Record<string, string>;
  shape: { radiusBox: string; radiusField: string; radiusSelector: string };
  size: { field: string; selector: string };
  border: string;
  darkMode: boolean;
  noise: boolean;
}

export const DEFAULT_CONFIG: ThemeConfig = {
  name: 'custom',
  colors: {
    primary: '#ff0030',
    primaryContent: '#f5f5f5',
    secondary: '#f5f5f5',
    secondaryContent: '#1f1f1f',
    accent: '#6e7b86',
    accentContent: '#f5f5f5',
    neutral: '#8a8a8a',
    neutralContent: '#000000',
    base100: '#000000',
    base200: '#0a0a0a',
    base300: '#1f1f1f',
    baseContent: '#f5f5f5',
    info: '#4da3ff',
    infoContent: '#f5f5f5',
    success: '#00c853',
    successContent: '#f5f5f5',
    warning: '#ffb000',
    warningContent: '#f5f5f5',
    error: '#ff0030',
    errorContent: '#f5f5f5',
  },
  shape: { radiusBox: '2rem', radiusField: '2rem', radiusSelector: '2rem' },
  size: { field: '0.25rem', selector: '0.25rem' },
  border: '1px',
  darkMode: true,
  noise: true,
};

const PRESETS: ThemeConfig[] = [
  {
    ...DEFAULT_CONFIG,
    name: 'Nothing',
  },
  {
    name: 'Light',
    colors: {
      primary: '#570df8',
      primaryContent: '#ffffff',
      secondary: '#f000b8',
      secondaryContent: '#ffffff',
      accent: '#37cdbe',
      accentContent: '#164e63',
      neutral: '#333333',
      neutralContent: '#ffffff',
      base100: '#ffffff',
      base200: '#f2f2f2',
      base300: '#e5e5e5',
      baseContent: '#1f2937',
      info: '#3abff8',
      infoContent: '#ffffff',
      success: '#36d399',
      successContent: '#ffffff',
      warning: '#fbbd23',
      warningContent: '#ffffff',
      error: '#f87272',
      errorContent: '#ffffff',
    },
    shape: {
      radiusBox: '0.5rem',
      radiusField: '0.5rem',
      radiusSelector: '0.5rem',
    },
    size: { field: '0.25rem', selector: '0.25rem' },
    border: '1px',
    darkMode: false,
    noise: false,
  },
  {
    name: 'Dark',
    colors: {
      primary: '#661ae6',
      primaryContent: '#ffffff',
      secondary: '#d926a9',
      secondaryContent: '#ffffff',
      accent: '#25d0ee',
      accentContent: '#002b37',
      neutral: '#2a323c',
      neutralContent: '#a6adba',
      base100: '#1d232a',
      base200: '#191e24',
      base300: '#15191e',
      baseContent: '#a6adba',
      info: '#00cfd9',
      infoContent: '#002b37',
      success: '#2dd4bf',
      successContent: '#002b21',
      warning: '#fbbd23',
      warningContent: '#002b37',
      error: '#fb7185',
      errorContent: '#002b37',
    },
    shape: {
      radiusBox: '0.5rem',
      radiusField: '0.5rem',
      radiusSelector: '0.5rem',
    },
    size: { field: '0.25rem', selector: '0.25rem' },
    border: '1px',
    darkMode: true,
    noise: false,
  },
  {
    name: 'Emerald',
    colors: {
      primary: '#6d28d9',
      primaryContent: '#ffffff',
      secondary: '#f472b6',
      secondaryContent: '#ffffff',
      accent: '#2dd4bf',
      accentContent: '#042f2e',
      neutral: '#1e293b',
      neutralContent: '#e2e8f0',
      base100: '#ffffff',
      base200: '#f0fdf4',
      base300: '#d1fae5',
      baseContent: '#1e293b',
      info: '#3b82f6',
      infoContent: '#ffffff',
      success: '#22c55e',
      successContent: '#ffffff',
      warning: '#f59e0b',
      warningContent: '#ffffff',
      error: '#ef4444',
      errorContent: '#ffffff',
    },
    shape: {
      radiusBox: '0.75rem',
      radiusField: '0.5rem',
      radiusSelector: '2rem',
    },
    size: { field: '0.25rem', selector: '0.25rem' },
    border: '1px',
    darkMode: false,
    noise: false,
  },
  {
    name: 'Synthwave',
    colors: {
      primary: '#e040fb',
      primaryContent: '#ffffff',
      secondary: '#f50057',
      secondaryContent: '#ffffff',
      accent: '#00e5ff',
      accentContent: '#003d47',
      neutral: '#1a1a2e',
      neutralContent: '#d4d4d8',
      base100: '#13072c',
      base200: '#1a0a3e',
      base300: '#241158',
      baseContent: '#d4d4d8',
      info: '#00e5ff',
      infoContent: '#003d47',
      success: '#00e676',
      successContent: '#003d22',
      warning: '#ffea00',
      warningContent: '#4a3f00',
      error: '#ff1744',
      errorContent: '#4a0513',
    },
    shape: { radiusBox: '0rem', radiusField: '0rem', radiusSelector: '0rem' },
    size: { field: '0.25rem', selector: '0.25rem' },
    border: '1px',
    darkMode: true,
    noise: false,
  },
  {
    name: 'Corporate',
    colors: {
      primary: '#01579b',
      primaryContent: '#ffffff',
      secondary: '#455a64',
      secondaryContent: '#ffffff',
      accent: '#ffc107',
      accentContent: '#3e2e00',
      neutral: '#333333',
      neutralContent: '#ffffff',
      base100: '#ffffff',
      base200: '#f8fafc',
      base300: '#e2e8f0',
      baseContent: '#1e293b',
      info: '#0284c7',
      infoContent: '#ffffff',
      success: '#16a34a',
      successContent: '#ffffff',
      warning: '#d97706',
      warningContent: '#ffffff',
      error: '#dc2626',
      errorContent: '#ffffff',
    },
    shape: {
      radiusBox: '0.25rem',
      radiusField: '0.25rem',
      radiusSelector: '0.25rem',
    },
    size: { field: '0.25rem', selector: '0.25rem' },
    border: '1px',
    darkMode: false,
    noise: false,
  },
];

export const ThemePresets: FC<{
  onSelect: (config: ThemeConfig) => void;
}> = ({ onSelect }) => (
  <div className="grid grid-cols-3 gap-1">
    {PRESETS.map((preset) => (
      <button
        key={preset.name}
        className="btn btn-ghost h-auto flex-col gap-0 p-2"
        onClick={() => onSelect(preset)}>
        <div className="flex w-full gap-0.5">
          <div
            className="h-3 flex-1 rounded-l-sm"
            style={{ backgroundColor: preset.colors.primary }}
          />
          <div
            className="h-3 flex-1"
            style={{ backgroundColor: preset.colors.secondary }}
          />
          <div
            className="h-3 flex-1"
            style={{ backgroundColor: preset.colors.accent }}
          />
          <div
            className="h-3 flex-1 rounded-r-sm"
            style={{ backgroundColor: preset.colors.base100 }}
          />
        </div>
        <span className="text-[9px]">{preset.name}</span>
      </button>
    ))}
  </div>
);
ThemePresets.displayName = 'ThemePresets';
