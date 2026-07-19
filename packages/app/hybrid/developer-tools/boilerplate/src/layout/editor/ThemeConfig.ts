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
];

export const PRESET_LIST: ThemeConfig[] = PRESETS;
