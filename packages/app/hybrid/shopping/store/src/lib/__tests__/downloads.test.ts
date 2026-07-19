import { parseDownloads, getRecommendedDownload } from '../downloads';
import type { RawSection } from '../downloads';

const mockSections: RawSection[] = [
  {
    id: 'apps-hybrid',
    label: 'Apps (Hybrid)',
    items: [
      {
        label: 'Test App',
        primaryCategory: 'Developer Tools',
        secondaryCategory: 'Utilities',
        icon: 'PiTerminal',
        href: 'https://github.com/test',
        version: '1.0.0',
        lastUpdated: '2025-01-01',
        fileSize: '10 MB',
        actions: [
          { label: '.dmg', url: 'https://example.com/test.dmg' },
          { label: '.apk', url: 'https://example.com/test.apk' },
        ],
      },
    ],
  },
  {
    id: 'apps-native-macos',
    label: 'Apps (macOS)',
    items: [
      {
        label: 'Native Mac App',
        primaryCategory: 'Utilities',
        secondaryCategory: 'System',
        icon: 'PiGear',
        href: 'https://github.com/test',
        version: '1.0.0',
        lastUpdated: '2025-01-01',
        fileSize: '',
        actions: [
          {
            label: '.dmg',
            url: 'https://github.com/test/releases/download/v1/MacApp-1.0.dmg',
          },
        ],
      },
    ],
  },
  {
    id: 'apps-native-android',
    label: 'Apps (Android)',
    items: [
      {
        label: 'Native Android App',
        primaryCategory: 'Utilities',
        secondaryCategory: 'System',
        icon: 'PiGear',
        href: 'https://github.com/test',
        version: '1.0.0',
        lastUpdated: '2025-01-01',
        fileSize: '',
        actions: [
          {
            label: '.apk',
            url: 'https://github.com/test/releases/download/v1/app-release.apk',
          },
        ],
      },
    ],
  },
  {
    id: 'clis',
    label: 'CLIs',
    items: [
      {
        label: 'CLI Tool',
        primaryCategory: 'Developer Tools',
        secondaryCategory: 'CLI',
        icon: 'PiTerminal',
        href: 'https://github.com/cli',
        version: '1.0.0',
        lastUpdated: '2025-01-01',
        fileSize: '',
        actions: [
          { label: '.dmg', url: 'https://example.com/cli.dmg' },
          { label: '.deb', url: 'https://example.com/cli.deb' },
        ],
      },
    ],
  },
  {
    id: 'extensions',
    label: 'Extensions',
    items: [
      {
        label: 'Browser Extension',
        primaryCategory: 'Productivity',
        secondaryCategory: 'Browser',
        icon: 'PiGlobe',
        href: 'https://github.com/ext',
        version: '1.0.0',
        lastUpdated: '2025-01-01',
        fileSize: '',
        actions: [
          { label: '.msi', url: 'https://example.com/ext.msi' },
          { label: '.appimage', url: 'https://example.com/ext.AppImage' },
        ],
      },
    ],
  },
];

