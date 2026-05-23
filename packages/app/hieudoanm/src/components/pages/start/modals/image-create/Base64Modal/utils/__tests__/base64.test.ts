import {
  extractBase64,
  isImageMime,
  sniffMime,
  dataUrlFromMime,
} from '../base64';

describe('extractBase64', () => {
  it('extracts base64 after comma', () => {
    expect(extractBase64('data:image/png;base64,abc123')).toBe('abc123');
  });

  it('trims whitespace', () => {
    expect(extractBase64('  abc123  ')).toBe('abc123');
  });

  it('returns first token if no comma and has space', () => {
    expect(extractBase64('abc def ghi')).toBe('abc');
  });

  it('returns trimmed string if no comma or space', () => {
    expect(extractBase64('abc123')).toBe('abc123');
  });
});

describe('isImageMime', () => {
  it('returns true for image/png', () => {
    expect(isImageMime('image/png')).toBe(true);
  });

  it('returns true for image/jpeg', () => {
    expect(isImageMime('image/jpeg')).toBe(true);
  });

  it('returns true for image/jpg', () => {
    expect(isImageMime('image/jpg')).toBe(true);
  });

  it('returns false for text/plain', () => {
    expect(isImageMime('text/plain')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isImageMime('')).toBe(false);
  });
});

describe('sniffMime', () => {
  it('detects PNG', () => {
    expect(sniffMime('\u0089PNG...')).toBe('image/png');
  });

  it('detects JPEG', () => {
    expect(sniffMime('\u00ff\u00d8\u00ff...')).toBe('image/jpeg');
  });

  it('detects GIF87a', () => {
    expect(sniffMime('GIF87a...')).toBe('image/gif');
  });

  it('detects GIF89a', () => {
    expect(sniffMime('GIF89a...')).toBe('image/gif');
  });

  it('detects WEBP', () => {
    expect(sniffMime('RIFF....WEBP...')).toBe('image/webp');
  });

  it('detects SVG', () => {
    expect(sniffMime('<svg ...')).toBe('image/svg+xml');
  });

  it('detects XML-based SVG', () => {
    expect(sniffMime('<?xml ...')).toBe('image/svg+xml');
  });

  it('detects BMP', () => {
    expect(sniffMime('BM...')).toBe('image/bmp');
  });

  it('returns null for unknown format', () => {
    expect(sniffMime('unknown')).toBeNull();
  });
});

describe('dataUrlFromMime', () => {
  it('builds data URL', () => {
    expect(dataUrlFromMime('abc', 'image/png')).toBe(
      'data:image/png;base64,abc'
    );
  });
});
