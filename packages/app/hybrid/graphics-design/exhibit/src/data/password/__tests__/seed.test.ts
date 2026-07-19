import { seedDatabase, generateId } from '@/data/password/seed';
import { MOCK_ITEMS } from '@/data/password/models';
import { mockDb } from '@/test-helpers/password/fakeDb';

jest.mock(
  '@/lib/password/db',
  () => require('@/test-helpers/password/fakeDb').mockDb
);

describe('seedDatabase', () => {
  beforeEach(() => {
    mockDb.reset();
    jest.clearAllMocks();
  });

  it('seeds all mock items when the vault is empty', async () => {
    await seedDatabase();
    expect(mockDb.db.items.getAll).toHaveBeenCalled();
    expect(mockDb.db.items.put).toHaveBeenCalledTimes(MOCK_ITEMS.length);
  });

  it('skips seeding when items already exist', async () => {
    mockDb.reset({ items: [MOCK_ITEMS[0]] });
    await seedDatabase();
    expect(mockDb.db.items.put).not.toHaveBeenCalled();
  });

  it('skips seeding folders when folders already exist', async () => {
    mockDb.reset({ items: [MOCK_ITEMS[0]], folders: [{ id: 'f-1' } as never] });
    await seedDatabase();
    expect(mockDb.db.folders.put).not.toHaveBeenCalled();
  });
});

describe('generateId', () => {
  it('returns a unique timestamp-prefixed id', () => {
    const id = generateId();
    expect(id).toMatch(/^\d+-[a-z0-9]{7}$/);
  });

  it('generates distinct ids', () => {
    expect(generateId()).not.toBe(generateId());
  });
});
