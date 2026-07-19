import { db } from '@/lib/db';
import {
  MOCK_DOCUMENTS,
  MOCK_ANNOTATIONS,
  MOCK_BOOKMARKS,
} from '@/data/models';

export const seedDatabase = async (): Promise<void> => {
  const existing = await db.documents.getAll();
  if (existing.length > 0) return;

  for (const doc of MOCK_DOCUMENTS) {
    await db.documents.put(doc);
  }
  for (const ann of MOCK_ANNOTATIONS) {
    await db.annotations.put(ann);
  }
  for (const bm of MOCK_BOOKMARKS) {
    await db.bookmarks.put(bm);
  }
};

export { generateId } from '@/data/models';
