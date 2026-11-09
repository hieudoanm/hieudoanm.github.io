export type Platform =
  'macos' | 'windows' | 'linux' | 'android' | 'ios' | 'unknown';

export type Architecture = 'amd64' | 'arm64' | 'unknown';

export const detectPlatform = (): Platform => {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent.toLowerCase();
  if (/android/.test(ua)) return 'android';
  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (/macintosh|mac os x/.test(ua)) return 'macos';
  if (/win32|win64/.test(ua)) return 'windows';
  if (/linux/.test(ua)) return 'linux';
  return 'unknown';
};

export const detectArchitecture = (
  architecture?: string,
  ua?: string
): Architecture => {
  const raw = (
    ua ?? (typeof navigator !== 'undefined' ? navigator.userAgent : '')
  ).toLowerCase();

  if (
    architecture === 'arm' ||
    architecture === 'arm64' ||
    architecture === 'aarch64'
  )
    return 'arm64';
  if (
    architecture === 'x86' ||
    architecture === 'x86_64' ||
    architecture === 'amd64'
  )
    return 'amd64';

  if (/macintosh|mac os x/.test(raw)) return 'unknown';
  if (/arm64|aarch64|armv[0-9]/.test(raw)) return 'arm64';
  if (/x86_64|amd64|x64|win64|wow64|i[3-6]86/.test(raw)) return 'amd64';
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

export const ARCH_LABELS: Record<Architecture, string> = {
  amd64: 'AMD64',
  arm64: 'ARM64',
  unknown: 'Unknown',
};
