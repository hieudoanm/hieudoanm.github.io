import type { ComparisonTab, TitleKey } from './types';

export const OPEN_TITLES: TitleKey[] = ['gm', 'im', 'fm', 'cm', 'nm'];
export const WOMAN_TITLES: TitleKey[] = ['wgm', 'wim', 'wfm', 'wcm', 'wnm'];
export const ALL_TITLES: readonly TitleKey[] = [
  ...OPEN_TITLES,
  ...WOMAN_TITLES,
];

export const COMPARISON_TABS: {
  key: ComparisonTab['key'];
  label: string;
  description: string;
}[] = [
  {
    key: 'all',
    label: 'All',
    description: 'Compared against all titled players in the database',
  },
  ...ALL_TITLES.map((title) => ({
    key: title,
    label: title.toUpperCase(),
    description: `Compared against ${title.toUpperCase()} players in the database`,
  })),
];

export const SQL_JS_CDN =
  'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.js';
export const SQL_WASM_CDN =
  'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.wasm';

export const COLORS: Record<string, string> = {
  gm: '#c9a84c',
  im: '#6fcfa4',
  fm: '#6fa0cf',
  cm: '#cf9f6f',
  nm: '#9f6fcf',
  wgm: '#c9a84c',
  wim: '#6fcfa4',
  wfm: '#6fa0cf',
  wcm: '#cf9f6f',
  wnm: '#9f6fcf',
};
