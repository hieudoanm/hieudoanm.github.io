import {
  formatRelativeTime,
  formatFileSize,
  formatDimensions,
  copyToClipboard,
} from '@/utils/format';

describe('formatRelativeTime', () => {
  it.each([
    [0, 'just now'],
    [30_000, 'just now'],
    [60_000, '1m ago'],
    [3_600_000, '1h ago'],
    [2 * 3_600_000, '2h ago'],
    [48 * 3_600_000, '2d ago'],
  ])('formats %d ms ago', (offset, expected) => {
    jest.spyOn(Date, 'now').mockReturnValue(1_000_000_000_000);
    expect(formatRelativeTime(1_000_000_000_000 - offset)).toBe(expected);
    jest.restoreAllMocks();
  });
});

describe('formatFileSize', () => {
  it.each([
    [0, '0 B'],
    [512, '512 B'],
    [1024, '1.0 KB'],
    [1536, '1.5 KB'],
    [1048576, '1.0 MB'],
  ])('formats %d bytes', (bytes, expected) => {
    expect(formatFileSize(bytes)).toBe(expected);
  });
});

describe('formatDimensions', () => {
  it('combines width and height', () => {
    expect(formatDimensions(1920, 1080)).toBe('1920 × 1080');
  });
});

describe('copyToClipboard', () => {
  it('returns true on success', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
    await expect(copyToClipboard('hi')).resolves.toBe(true);
  });

  it('returns false when the clipboard API rejects', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: jest.fn().mockRejectedValue(new Error('denied')) },
    });
    await expect(copyToClipboard('hi')).resolves.toBe(false);
  });
});
