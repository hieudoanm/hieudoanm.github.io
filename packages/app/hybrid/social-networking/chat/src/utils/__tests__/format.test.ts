import {
  formatRelativeTime,
  formatAbsoluteTime,
  truncateText,
  copyToClipboard,
  downloadFile,
  exportAsMarkdown,
  exportAsJSON,
} from '@/utils/format';

describe('formatRelativeTime', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 0, 15, 12, 0, 0));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns "just now" for less than a minute', () => {
    expect(formatRelativeTime(Date.now() - 1000)).toBe('just now');
  });

  it('returns minutes ago', () => {
    expect(formatRelativeTime(Date.now() - 60000 * 5)).toBe('5 min ago');
  });

  it('returns hours ago', () => {
    expect(formatRelativeTime(Date.now() - 3600000 * 3)).toBe('3h ago');
  });

  it('returns days ago', () => {
    expect(formatRelativeTime(Date.now() - 86400000 * 4)).toBe('4d ago');
  });

  it('returns a locale date for a week or more ago', () => {
    expect(formatRelativeTime(Date.now() - 86400000 * 10)).toContain('2026');
  });
});

describe('formatAbsoluteTime', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 0, 15, 12, 0, 0));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('formats a timestamp as a locale string', () => {
    expect(formatAbsoluteTime(Date.now())).toContain('2026');
  });
});

describe('truncateText', () => {
  it('truncates text longer than maxLength', () => {
    expect(truncateText('abcdefghij', 5)).toBe('abcde...');
  });

  it('returns text unchanged when within maxLength', () => {
    expect(truncateText('abc', 5)).toBe('abc');
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

describe('downloadFile', () => {
  const clickSpy = jest
    .spyOn(HTMLAnchorElement.prototype, 'click')
    .mockImplementation(() => {});
  const revokeSpy = jest.fn();
  const createUrlSpy = jest.fn().mockReturnValue('blob:mock');

  beforeEach(() => {
    clickSpy.mockClear();
    revokeSpy.mockClear();
    createUrlSpy.mockClear();
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: createUrlSpy,
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: revokeSpy,
    });
  });

  afterEach(() => {
    delete (URL as unknown as Record<string, unknown>).createObjectURL;
    delete (URL as unknown as Record<string, unknown>).revokeObjectURL;
  });

  it('creates a download link and clicks it', () => {
    downloadFile('content', 'notes.txt');
    expect(createUrlSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(revokeSpy).toHaveBeenCalledWith('blob:mock');
  });
});

describe('exportAsMarkdown', () => {
  it('renders a header and roles', () => {
    const out = exportAsMarkdown('Title', [
      { role: 'user', content: 'Hello', timestamp: 1000 },
      { role: 'assistant', content: 'Hi', timestamp: 2000 },
    ]);
    expect(out).toContain('# Title');
    expect(out).toContain('## You');
    expect(out).toContain('Hello');
    expect(out).toContain('## Assistant');
    expect(out).toContain('Hi');
  });
});

describe('exportAsJSON', () => {
  it('stringifies the conversation and messages with exportedAt', () => {
    const parsed = JSON.parse(
      exportAsJSON({ id: 'conv-1' }, [{ id: 'msg-1' }])
    );
    expect(parsed.conversation).toEqual({ id: 'conv-1' });
    expect(parsed.messages).toEqual([{ id: 'msg-1' }]);
    expect(parsed.exportedAt).toEqual(expect.any(Number));
  });
});
