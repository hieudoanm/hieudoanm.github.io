import {
  albumCover,
  allTags,
  filterPhotos,
  photosInAlbum,
  selectPhotos,
  sortPhotos,
} from '@/lib/gallery/selectors';
import type { Album, Photo } from '@/types/gallery';

const photo = (overrides: Partial<Photo> & { id: string }): Photo => ({
  name: 'Photo',
  type: 'image/jpeg',
  width: 100,
  height: 100,
  size: 1000,
  color: '#000',
  tags: [],
  favorite: false,
  albumId: null,
  createdAt: 1,
  updatedAt: 1,
  ...overrides,
});

const album: Album = {
  id: 'a-1',
  name: 'Nature',
  coverId: 'p-2',
  photoIds: ['p-1', 'p-2'],
  createdAt: 1,
  updatedAt: 1,
};

describe('gallery selectors', () => {
  it('filterPhotos matches names and tags case-insensitively', () => {
    const photos = [
      photo({ id: 'p-1', name: 'Ocean', tags: ['blue'] }),
      photo({ id: 'p-2', name: 'Forest', tags: ['green'] }),
    ];
    expect(filterPhotos(photos, 'oce').map((p) => p.id)).toEqual(['p-1']);
    expect(filterPhotos(photos, 'GREEN').map((p) => p.id)).toEqual(['p-2']);
    expect(filterPhotos(photos, '  ')).toEqual(photos);
  });

  it('sortPhotos sorts by name, size, and date', () => {
    const photos = [
      photo({ id: 'p-1', name: 'Zebra', size: 5, updatedAt: 1 }),
      photo({ id: 'p-2', name: 'Apple', size: 50, updatedAt: 3 }),
      photo({ id: 'p-3', name: 'Mango', size: 20, updatedAt: 2 }),
    ];
    expect(sortPhotos(photos, 'name').map((p) => p.name)).toEqual([
      'Apple',
      'Mango',
      'Zebra',
    ]);
    expect(sortPhotos(photos, 'size').map((p) => p.id)).toEqual([
      'p-2',
      'p-3',
      'p-1',
    ]);
    expect(sortPhotos(photos, 'date').map((p) => p.id)).toEqual([
      'p-2',
      'p-3',
      'p-1',
    ]);
  });

  it('selectPhotos filters then sorts', () => {
    const photos = [
      photo({ id: 'p-1', name: 'Ocean', size: 5 }),
      photo({ id: 'p-2', name: 'Ocean Blue', size: 50 }),
      photo({ id: 'p-3', name: 'Forest', size: 20 }),
    ];
    expect(selectPhotos(photos, 'ocean', 'size').map((p) => p.id)).toEqual([
      'p-2',
      'p-1',
    ]);
  });

  it('photosInAlbum preserves album order and drops missing ids', () => {
    const photos = [photo({ id: 'p-1' }), photo({ id: 'p-2' })];
    expect(photosInAlbum(photos, album).map((p) => p.id)).toEqual([
      'p-1',
      'p-2',
    ]);
    const withMissing: Album = { ...album, photoIds: ['p-9', 'p-1'] };
    expect(photosInAlbum(photos, withMissing).map((p) => p.id)).toEqual([
      'p-1',
    ]);
  });

  it('albumCover prefers the cover then the first photo', () => {
    const photos = [photo({ id: 'p-1' }), photo({ id: 'p-2' })];
    expect(albumCover(photos, album)?.id).toBe('p-2');
    const noCover: Album = { ...album, coverId: null };
    expect(albumCover(photos, noCover)?.id).toBe('p-1');
  });

  it('allTags returns sorted unique tags', () => {
    const photos = [
      photo({ id: 'p-1', tags: ['b', 'a'] }),
      photo({ id: 'p-2', tags: ['a', 'c'] }),
    ];
    expect(allTags(photos)).toEqual(['a', 'b', 'c']);
  });
});
