import type { AppData } from './downloads';

export const FEATURED_SLUGS = [
  'api',
  'code',
  'database',
  'diagram',
  'markdown',
  'resume',
];

export const isFeatured = (app: AppData): boolean =>
  FEATURED_SLUGS.includes(app.slug);
