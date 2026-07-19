import type { AppData } from './downloads';

export const FEATURED_SLUGS = [
  '8-bit',
  'chess',
  'calendar',
  'clock',
  'csv',
  'database',
];

export const isFeatured = (app: AppData): boolean =>
  FEATURED_SLUGS.includes(app.slug);
