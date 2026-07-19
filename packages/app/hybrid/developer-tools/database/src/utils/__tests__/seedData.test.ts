import { createSeedData } from '@/utils/seedData';
import type { SqliteDatabase } from '@/types/sqlite';

describe('createSeedData', () => {
  it('creates tables and inserts data', () => {
    const run = jest.fn();
    const db = { run } as unknown as SqliteDatabase;
    createSeedData(db);
    const calls = run.mock.calls;
    const createCalls = calls.filter(([sql]) =>
      String(sql).includes('CREATE TABLE')
    );
    const insertCalls = calls.filter(([sql]) =>
      String(sql).includes('INSERT INTO')
    );
    expect(createCalls.length).toBe(3);
    expect(insertCalls.length).toBe(26);
  });
});
