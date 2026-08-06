jest.mock('@/lib/db', () => ({
  db: {
    images: { getAll: jest.fn(), put: jest.fn(), delete: jest.fn() },
    albums: { getAll: jest.fn(), put: jest.fn(), delete: jest.fn() },
    filters: { getAll: jest.fn(), put: jest.fn() },
    history: { getAll: jest.fn(), put: jest.fn(), delete: jest.fn() },
    layers: { getAll: jest.fn(), put: jest.fn(), delete: jest.fn() },
    settings: { get: jest.fn(), put: jest.fn() },
  },
}));

import { generateId, mockImages, mockAlbums, mockFilters } from '@/data/models';
import { CATEGORIES, TOOLS } from '@/data/photo-tools';
import { seedDatabase } from '@/data/seed';
import { db } from '@/lib/db';

describe('generateId', () => {
  it('returns unique ids', () => {
    expect(generateId()).not.toBe(generateId());
  });
});

describe('mock data', () => {
  it('provides well-formed images', () => {
    expect(mockImages.length).toBeGreaterThan(0);
    for (const img of mockImages) {
      expect(img.id).toBeTruthy();
      expect(img.name).toBeTruthy();
      expect(img.width).toBeGreaterThan(0);
      expect(img.height).toBeGreaterThan(0);
    }
  });

  it('provides well-formed albums', () => {
    expect(mockAlbums.length).toBeGreaterThan(0);
    for (const album of mockAlbums) {
      expect(album.id).toBeTruthy();
      expect(album.name).toBeTruthy();
    }
  });

  it('provides well-formed filters', () => {
    expect(mockFilters.length).toBeGreaterThan(0);
    for (const filter of mockFilters) {
      expect(filter.id).toBeTruthy();
      expect(filter.name).toBeTruthy();
    }
  });
});

describe('photo-tools catalog', () => {
  it('exposes all seven categories', () => {
    expect(CATEGORIES.map((c) => c.key)).toEqual([
      'ai',
      'color',
      'convert',
      'create',
      'edit',
      'effect',
      'scan',
    ]);
  });

  it('has unique tool ids and valid categories', () => {
    const ids = TOOLS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    const categoryKeys = new Set(CATEGORIES.map((c) => c.key));
    for (const tool of TOOLS) {
      expect(categoryKeys.has(tool.category)).toBe(true);
      expect(tool.title).toBeTruthy();
    }
  });
});

describe('seedDatabase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (db.images.getAll as jest.Mock).mockResolvedValue([]);
  });

  it('seeds when the database is empty', async () => {
    await seedDatabase();
    expect(db.images.put).toHaveBeenCalledTimes(mockImages.length);
    expect(db.albums.put).toHaveBeenCalledTimes(mockAlbums.length);
    expect(db.filters.put).toHaveBeenCalledTimes(mockFilters.length);
    expect(db.settings.put).toHaveBeenCalledWith(
      expect.objectContaining({ theme: 'nothing', defaultExportFormat: 'png' })
    );
  });

  it('does nothing when images already exist', async () => {
    (db.images.getAll as jest.Mock).mockResolvedValue([{ id: 'x' }]);
    await seedDatabase();
    expect(db.images.put).not.toHaveBeenCalled();
  });
});
