import {
  formatRelativeTime,
  copyToClipboard,
  clearClipboardAfter,
  maskPassword,
} from '@/utils/format';

describe('formatRelativeTime', () => {
  const now = Date.now();

  it('returns just now for under a minute', () => {
    expect(formatRelativeTime(now - 30 * 1000)).toBe('just now');
  });

  it('returns minutes ago', () => {
    expect(formatRelativeTime(now - 5 * 60 * 1000)).toBe('5m ago');
  });

  it('returns hours ago', () => {
    expect(formatRelativeTime(now - 3 * 3600 * 1000)).toBe('3h ago');
  });

  it('returns days ago within a week', () => {
    expect(formatRelativeTime(now - 3 * 86400000)).toBe('3d ago');
  });

  it('returns locale date for older timestamps', () => {
    const ts = now - 30 * 86400000;
    expect(formatRelativeTime(ts)).toBe(new Date(ts).toLocaleDateString());
  });
});

describe('copyToClipboard', () => {
  const originalClipboard = navigator.clipboard;

  afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      configurable: true,
    });
  });

  it('returns true on success', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
    await expect(copyToClipboard('secret')).resolves.toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('secret');
  });

  it('returns false when clipboard is unavailable', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn().mockRejectedValue(new Error('denied')) },
      configurable: true,
    });
    await expect(copyToClipboard('secret')).resolves.toBe(false);
  });
});

describe('clearClipboardAfter', () => {
  const originalClipboard = navigator.clipboard;

  afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      configurable: true,
    });
    jest.useRealTimers();
  });

  it('clears the clipboard after the given seconds', () => {
    jest.useFakeTimers();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
    clearClipboardAfter(30);
    expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
    jest.advanceTimersByTime(30 * 1000);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('');
  });

  it('does nothing for zero or negative seconds', () => {
    jest.useFakeTimers();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
    clearClipboardAfter(0);
    clearClipboardAfter(-5);
    jest.advanceTimersByTime(120 * 1000);
    expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
  });
});

describe('maskPassword', () => {
  it('masks every character', () => {
    expect(maskPassword('abc')).toBe('•••');
  });

  it('returns empty for empty input', () => {
    expect(maskPassword('')).toBe('');
  });

  it('caps at 16 dots', () => {
    expect(maskPassword('a'.repeat(32))).toBe('•'.repeat(16));
  });
});
