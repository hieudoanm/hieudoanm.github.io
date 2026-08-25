import { PLATFORM_LABELS, PLATFORM_ICONS } from '../os';
import type { Platform } from '../os';

describe('PLATFORM_LABELS', () => {
  it('has labels for all platforms', () => {
    const platforms: Platform[] = [
      'macos',
      'windows',
      'linux',
      'android',
      'ios',
      'unknown',
    ];
    for (const p of platforms) {
      expect(PLATFORM_LABELS[p]).toBeTruthy();
      expect(typeof PLATFORM_LABELS[p]).toBe('string');
    }
  });

  it('has correct display names', () => {
    expect(PLATFORM_LABELS.macos).toBe('macOS');
    expect(PLATFORM_LABELS.windows).toBe('Windows');
    expect(PLATFORM_LABELS.linux).toBe('Linux');
    expect(PLATFORM_LABELS.android).toBe('Android');
    expect(PLATFORM_LABELS.ios).toBe('iOS');
  });
});

describe('PLATFORM_ICONS', () => {
  it('has icons for all platforms', () => {
    const platforms: Platform[] = [
      'macos',
      'windows',
      'linux',
      'android',
      'ios',
      'unknown',
    ];
    for (const p of platforms) {
      expect(PLATFORM_ICONS[p]).toBeTruthy();
    }
  });
});
