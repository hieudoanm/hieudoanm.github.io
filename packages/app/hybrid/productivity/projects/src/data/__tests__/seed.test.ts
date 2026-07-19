import { seedDatabase } from '@/data/seed';
import { db } from '@/lib/db';

jest.mock('@/lib/db', () => ({
  db: {
    boards: { getAll: jest.fn(), put: jest.fn() },
    lists: { put: jest.fn() },
    cards: { put: jest.fn() },
    labels: { put: jest.fn() },
    members: { put: jest.fn() },
    activity: { put: jest.fn() },
    settings: { put: jest.fn() },
  },
}));

const { boards } = jest.requireMock('@/lib/db').db;

describe('seedDatabase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('seeds all entities when the store is empty', async () => {
    boards.getAll.mockResolvedValue([]);
    await seedDatabase();
    const { db: mockDb } = jest.requireMock('@/lib/db');
    expect(mockDb.boards.put).toHaveBeenCalledTimes(3);
    expect(mockDb.lists.put).toHaveBeenCalledTimes(10);
    expect(mockDb.cards.put).toHaveBeenCalledTimes(15);
    expect(mockDb.labels.put).toHaveBeenCalledTimes(10);
    expect(mockDb.members.put).toHaveBeenCalledTimes(6);
    expect(mockDb.activity.put).toHaveBeenCalledTimes(4);
    expect(mockDb.settings.put).toHaveBeenCalledWith({
      theme: 'nothing',
      defaultView: 'kanban',
      notifications: true,
      notificationsReadAt: 0,
    });
  });

  it('returns early when boards already exist', async () => {
    boards.getAll.mockResolvedValue([{ id: 'board-1' }]);
    await seedDatabase();
    const { db: mockDb } = jest.requireMock('@/lib/db');
    expect(mockDb.boards.put).not.toHaveBeenCalled();
    expect(mockDb.settings.put).not.toHaveBeenCalled();
  });
});
