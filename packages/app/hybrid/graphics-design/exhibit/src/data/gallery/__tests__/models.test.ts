import {
  COLOR_PALETTE,
  MOCK_ALBUMS,
  MOCK_PHOTOS,
  generateId,
} from '@/data/gallery/models';

describe('gallery models', () => {
  it('generates unique ids with a photo prefix', () => {
    const a = generateId();
    const b = generateId();
    expect(a).toMatch(/^photo-\d+-[a-z0-9]+$/);
    expect(a).not.toBe(b);
  });

  it('ships mock photos with required fields', () => {
    expect(MOCK_PHOTOS.length).toBeGreaterThan(0);
    for (const photo of MOCK_PHOTOS) {
      expect(photo.id).toBeTruthy();
      expect(photo.color).toMatch(/^#[0-9a-f]{6}$/i);
      expect(photo.width).toBeGreaterThan(0);
      expect(photo.height).toBeGreaterThan(0);
    }
  });

  it('ships mock albums referencing the palette', () => {
    expect(MOCK_ALBUMS.length).toBeGreaterThan(0);
    expect(COLOR_PALETTE.length).toBeGreaterThan(0);
    const ids = new Set(MOCK_PHOTOS.map((p) => p.id));
    for (const album of MOCK_ALBUMS) {
      expect(album.photoIds.every((id) => ids.has(id))).toBe(true);
    }
  });
});
