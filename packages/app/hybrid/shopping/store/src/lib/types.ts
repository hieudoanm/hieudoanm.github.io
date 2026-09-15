export type SortKey = 'name' | 'category' | 'recent';

export type ViewMode = 'grid' | 'list' | 'gallery';

export interface SectionMeta {
  label: string;
  description: string;
}

export const SECTION_META: Record<string, SectionMeta> = {
  extension: {
    label: 'Extensions',
    description:
      'Browser extensions for Browsers or Native Apps (Android and macOS)',
  },
  headless: {
    label: 'Headless',
    description: 'Headless services and in-memory data apps',
  },
  hybrid: {
    label: 'Hybrid',
    description:
      'Cross-platform apps for macOS, Windows, Linux, Android, and iOS',
  },
};

export const ALL_PLATFORMS: { group: string; platforms: string[] }[] = [
  { group: 'Desktop', platforms: ['macos', 'windows', 'linux'] },
  { group: 'Mobile', platforms: ['android', 'ios'] },
  { group: 'Unknown', platforms: ['unknown'] },
];
