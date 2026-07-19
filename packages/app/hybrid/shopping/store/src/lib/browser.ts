import type { DownloadOption } from './downloads';
import { getDownloadFormat } from './downloads';

export type Browser =
  | 'chrome'
  | 'firefox'
  | 'safari'
  | 'edge'
  | 'opera'
  | 'brave'
  | 'vivaldi'
  | 'unknown';

export type Engine = 'blink' | 'gecko' | 'webkit' | 'unknown';

export interface BrowserInfo {
  browser: Browser;
  engine: Engine;
  version: string;
  isMobile: boolean;
}

const parseVersion = (regex: RegExp, ua: string): string => {
  const match = ua.match(regex);
  return match?.[1] ?? '0';
};

export const detectBrowser = (ua?: string): BrowserInfo => {
  const raw =
    ua ?? (typeof navigator !== 'undefined' ? navigator.userAgent : '');
  const lower = raw.toLowerCase();

  const isMobile = /mobile|android|iphone|ipad|ipod/.test(lower);

  // Brave overrides User-Agent — check before Chrome
  if (lower.includes('brave/')) {
    return {
      browser: 'brave',
      engine: 'blink',
      version: parseVersion(/brave\/([\d.]+)/, lower),
      isMobile,
    };
  }

  // Opera / Opera GX
  if (lower.includes('opr/') || lower.includes('opera/')) {
    return {
      browser: 'opera',
      engine: lower.includes('opr/') ? 'blink' : 'webkit',
      version: parseVersion(/(?:opr|opera)[\s/]([\d.]+)/, lower),
      isMobile,
    };
  }

  // Edge (Chromium-based)
  if (lower.includes('edg/')) {
    return {
      browser: 'edge',
      engine: 'blink',
      version: parseVersion(/edg\/([\d.]+)/, lower),
      isMobile,
    };
  }

  // Vivaldi
  if (lower.includes('vivaldi/')) {
    return {
      browser: 'vivaldi',
      engine: 'blink',
      version: parseVersion(/vivaldi\/([\d.]+)/, lower),
      isMobile,
    };
  }

  // Chrome / Chromium (must be after Vivaldi since Vivaldi UA contains Chrome/)
  if (
    lower.includes('chrome/') &&
    !lower.includes('edg/') &&
    !lower.includes('opr/')
  ) {
    return {
      browser: 'chrome',
      engine: 'blink',
      version: parseVersion(/chrome\/([\d.]+)/, lower),
      isMobile,
    };
  }

  // Firefox
  if (lower.includes('firefox/')) {
    return {
      browser: 'firefox',
      engine: 'gecko',
      version: parseVersion(/firefox\/([\d.]+)/, lower),
      isMobile,
    };
  }

  // Safari (must be last — Chrome UA also contains Safari)
  if (lower.includes('safari/') && lower.includes('version/')) {
    return {
      browser: 'safari',
      engine: 'webkit',
      version: parseVersion(/version\/([\d.]+)/, lower),
      isMobile,
    };
  }

  return { browser: 'unknown', engine: 'unknown', version: '0', isMobile };
};

export const BROWSER_LABELS: Record<Browser, string> = {
  chrome: 'Chrome',
  firefox: 'Firefox',
  safari: 'Safari',
  edge: 'Edge',
  opera: 'Opera',
  brave: 'Brave',
  vivaldi: 'Vivaldi',
  unknown: 'Unknown',
};

export const ENGINE_LABELS: Record<Engine, string> = {
  blink: 'Blink',
  gecko: 'Gecko',
  webkit: 'WebKit',
  unknown: 'Unknown',
};

export const BROWSER_TO_FORMAT: Record<Browser, string> = {
  chrome: 'crx',
  edge: 'crx',
  opera: 'crx',
  brave: 'crx',
  vivaldi: 'crx',
  firefox: 'xpi',
  safari: 'zip',
  unknown: 'zip',
};

export const recommendExtension = (
  downloads: DownloadOption[],
  browser: Browser
): DownloadOption | undefined =>
  downloads.find(
    (download) => getDownloadFormat(download) === BROWSER_TO_FORMAT[browser]
  );
