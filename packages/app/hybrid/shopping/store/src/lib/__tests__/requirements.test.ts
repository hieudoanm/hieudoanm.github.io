import type { AppData } from '../downloads';
import { getSystemRequirements } from '../requirements';

const baseApp: AppData = {
  slug: 'chess',
  label: 'Chess',
  primaryCategory: 'Games',
  secondaryCategory: 'Board',
  section: 'hybrid',
  icon: 'PiPackage',
  href: '/app/chess/',
  platforms: ['macos', 'android'],
  downloads: [],
  version: '1.0.0',
  lastUpdated: '2024-01-01',
  fileSize: '',
  screenshots: [],
};

describe('getSystemRequirements', () => {
  it('returns a row per platform', () => {
    const reqs = getSystemRequirements(baseApp);
    expect(reqs.map((r) => r.platform)).toEqual(['macos', 'android']);
    expect(reqs[0].os).toBe('macOS 12 or later');
    expect(reqs[1].os).toBe('Android 11 or later');
  });

  it('uses file size for disk when provided', () => {
    const reqs = getSystemRequirements({ ...baseApp, fileSize: '42 MB' });
    expect(reqs[0].disk).toBe('42 MB free');
  });

  it('falls back to a default disk value without a file size', () => {
    const reqs = getSystemRequirements(baseApp);
    expect(reqs[0].disk).toBe('500 MB free');
    expect(reqs[1].disk).toBe('250 MB free');
  });

  it('falls back to unknown row for empty platforms', () => {
    const reqs = getSystemRequirements({ ...baseApp, platforms: [] });
    expect(reqs).toHaveLength(1);
    expect(reqs[0].platform).toBe('unknown');
  });

  it('covers every platform label', () => {
    const app: AppData = {
      ...baseApp,
      platforms: ['windows', 'linux', 'ios'],
    };
    const reqs = getSystemRequirements(app);
    expect(reqs.map((r) => r.platform)).toEqual(['windows', 'linux', 'ios']);
    for (const r of reqs) {
      expect(r.os).toBeTruthy();
      expect(r.cpu).toBeTruthy();
      expect(r.memory).toBeTruthy();
    }
  });
});
