import { detectPlatform } from '../os';

describe('detectPlatform', () => {
  const originalNavigator = global.navigator;

  afterEach(() => {
    Object.defineProperty(global, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
  });

  const mockNavigator = (ua: string) => {
    Object.defineProperty(global, 'navigator', {
      value: { userAgent: ua },
      writable: true,
      configurable: true,
    });
  };

  it('returns macos for Mac user agent', () => {
    mockNavigator(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    );
    expect(detectPlatform()).toBe('macos');
  });

  it('returns windows for Windows user agent', () => {
    mockNavigator(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    );
    expect(detectPlatform()).toBe('windows');
  });

  it('returns linux for Linux user agent', () => {
    mockNavigator('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36');
    expect(detectPlatform()).toBe('linux');
  });

  it('returns android for Android user agent', () => {
    mockNavigator('Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36');
    expect(detectPlatform()).toBe('android');
  });

  it('returns ios for iPhone user agent', () => {
    mockNavigator(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
    );
    expect(detectPlatform()).toBe('ios');
  });

  it('returns ios for iPad user agent', () => {
    mockNavigator(
      'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
    );
    expect(detectPlatform()).toBe('ios');
  });

  it('returns ios for iPod user agent', () => {
    mockNavigator(
      'Mozilla/5.0 (iPod; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
    );
    expect(detectPlatform()).toBe('ios');
  });

  it('returns unknown for unrecognized user agent', () => {
    mockNavigator('SomeBot/1.0');
    expect(detectPlatform()).toBe('unknown');
  });

  it('returns unknown when navigator is undefined (SSR)', () => {
    Object.defineProperty(global, 'navigator', {
      value: undefined,
      writable: true,
      configurable: true,
    });
    expect(detectPlatform()).toBe('unknown');
  });
});
