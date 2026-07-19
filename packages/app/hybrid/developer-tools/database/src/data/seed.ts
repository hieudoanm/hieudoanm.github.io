import type { DatabaseConnection, QueryHistory, Bookmark } from '@/types';
import { db } from '@/lib/db';
import {
  MOCK_CONNECTIONS,
  MOCK_SCHEMAS,
  MOCK_QUERY_RESULTS,
} from '@/data/models';

const generateId = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const seedDatabase = async (): Promise<void> => {
  const existing = await db.connections.getAll();
  if (existing.length > 0) return;
  for (const conn of MOCK_CONNECTIONS) await db.connections.put(conn);
};

export const executeQuery = (sql: string): typeof MOCK_QUERY_RESULTS.default =>
  MOCK_QUERY_RESULTS.default;

export { generateId, MOCK_SCHEMAS };
