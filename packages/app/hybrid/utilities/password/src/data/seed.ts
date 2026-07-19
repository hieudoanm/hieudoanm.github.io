import { db } from '@/lib/db';
import { MOCK_FOLDERS, MOCK_ITEMS } from '@/data/models';

export const seedDatabase = async (): Promise<void> => {
  const existing = await db.items.getAll();
  if (existing.length === 0) {
    for (const item of MOCK_ITEMS) await db.items.put(item);
  }
  const existingFolders = await db.folders.getAll();
  if (existingFolders.length === 0) {
    for (const folder of MOCK_FOLDERS) await db.folders.put(folder);
  }
};

export const generateId = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
