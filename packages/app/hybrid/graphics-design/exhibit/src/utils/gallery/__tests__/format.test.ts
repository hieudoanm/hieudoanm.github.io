import {
  copyToClipboard,
  formatDimensions,
  formatFileSize,
  formatRelativeTime,
  gradientFor,
  shadeColor,
} from '@/utils/gallery/format';

describe('formatRelativeTime', () => {
  const now = Date.now();

  it.each([
    [now, 'just now'],
    [now - 5 * 60000, '5m ago'],
    [now - 3 * 3600000, '3h ago'],
    [now - 2 * 86400000, '2d ago'],
    [now - 40 * 86400000, '1mo ago'],
    [now - 400 * 86400000, '1y ago'],
  ])('formats %d', (ts, expected) => {
    expect(formatRelativeTime(ts)).toBe(expected);
  });
});

describe('formatFileSize', () => {
  it.each([
    [512, '512 B'],
    [2048, '2.0 KB'],
    [2400000, '2.3 MB'],
  ])('formats %d bytes', (bytes, expected) => {
    expect(formatFileSize(bytes)).toBe(expected);
  });
});

describe('formatDimensions', () => {
  it('joins with a multiplication sign', () => {
    expect(formatDimensions(1920, 1080)).toBe('1920 × 1080');
  });
});

describe('shadeColor', () => {
  it('lightens and darkens hex colours', () => {
    expect(shadeColor('#000000', 51)).toBe('#333333');
    expect(shadeColor('#ffffff', -255)).toBe('#000000');
  });

  it('supports 3-digit hex', () => {
    expect(shadeColor('#000', 51)).toBe('#333333');
  });

  it('clamps out-of-range channels', () => {
    expect(shadeColor('#ffffff', 100)).toBe('#ffffff');
  });
});

describe('gradientFor', () => {
  it('builds a linear gradient string', () => {
    expect(gradientFor('#3b82f6')).toContain('linear-gradient(140deg');
  });
});

describe('copyToClipboard', () => {
  const original = navigator.clipboard;

  afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: original,
      configurable: true,
    });
  });

  it('returns true on success', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
    await expect(copyToClipboard('x')).resolves.toBe(true);
  });

  it('returns false when the clipboard rejects', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn().mockRejectedValue(new Error('nope')) },
      configurable: true,
    });
    await expect(copyToClipboard('x')).resolves.toBe(false);
  });
});
