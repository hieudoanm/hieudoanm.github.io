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
  description: string;
  category: string;
  section: 'hybrid' | 'android' | 'macos' | 'cli' | 'extension';
  icon: string;
  href: string;
  platforms: Platform[];
  downloads: DownloadOption[];
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
  if (/appimage|deb/.test(lower)) return 'linux';
  return 'unknown';
};

const parsePlatformFromSection = (
  sectionId: string,
  url: string
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

export type RawSection = {
  id: string;
  label: string;
  items: {
    label: string;
    description: string;
    icon: string;
    href: string;
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
        description: item.description,
        category: section.id,
        section: sectionKey,
        icon: item.icon,
        href: item.href,
        platforms,
        downloads,
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
