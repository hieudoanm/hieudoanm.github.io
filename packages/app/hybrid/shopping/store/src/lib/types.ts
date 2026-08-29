export type SortKey = 'name' | 'category' | 'recent';

export type ViewMode = 'grid' | 'list';

export interface SectionMeta {
  label: string;
  description: string;
}

export const SECTION_META: Record<string, SectionMeta> = {
  hybrid: {
    label: 'Hybrid',
    description:
      'Cross-platform apps for macOS, Windows, Linux, Android, and iOS',
  },
  android: {
    label: 'Android',
    description: 'Native apps built for Android',
  },
  macos: {
    label: 'macOS',
    description: 'Native apps built for macOS',
  },
  cli: {
    label: 'CLIs',
    description: 'Command-line tools and binaries',
  },
};

export const ALL_PLATFORMS: { group: string; platforms: string[] }[] = [
  { group: 'Desktop', platforms: ['macos', 'windows', 'linux'] },
  { group: 'Mobile', platforms: ['android', 'ios'] },
  { group: 'Unknown', platforms: ['unknown'] },
];
