import {
  formatRelativeTime,
  formatDate,
  copyToClipboard,
} from '@/utils/format';

describe('formatRelativeTime', () => {
  it('returns "just now" for less than a minute', () => {
    expect(formatRelativeTime(Date.now() - 1000)).toBe('just now');
  });

  it('returns minutes ago', () => {
    expect(formatRelativeTime(Date.now() - 60000 * 5)).toBe('5m ago');
  });

  it('returns hours ago', () => {
    expect(formatRelativeTime(Date.now() - 3600000 * 3)).toBe('3h ago');
  });

  it('returns days ago', () => {
    expect(formatRelativeTime(Date.now() - 86400000 * 4)).toBe('4d ago');
  });
});

describe('formatDate', () => {
  it('formats a timestamp as a locale date string', () => {
    const d = new Date(2026, 0, 15).getTime();
    expect(formatDate(d)).toContain('2026');
    expect(formatDate(d)).toContain('Jan');
  });
});

describe('copyToClipboard', () => {
  const writeText = jest.fn();

  beforeEach(() => {
    writeText.mockReset();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
  });

  it('returns true when the write succeeds', async () => {
    writeText.mockResolvedValue(undefined);
    await expect(copyToClipboard('hello')).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith('hello');
  });

  it('returns false when the write fails', async () => {
    writeText.mockRejectedValue(new Error('denied'));
    await expect(copyToClipboard('hello')).resolves.toBe(false);
  });
});
