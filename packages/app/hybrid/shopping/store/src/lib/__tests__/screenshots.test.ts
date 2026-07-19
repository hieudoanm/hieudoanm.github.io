import type { AppData } from '../downloads';
import { getAppScreenshots } from '../screenshots';

const mockApp: AppData = {
  slug: 'chess',
  label: 'Chess',
  primaryCategory: 'Games',
  secondaryCategory: 'Board',
  section: 'hybrid',
  icon: 'PiPackage',
  href: '/app/chess/',
  platforms: ['macos', 'ios'],
  downloads: [],
  version: '1.0.0',
  lastUpdated: '2024-01-01',
  fileSize: '10 MB',
  screenshots: [],
};

describe('getAppScreenshots', () => {
  it('returns three data-uri screenshots', () => {
    const uris = getAppScreenshots(mockApp);
    expect(uris).toHaveLength(3);
    for (const uri of uris) {
      expect(uri.startsWith('data:image/svg+xml;utf8,')).toBe(true);
    }
  });

  it('embeds the app label in each screenshot', () => {
    const uris = getAppScreenshots(mockApp);
    for (const uri of uris) {
      expect(decodeURIComponent(uri)).toContain('Chess');
    }
  });

  it('produces distinct screenshots', () => {
    const uris = getAppScreenshots(mockApp);
    expect(new Set(uris).size).toBe(3);
  });

  it('escapes XML special characters in the label', () => {
    const app = { ...mockApp, label: 'A&B <App>' };
    const [uri] = getAppScreenshots(app);
    const decoded = decodeURIComponent(uri);
    expect(decoded).toContain('A&amp;B &lt;App&gt;');
  });
});
