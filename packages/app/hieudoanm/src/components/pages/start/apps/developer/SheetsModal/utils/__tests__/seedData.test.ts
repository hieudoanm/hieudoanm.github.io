import { createSeedData } from '../seedData';
import { SqlDatabase } from '../../types';

describe('createSeedData', () => {
  it('creates tables and inserts data', () => {
    const run = jest.fn();
    const db = { run } as unknown as SqlDatabase;
    createSeedData(db);
    const calls = run.mock.calls;
    const createCalls = calls.filter(([sql]: any) =>
      String(sql).includes('CREATE TABLE')
    );
    const insertCalls = calls.filter(([sql]: any) =>
      String(sql).includes('INSERT INTO')
    );
    expect(createCalls.length).toBe(3);
    expect(insertCalls.length).toBe(26);
  });
});
