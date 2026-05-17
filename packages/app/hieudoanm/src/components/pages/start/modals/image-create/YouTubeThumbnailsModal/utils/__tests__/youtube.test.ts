import { extractVideoId, thumbUrl } from '../youtube';

describe('extractVideoId', () => {
  it('extracts from youtube.com/watch', () => {
    expect(extractVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(
      'dQw4w9WgXcQ'
    );
  });

  it('extracts from youtu.be', () => {
    expect(extractVideoId('https://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('extracts from youtube.com/embed', () => {
    expect(extractVideoId('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe(
      'dQw4w9WgXcQ'
    );
  });

  it('extracts from youtube.com/shorts', () => {
    expect(extractVideoId('https://www.youtube.com/shorts/dQw4w9WgXcQ')).toBe(
      'dQw4w9WgXcQ'
    );
  });

  it('returns raw 11-char string as ID', () => {
    expect(extractVideoId('dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('returns null for invalid URL', () => {
    expect(extractVideoId('https://example.com')).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(extractVideoId('')).toBeNull();
  });
});

describe('thumbUrl', () => {
  it('builds thumbnail URL', () => {
    expect(thumbUrl('dQw4w9WgXcQ', 'hqdefault')).toBe(
      'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
    );
  });
});
