export type Platform =
  'macos' | 'windows' | 'linux' | 'android' | 'ios' | 'unknown';

const detectPlatform = (): Platform => {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent.toLowerCase();
  if (/android/.test(ua)) return 'android';
  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (/macintosh|mac os x/.test(ua)) return 'macos';
  if (/win32|win64/.test(ua)) return 'windows';
  if (/linux/.test(ua)) return 'linux';
  return 'unknown';
};

export const PLATFORM_LABELS: Record<Platform, string> = {
  macos: 'macOS',
  windows: 'Windows',
  linux: 'Linux',
  android: 'Android',
  ios: 'iOS',
  unknown: 'Unknown',
};

export { detectPlatform };
