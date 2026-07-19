import type { AppData } from './downloads';
import type { Platform } from './os';

export interface SystemRequirement {
  platform: Platform;
  os: string;
  cpu: string;
  memory: string;
  disk: string;
}

const BASE_REQUIREMENTS: Record<
  Platform,
  Omit<SystemRequirement, 'platform'>
> = {
  macos: {
    os: 'macOS 12 or later',
    cpu: 'Intel or Apple Silicon',
    memory: '4 GB RAM',
    disk: '500 MB free',
  },
  windows: {
    os: 'Windows 10 20H2 or later',
    cpu: '1.4 GHz 64-bit processor',
    memory: '4 GB RAM',
    disk: '500 MB free',
  },
  linux: {
    os: 'Ubuntu 22.04 or later',
    cpu: '64-bit x86 / arm64',
    memory: '4 GB RAM',
    disk: '500 MB free',
  },
  android: {
    os: 'Android 11 or later',
    cpu: 'Quad-core 1.5 GHz',
    memory: '2 GB RAM',
    disk: '250 MB free',
  },
  ios: {
    os: 'iOS 16 or later',
    cpu: 'A12 Bionic or newer',
    memory: '2 GB RAM',
    disk: '250 MB free',
  },
  unknown: {
    os: 'Modern web browser',
    cpu: 'Latest browser version',
    memory: 'Active internet connection',
    disk: 'Varies by target',
  },
};

export const getSystemRequirements = (app: AppData): SystemRequirement[] => {
  const platforms: Platform[] =
    app.platforms.length > 0 ? app.platforms : ['unknown'];
  return platforms.map((platform) => {
    const base = BASE_REQUIREMENTS[platform] ?? BASE_REQUIREMENTS.unknown;
    return {
      platform,
      ...base,
      disk: app.fileSize ? `${app.fileSize} free` : base.disk,
    };
  });
};
