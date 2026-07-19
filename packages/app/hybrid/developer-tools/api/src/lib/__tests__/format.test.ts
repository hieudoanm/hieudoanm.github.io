import {
  formatBytes,
  formatMs,
  formatRelativeTime,
  isJson,
  prettyPrint,
  previewKind,
  statusColor,
} from '@/lib/format';

describe('isJson', () => {
  it('returns true for valid json', () => {
    expect(isJson('{"a":1}')).toBe(true);
    expect(isJson('[1,2]')).toBe(true);
  });

  it('returns false for invalid json', () => {
    expect(isJson('not json')).toBe(false);
    expect(isJson('')).toBe(false);
  });
});

describe('prettyPrint', () => {
  it('pretty prints json', () => {
    expect(prettyPrint('{"a":1}')).toBe('{\n  "a": 1\n}');
  });

  it('returns text unchanged for non-json', () => {
    expect(prettyPrint('plain text')).toBe('plain text');
  });
});

describe('formatBytes', () => {
  it('formats bytes', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(1023)).toBe('1023 B');
    expect(formatBytes(1024)).toBe('1.0 KB');
    expect(formatBytes(1536)).toBe('1.5 KB');
    expect(formatBytes(1048576)).toBe('1.0 MB');
  });
});

describe('formatMs', () => {
  it('formats milliseconds', () => {
    expect(formatMs(123)).toBe('123 ms');
  });
});

describe('statusColor', () => {
  it('maps status ranges to badges', () => {
    expect(statusColor(200)).toBe('badge-success');
    expect(statusColor(302)).toBe('badge-warning');
    expect(statusColor(404)).toBe('badge-error');
    expect(statusColor(100)).toBe('badge-neutral');
  });
});

describe('formatRelativeTime', () => {
  it('formats relative time', () => {
    expect(formatRelativeTime(Date.now())).toBe('just now');
    expect(formatRelativeTime(Date.now() - 5 * 60000)).toBe('5m ago');
    expect(formatRelativeTime(Date.now() - 3 * 3600000)).toBe('3h ago');
    expect(formatRelativeTime(Date.now() - 2 * 86400000)).toBe('2d ago');
  });
});

describe('previewKind', () => {
  it('detects json content type', () => {
    expect(previewKind({ 'content-type': 'application/json' })).toBe('json');
  });

  it('detects html content type', () => {
    expect(previewKind({ 'content-type': 'text/html; charset=utf-8' })).toBe(
      'html'
    );
  });

  it('detects text content type', () => {
    expect(previewKind({ 'content-type': 'text/plain' })).toBe('text');
  });

  it('treats xml as text', () => {
    expect(previewKind({ 'content-type': 'application/xml' })).toBe('text');
  });

  it('falls back to raw for other types', () => {
    expect(previewKind({ 'content-type': 'image/png' })).toBe('raw');
    expect(previewKind({})).toBe('raw');
  });
});
