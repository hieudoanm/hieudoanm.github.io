import { seedDatabase } from '@/data/gallery/seed';
import { MOCK_ALBUMS, MOCK_PHOTOS } from '@/data/gallery/models';
import { mockGalleryDb } from '@/test-helpers/gallery/fakeDb';

jest.mock(
  '@/lib/gallery/db',
  () => require('@/test-helpers/gallery/fakeDb').mockGalleryDb
);

describe('seedDatabase', () => {
  beforeEach(() => {
    mockGalleryDb.reset();
    jest.clearAllMocks();
  });

  it('seeds photos and albums into an empty database', async () => {
    await seedDatabase();
    expect(mockGalleryDb.db.photos.put).toHaveBeenCalledTimes(
      MOCK_PHOTOS.length
    );
    expect(mockGalleryDb.db.albums.put).toHaveBeenCalledTimes(
      MOCK_ALBUMS.length
    );
  });

  it('does not reseed when data already exists', async () => {
    mockGalleryDb.reset({ photos: [MOCK_PHOTOS[0]], albums: [MOCK_ALBUMS[0]] });
    await seedDatabase();
    expect(mockGalleryDb.db.photos.put).not.toHaveBeenCalled();
    expect(mockGalleryDb.db.albums.put).not.toHaveBeenCalled();
  });
});