describe('parseDownloads', () => {
  it('parses all sections into flat app list', () => {
    const apps = parseDownloads(mockSections);
    expect(apps).toHaveLength(5);
  });

  it('generates correct slugs', () => {
    const apps = parseDownloads(mockSections);
    expect(apps[0].slug).toBe('test-app');
    expect(apps[1].slug).toBe('native-mac-app');
    expect(apps[2].slug).toBe('native-android-app');
    expect(apps[3].slug).toBe('cli-tool');
    expect(apps[4].slug).toBe('browser-extension');
  });

  it('assigns correct section keys', () => {
    const apps = parseDownloads(mockSections);
    expect(apps[0].section).toBe('hybrid');
    expect(apps[1].section).toBe('macos');
    expect(apps[2].section).toBe('android');
    expect(apps[3].section).toBe('cli');
    expect(apps[4].section).toBe('extension');
  });

  it('detects platforms from section id for hybrid apps', () => {
    const apps = parseDownloads(mockSections);
    expect(apps[0].platforms).toContain('macos');
    expect(apps[0].platforms).toContain('android');
    expect(apps[0].platforms).toContain('windows');
    expect(apps[0].platforms).toContain('linux');
    expect(apps[0].platforms).toContain('ios');
  });

  it('detects platforms from section id for native apps', () => {
    const apps = parseDownloads(mockSections);
    expect(apps[1].platforms).toEqual(['macos']);
    expect(apps[2].platforms).toEqual(['android']);
  });

  it('detects platforms for cli section', () => {
    const apps = parseDownloads(mockSections);
    expect(apps[3].platforms).toEqual(['macos', 'linux']);
  });

  it('detects platforms for extension section', () => {
    const apps = parseDownloads(mockSections);
    expect(apps[4].platforms).toEqual(['macos', 'windows', 'linux']);
  });

  it('parses download platforms from label extensions', () => {
    const apps = parseDownloads(mockSections);
    const hybrid = apps[0];
    expect(hybrid.downloads[0].platform).toBe('macos');
    expect(hybrid.downloads[1].platform).toBe('android');
  });

  it('parses download platforms from URL for native apps', () => {
    const apps = parseDownloads(mockSections);
    const macNative = apps[1];
    expect(macNative.downloads[0].platform).toBe('macos');
  });

  it('parses cli download platforms from labels', () => {
    const apps = parseDownloads(mockSections);
    expect(apps[3].downloads[0].platform).toBe('macos');
    expect(apps[3].downloads[1].platform).toBe('linux');
  });

  it('parses extension download platforms from labels', () => {
    const apps = parseDownloads(mockSections);
    expect(apps[4].downloads[0].platform).toBe('windows');
    expect(apps[4].downloads[1].platform).toBe('linux');
  });

  it('returns unknown platform for unrecognized section', () => {
    const sections: RawSection[] = [
      {
        id: 'unknown-section',
        label: 'Unknown',
        items: [
          {
            label: 'Unknown App',
            primaryCategory: 'Other',
            secondaryCategory: 'Misc',
            icon: 'PiPackage',
            href: 'https://test.com',
            version: '',
            lastUpdated: '',
            fileSize: '',
            actions: [{ label: '.bin', url: 'https://test.com/file.bin' }],
          },
        ],
      },
    ];
    const apps = parseDownloads(sections);
    expect(apps[0].platforms).toEqual(['unknown']);
    expect(apps[0].section).toBe('extension');
  });

  it('parses ios download from label', () => {
    const sections: RawSection[] = [
      {
        id: 'apps-hybrid',
        label: 'Apps',
        items: [
          {
            label: 'iOS App',
            primaryCategory: 'Utility',
            secondaryCategory: 'General',
            icon: 'PiPackage',
            href: 'https://test.com',
            version: '',
            lastUpdated: '',
            fileSize: '',
            actions: [{ label: '.ipa', url: 'https://test.com/app.ipa' }],
          },
        ],
      },
    ];
    const apps = parseDownloads(sections);
    expect(apps[0].downloads[0].platform).toBe('ios');
  });

  it('parses ios download from URL for native', () => {
    const sections: RawSection[] = [
      {
        id: 'apps-native-macos',
        label: 'Apps',
        items: [
          {
            label: 'App',
            primaryCategory: 'Utility',
            secondaryCategory: 'General',
            icon: 'PiPackage',
            href: 'https://test.com',
            version: '',
            lastUpdated: '',
            fileSize: '',
            actions: [
              { label: 'Download', url: 'https://test.com/ios-release.ipa' },
            ],
          },
        ],
      },
    ];
    const apps = parseDownloads(sections);
    expect(apps[0].downloads[0].platform).toBe('ios');
  });

  it('returns unknown platform for unrecognized label', () => {
    const sections: RawSection[] = [
      {
        id: 'apps-hybrid',
        label: 'Apps',
        items: [
          {
            label: 'App',
            primaryCategory: 'Utility',
            secondaryCategory: 'General',
            icon: 'PiPackage',
            href: 'https://test.com',
            version: '',
            lastUpdated: '',
            fileSize: '',
            actions: [{ label: 'Download', url: 'https://test.com/file' }],
          },
        ],
      },
    ];
    const apps = parseDownloads(sections);
    expect(apps[0].downloads[0].platform).toBe('unknown');
  });

  it('returns unknown platform for unrecognized URL', () => {
    const sections: RawSection[] = [
      {
        id: 'apps-native-macos',
        label: 'Apps',
        items: [
          {
            label: 'App',
            primaryCategory: 'Utility',
            secondaryCategory: 'General',
            icon: 'PiPackage',
            href: 'https://test.com',
            version: '',
            lastUpdated: '',
            fileSize: '',
            actions: [{ label: 'Download', url: 'https://test.com/file.bin' }],
          },
        ],
      },
    ];
    const apps = parseDownloads(sections);
    expect(apps[0].downloads[0].platform).toBe('unknown');
  });

  it('returns empty array for empty sections', () => {
    expect(parseDownloads([])).toEqual([]);
  });

  it('handles slug with leading/trailing dashes', () => {
    const sections: RawSection[] = [
      {
        id: 'apps-hybrid',
        label: 'Apps',
        items: [
          {
            label: '  My App  ',
            primaryCategory: 'Utility',
            secondaryCategory: 'General',
            icon: 'PiPackage',
            href: 'https://test.com',
            version: '',
            lastUpdated: '',
            fileSize: '',
            actions: [],
          },
        ],
      },
    ];
    const apps = parseDownloads(sections);
    expect(apps[0].slug).toBe('my-app');
  });

  it('parses real-world label format', () => {
    const sections: RawSection[] = [
      {
        id: 'apps-hybrid',
        label: 'Apps',
        items: [
          {
            label: 'Real App',
            primaryCategory: 'Utility',
            secondaryCategory: 'General',
            icon: 'PiPackage',
            href: 'https://test.com',
            version: '2.0.0',
            lastUpdated: '2025-06-01',
            fileSize: '15 MB',
            actions: [
              { label: '.aab', url: 'https://test.com/app.aab' },
              { label: '.apk', url: 'https://test.com/app.apk' },
              { label: '.dmg', url: 'https://test.com/app.dmg' },
              { label: '.AppImage', url: 'https://test.com/app.AppImage' },
              { label: '.deb', url: 'https://test.com/app.deb' },
              { label: '.msi', url: 'https://test.com/app.msi' },
            ],
          },
        ],
      },
    ];
    const apps = parseDownloads(sections);
    const dls = apps[0].downloads;
    expect(dls[0].platform).toBe('android');
    expect(dls[1].platform).toBe('android');
    expect(dls[2].platform).toBe('macos');
    expect(dls[3].platform).toBe('linux');
    expect(dls[4].platform).toBe('linux');
    expect(dls[5].platform).toBe('windows');
  });

  it('includes version metadata in parsed apps', () => {
    const apps = parseDownloads(mockSections);
    expect(apps[0].version).toBe('1.0.0');
    expect(apps[0].lastUpdated).toBe('2025-01-01');
    expect(apps[0].fileSize).toBe('10 MB');
    expect(apps[0].screenshots).toEqual([]);
  });
});

describe('getRecommendedDownload', () => {
  it('returns macos download for macos platform', () => {
    const apps = parseDownloads(mockSections);
    const rec = getRecommendedDownload(apps[0], 'macos');
    expect(rec?.platform).toBe('macos');
  });

  it('returns android download for android platform', () => {
    const apps = parseDownloads(mockSections);
    const rec = getRecommendedDownload(apps[0], 'android');
    expect(rec?.platform).toBe('android');
  });

  it('returns first download for unknown platform', () => {
    const apps = parseDownloads(mockSections);
    const rec = getRecommendedDownload(apps[0], 'unknown');
    expect(rec).toBeUndefined();
  });

  it('returns undefined if platform not available', () => {
    const apps = parseDownloads(mockSections);
    const rec = getRecommendedDownload(apps[1], 'windows');
    expect(rec).toBeUndefined();
  });
});
