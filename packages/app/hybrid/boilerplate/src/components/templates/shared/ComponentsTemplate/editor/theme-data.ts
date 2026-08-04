import { PRESET_LIST, ThemeConfig } from './ThemeConfig';

interface ThemeOption {
  value: string;
  label: string;
}

interface ThemeGroup {
  label: string;
  themes: ThemeOption[];
}

export const THEME_GROUPS: ThemeGroup[] = [
  {
    label: 'Light',
    themes: [
      { value: 'light', label: 'Light' },
      { value: 'cupcake', label: 'Cupcake' },
      { value: 'bumblebee', label: 'Bumblebee' },
      { value: 'emerald', label: 'Emerald' },
      { value: 'corporate', label: 'Corporate' },
      { value: 'garden', label: 'Garden' },
      { value: 'aqua', label: 'Aqua' },
      { value: 'lofi', label: 'Lofi' },
      { value: 'pastel', label: 'Pastel' },
      { value: 'fantasy', label: 'Fantasy' },
      { value: 'lemonade', label: 'Lemonade' },
      { value: 'winter', label: 'Winter' },
      { value: 'autumn', label: 'Autumn' },
      { value: 'nord', label: 'Nord' },
      { value: 'retro', label: 'Retro' },
    ],
  },
  {
    label: 'Dark',
    themes: [
      { value: 'nothing', label: 'Nothing' },
      { value: 'dark', label: 'Dark' },
      { value: 'night', label: 'Night' },
      { value: 'dim', label: 'Dim' },
      { value: 'forest', label: 'Forest' },
      { value: 'black', label: 'Black' },
      { value: 'luxury', label: 'Luxury' },
      { value: 'dracula', label: 'Dracula' },
      { value: 'coffee', label: 'Coffee' },
      { value: 'sunset', label: 'Sunset' },
      { value: 'synthwave', label: 'Synthwave' },
      { value: 'halloween', label: 'Halloween' },
    ],
  },
  {
    label: 'Vibrant',
    themes: [
      { value: 'cyberpunk', label: 'Cyberpunk' },
      { value: 'valentine', label: 'Valentine' },
      { value: 'wireframe', label: 'Wireframe' },
      { value: 'cmyk', label: 'CMYK' },
      { value: 'business', label: 'Business' },
      { value: 'acid', label: 'Acid' },
    ],
  },
];

export const ALL_THEMES = [
  ...THEME_GROUPS.flatMap((g) => g.themes),
  { value: 'nothing', label: 'Nothing' },
];

export const PRESET_MAP: Record<string, ThemeConfig> = Object.fromEntries(
  PRESET_LIST.map((p) => [p.name.toLowerCase(), p])
);

export const COLOR_GROUPS = [
  {
    label: 'Primary',
    items: [
      { key: 'primary', label: 'Primary' },
      { key: 'primaryContent', label: 'Content' },
    ],
  },
  {
    label: 'Secondary',
    items: [
      { key: 'secondary', label: 'Secondary' },
      { key: 'secondaryContent', label: 'Content' },
    ],
  },
  {
    label: 'Accent',
    items: [
      { key: 'accent', label: 'Accent' },
      { key: 'accentContent', label: 'Content' },
    ],
  },
  {
    label: 'Neutral',
    items: [
      { key: 'neutral', label: 'Neutral' },
      { key: 'neutralContent', label: 'Content' },
    ],
  },
  {
    label: 'Base',
    items: [
      { key: 'base100', label: 'Base 100' },
      { key: 'base200', label: 'Base 200' },
      { key: 'base300', label: 'Base 300' },
      { key: 'baseContent', label: 'Content' },
    ],
  },
  {
    label: 'Info',
    items: [
      { key: 'info', label: 'Info' },
      { key: 'infoContent', label: 'Content' },
    ],
  },
  {
    label: 'Success',
    items: [
      { key: 'success', label: 'Success' },
      { key: 'successContent', label: 'Content' },
    ],
  },
  {
    label: 'Warning',
    items: [
      { key: 'warning', label: 'Warning' },
      { key: 'warningContent', label: 'Content' },
    ],
  },
  {
    label: 'Error',
    items: [
      { key: 'error', label: 'Error' },
      { key: 'errorContent', label: 'Content' },
    ],
  },
];

export const RADIUS_OPTIONS = ['0rem', '0.25rem', '0.5rem', '1rem', '2rem'];
export const SIZE_OPTIONS = ['0rem', '0.25rem', '0.5rem', '0.75rem', '1rem'];
export const BORDER_OPTIONS = ['0px', '1px', '2px', '3px'];
