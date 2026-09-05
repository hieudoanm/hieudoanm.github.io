import { type Platform } from './os';

export interface DownloadOption {
  platform: Platform;
  label: string;
  url: string;
  recommended?: boolean;
}

export interface AppData {
  slug: string;
  label: string;
  primaryCategory: string;
  secondaryCategory: string;
  section: 'hybrid' | 'android' | 'macos' | 'cli' | 'extension';
  icon: string;
  href: string;
  platforms: Platform[];
  downloads: DownloadOption[];
  version: string;
  lastUpdated: string;
  fileSize: string;
  screenshots: string[];
}

const parsePlatformFromUrl = (url: string): Platform => {
  if (/android|apk|aab/.test(url)) return 'android';
  if (/macos|dmg/.test(url)) return 'macos';
  if (/ios/.test(url)) return 'ios';
  if (/windows|msi|exe/.test(url)) return 'windows';
  if (/linux|appimage|deb/.test(url)) return 'linux';
  return 'unknown';
};

const parsePlatformFromLabel = (label: string): Platform => {
  const lower = label.toLowerCase();
  if (/apk|aab/.test(lower)) return 'android';
  if (/dmg/.test(lower)) return 'macos';
  if (/ipa/.test(lower)) return 'ios';
  if (/msi|exe/.test(lower)) return 'windows';
  if (/appimage|deb|rpm/.test(lower)) return 'linux';
  return 'unknown';
};

const parsePlatformFromSection = (
  sectionId: string,
  _url: string
): Platform[] => {
  if (sectionId === 'apps-hybrid')
    return ['macos', 'windows', 'linux', 'android', 'ios'];
  if (sectionId === 'apps-native-android') return ['android'];
  if (sectionId === 'apps-native-macos') return ['macos'];
  if (sectionId === 'clis') return ['macos', 'linux'];
  if (sectionId === 'extensions') return ['macos', 'windows', 'linux'];
  return ['unknown'];
};

const parseSlug = (label: string): string =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const getDownloadFormat = (download: DownloadOption): string => {
  const match = download.url.match(/\.([a-z0-9]+)(?:$|\?)/i);
  return match ? match[1].toLowerCase() : 'other';
};

const RELEASES_BASE =
  'https://github.com/hieudoanm/hieudoanm.github.io/releases';

const parseReleaseTag = (url: string): string | undefined => {
  const match = url.match(/\/releases\/download\/([^/]+)\//);
  return match ? match[1] : undefined;
};

export const getReleasePageUrl = (app: AppData): string => {
  if (app.href.includes('/releases/tag/')) return app.href;
  const tag = app.downloads
    .map((d) => parseReleaseTag(d.url))
    .find((t): t is string => Boolean(t));
  return tag ? `${RELEASES_BASE}/tag/${tag}` : '';
};

export type RawSection = {
  id: string;
  label: string;
  items: {
    label: string;
    primaryCategory: string;
    secondaryCategory: string;
    icon: string;
    href: string;
    version: string;
    lastUpdated: string;
    fileSize: string;
    actions: { label: string; url: string }[];
  }[];
};

export const parseDownloads = (sections: RawSection[]): AppData[] => {
  const apps: AppData[] = [];

  for (const section of sections) {
    for (const item of section.items) {
      const platforms = parsePlatformFromSection(section.id, item.href);
      const downloads: DownloadOption[] = item.actions.map((action) => ({
        platform: section.id.startsWith('apps-native')
          ? parsePlatformFromUrl(action.url)
          : parsePlatformFromLabel(action.label),
        label: action.label,
        url: action.url,
      }));

      const sectionKey = section.id.startsWith('apps-native-')
        ? (section.id.replace('apps-native-', '') as 'android' | 'macos')
        : section.id === 'apps-hybrid'
          ? 'hybrid'
          : section.id === 'clis'
            ? 'cli'
            : 'extension';

      apps.push({
        slug: parseSlug(item.label),
        label: item.label,
        primaryCategory: item.primaryCategory,
        secondaryCategory: item.secondaryCategory,
        section: sectionKey,
        icon: item.icon,
        href: item.href,
        platforms,
        downloads,
        version: item.version || '1.0.0',
        lastUpdated: item.lastUpdated || '',
        fileSize: item.fileSize || '',
        screenshots: [],
      });
    }
  }

  return apps;
};

export const getRecommendedDownload = (
  app: AppData,
  currentPlatform: Platform
): DownloadOption | undefined =>
  app.downloads.find((d) => d.platform === currentPlatform);
