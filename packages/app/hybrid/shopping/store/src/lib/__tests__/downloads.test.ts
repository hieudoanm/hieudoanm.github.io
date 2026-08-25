import { parseDownloads, getRecommendedDownload } from '../downloads';
import type { RawSection } from '../downloads';

const mockSections: RawSection[] = [
  {
    id: 'apps-hybrid',
    label: 'Apps (Hybrid)',
    items: [
      {
        label: 'Test App',
        description: 'Developer Tools',
        icon: 'PiTerminal',
        href: 'https://github.com/test',
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
        description: 'Utilities',
        icon: 'PiGear',
        href: 'https://github.com/test',
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
        description: 'Utilities',
        icon: 'PiGear',
        href: 'https://github.com/test',
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
        description: 'Developer Tools',
        icon: 'PiTerminal',
        href: 'https://github.com/cli',
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
        description: 'Productivity',
        icon: 'PiGlobe',
        href: 'https://github.com/ext',
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
            description: 'Other',
            icon: 'PiPackage',
            href: 'https://test.com',
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
            description: 'Utility',
            icon: 'PiPackage',
            href: 'https://test.com',
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
            description: 'Utility',
            icon: 'PiPackage',
            href: 'https://test.com',
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
            description: 'Utility',
            icon: 'PiPackage',
            href: 'https://test.com',
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
            description: 'Utility',
            icon: 'PiPackage',
            href: 'https://test.com',
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
            description: 'Utility',
            icon: 'PiPackage',
            href: 'https://test.com',
            actions: [],
          },
        ],
      },
    ];
    const apps = parseDownloads(sections);
    expect(apps[0].slug).toBe('my-app');
  });

  it('parses real-world label format (Android APK, macOS DMG)', () => {
    const sections: RawSection[] = [
      {
        id: 'apps-hybrid',
        label: 'Apps',
        items: [
          {
            label: 'Real App',
            description: 'Utility',
            icon: 'PiPackage',
            href: 'https://test.com',
            actions: [
              { label: 'Android APK', url: 'https://test.com/app.apk' },
              { label: 'Android AAB', url: 'https://test.com/app.aab' },
              { label: 'macOS DMG', url: 'https://test.com/app.dmg' },
              { label: 'Linux AppImage', url: 'https://test.com/app.AppImage' },
              { label: 'Linux DEB', url: 'https://test.com/app.deb' },
              { label: 'Windows MSI', url: 'https://test.com/app.msi' },
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
