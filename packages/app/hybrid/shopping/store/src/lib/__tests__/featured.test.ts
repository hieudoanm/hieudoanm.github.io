import type { AppData } from '../downloads';
import { FEATURED_SLUGS, isFeatured } from '../featured';

const makeApp = (slug: string): AppData => ({
  slug,
  label: slug,
  primaryCategory: 'Games',
  secondaryCategory: 'Board',
  section: 'hybrid',
  icon: 'PiPackage',
  href: `/app/${slug}/`,
  platforms: ['macos'],
  downloads: [],
  version: '1.0.0',
  lastUpdated: '2024-01-01',
  fileSize: '',
  screenshots: [],
});

describe('isFeatured', () => {
  it('returns true for featured slugs', () => {
    expect(isFeatured(makeApp('chess'))).toBe(true);
  });

  it('returns false for non-featured slugs', () => {
    expect(isFeatured(makeApp('not-featured'))).toBe(false);
  });

  it('exposes a curated list of slugs', () => {
    expect(FEATURED_SLUGS.length).toBeGreaterThan(0);
    expect(new Set(FEATURED_SLUGS).size).toBe(FEATURED_SLUGS.length);
  });
});
