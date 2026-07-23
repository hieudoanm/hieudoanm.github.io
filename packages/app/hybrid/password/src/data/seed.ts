import { db } from '@/lib/db';
import { MOCK_ITEMS } from '@/data/models';

export const seedDatabase = async (): Promise<void> => {
  const existing = await db.items.getAll();
  if (existing.length > 0) return;
  for (const item of MOCK_ITEMS) await db.items.put(item);
};

export const generateId = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
