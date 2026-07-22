import { db } from '@/lib/db';
import { mockImages, mockAlbums, mockFilters } from '@/data/models';

export const seedDatabase = async () => {
  const existingImages = await db.images.getAll();
  if (existingImages.length > 0) return;

  for (const img of mockImages) await db.images.put(img);
  for (const album of mockAlbums) await db.albums.put(album);
  for (const filter of mockFilters) await db.filters.put(filter);

  await db.settings.put({
    theme: 'night',
    defaultExportFormat: 'png',
    canvasBackground: 'checkerboard',
    defaultQuality: 85,
  });
};
