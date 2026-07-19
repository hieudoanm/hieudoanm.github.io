import { ARCH_LABELS, detectArchitecture } from '../os';
import type { Architecture } from '../os';

describe('detectArchitecture', () => {
  const originalNavigator = global.navigator;

  afterEach(() => {
    Object.defineProperty(global, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
  });

  it('returns arm64 for arm hint', () => {
    expect(detectArchitecture('arm', 'Mozilla/5.0 (Windows NT 10.0)')).toBe(
      'arm64'
    );
  });

  it('returns amd64 for x86 hint', () => {
    expect(detectArchitecture('x86', 'Mozilla/5.0 (Windows NT 10.0)')).toBe(
      'amd64'
    );
  });

  it('returns amd64 for amd64 Linux user agent', () => {
    expect(
      detectArchitecture(undefined, 'Mozilla/5.0 (X11; Linux x86_64)')
    ).toBe('amd64');
  });

  it('returns amd64 for arm64 Windows user agent', () => {
    expect(
      detectArchitecture(undefined, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)')
    ).toBe('amd64');
  });

  it('returns unknown for Mac user agent without arch hint', () => {
    expect(
      detectArchitecture(
        undefined,
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
      )
    ).toBe('unknown');
  });

  it('returns arm64 for aarch64 user agent', () => {
    expect(
      detectArchitecture(undefined, 'Mozilla/5.0 (X11; Linux aarch64)')
    ).toBe('arm64');
  });

  it('returns unknown for unrecognized user agent', () => {
    expect(detectArchitecture(undefined, 'SomeBot/1.0')).toBe('unknown');
  });

  it('returns unknown when navigator is undefined (SSR)', () => {
    Object.defineProperty(global, 'navigator', {
      value: undefined,
      writable: true,
      configurable: true,
    });
    expect(detectArchitecture()).toBe('unknown');
  });
});

describe('ARCH_LABELS', () => {
  it('has labels for all architectures', () => {
    const architectures: Architecture[] = ['amd64', 'arm64', 'unknown'];
    for (const a of architectures) {
      expect(ARCH_LABELS[a]).toBeTruthy();
      expect(typeof ARCH_LABELS[a]).toBe('string');
    }
  });

  it('has correct display names', () => {
    expect(ARCH_LABELS.amd64).toBe('AMD64');
    expect(ARCH_LABELS.arm64).toBe('ARM64');
  });
});
