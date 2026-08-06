import { seedDatabase, generateId } from '@/data/seed';
import { MOCK_ITEMS } from '@/data/models';
import { mockDb } from '@/test-utils/fakeDb';

jest.mock('@/lib/db', () => require('@/test-utils/fakeDb').mockDb);

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
