import type { Album, Photo } from '@/types/gallery';

export interface FakeGalleryDb {
  db: {
    photos: {
      getAll: jest.Mock;
      get: jest.Mock;
      put: jest.Mock;
      delete: jest.Mock;
    };
    albums: {
      getAll: jest.Mock;
      get: jest.Mock;
      put: jest.Mock;
      delete: jest.Mock;
    };
  };
  reset: (config?: { photos?: Photo[]; albums?: Album[] }) => void;
}

export const createFakeGalleryDb = (): FakeGalleryDb => {
  let photos: Photo[] = [];
  let albums: Album[] = [];

  const db = {
    photos: {
      getAll: jest.fn(async (): Promise<Photo[]> => [...photos]),
      get: jest.fn(async (id: string): Promise<Photo | undefined> =>
        photos.find((p) => p.id === id)
      ),
      put: jest.fn(async (photo: Photo): Promise<void> => {
        photos = photos.filter((p) => p.id !== photo.id);
        photos.push(photo);
      }),
      delete: jest.fn(async (id: string): Promise<void> => {
        photos = photos.filter((p) => p.id !== id);
      }),
    },
    albums: {
      getAll: jest.fn(async (): Promise<Album[]> => [...albums]),
      get: jest.fn(async (id: string): Promise<Album | undefined> =>
        albums.find((a) => a.id === id)
      ),
      put: jest.fn(async (album: Album): Promise<void> => {
        albums = albums.filter((a) => a.id !== album.id);
        albums.push(album);
      }),
      delete: jest.fn(async (id: string): Promise<void> => {
        albums = albums.filter((a) => a.id !== id);
      }),
    },
  };

  const reset = (config?: { photos?: Photo[]; albums?: Album[] }): void => {
    photos = config?.photos ? [...config.photos] : [];
    albums = config?.albums ? [...config.albums] : [];
  };

  return { db, reset };
};

export const mockGalleryDb = createFakeGalleryDb();
