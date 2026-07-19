jest.mock('@/lib/db', () => ({
  db: {
    chats: { getAll: jest.fn(), put: jest.fn() },
    account: { put: jest.fn() },
    contacts: { put: jest.fn() },
    messages: { put: jest.fn() },
  },
}));

jest.mock('@/data/models', () => ({
  generateId: jest.fn(() => 'mock-id-123'),
  ME: { id: 'me', name: 'You' },
  MOCK_CONTACTS: [{ id: 'alice' }],
  MOCK_CHATS: [{ id: 'chat-1' }, { id: 'chat-2' }],
  MOCK_MESSAGES: [{ id: 'm1' }, { id: 'm2' }],
}));

import { seedDatabase, generateId } from '@/data/seed';
import { db } from '@/lib/db';

describe('seedDatabase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls db.chats.getAll first', async () => {
    (db.chats.getAll as jest.Mock).mockResolvedValue([{ id: 'existing' }]);
    await seedDatabase();
    expect(db.chats.getAll).toHaveBeenCalledTimes(1);
  });

  it('returns early if chats already exist', async () => {
    (db.chats.getAll as jest.Mock).mockResolvedValue([{ id: 'existing' }]);
    await seedDatabase();
    expect(db.account.put).not.toHaveBeenCalled();
    expect(db.chats.put).not.toHaveBeenCalled();
    expect(db.messages.put).not.toHaveBeenCalled();
  });

  it('puts account, contacts, chats, messages when empty', async () => {
    (db.chats.getAll as jest.Mock).mockResolvedValue([]);
    await seedDatabase();
    expect(db.account.put).toHaveBeenCalledTimes(1);
    expect(db.contacts.put).toHaveBeenCalledTimes(1);
    expect(db.chats.put).toHaveBeenCalledTimes(2);
    expect(db.messages.put).toHaveBeenCalledTimes(2);
  });
});

describe('re-exports', () => {
  it('re-exports generateId', () => {
    expect(generateId).toBeDefined();
    expect(generateId()).toBe('mock-id-123');
  });
});
