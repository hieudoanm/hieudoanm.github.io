import type { Conversation, Message, Folder } from '@/types';

jest.mock('idb', () => ({ openDB: jest.fn() }));

interface StoreData {
  data: Map<string, unknown>;
}

const stores: Record<string, StoreData> = {};

const createMockDB = () => ({
  objectStoreNames: {
    contains: (name: string) => name in stores,
  },
  createObjectStore: (name: string) => {
    stores[name] = { data: new Map() };
    return { createIndex: () => {} };
  },
  getAll: (store: string) => [...stores[store].data.values()],
  get: (store: string, key: string) => stores[store].data.get(key),
  put: (store: string, value: { id: string }) => {
    stores[store].data.set(value.id, value);
  },
  delete: (store: string, key: string) => {
    stores[store].data.delete(key);
  },
  transaction: (store: string) => ({
    store: {
      index: () => ({
        getAll: (conversationId: string) =>
          [...stores[store].data.values()].filter(
            (value) => (value as Message).conversationId === conversationId
          ),
        getAllKeys: (conversationId: string) =>
          [...stores[store].data.values()]
            .filter(
              (value) => (value as Message).conversationId === conversationId
            )
            .map((value) => (value as Message).id),
      }),
      delete: (key: string) => {
        stores[store].data.delete(key);
      },
    },
    done: Promise.resolve(),
  }),
});

const conversation = (id: string): Conversation => ({
  id,
  title: `Conv ${id}`,
  model: 'gpt-4o',
  createdAt: 1000,
  updatedAt: 1000,
  pinned: false,
  archived: false,
});

const message = (id: string, conversationId: string): Message => ({
  id,
  conversationId,
  role: 'user',
  content: 'hello',
  timestamp: 1000,
});

const folder = (id: string): Folder => ({
  id,
  name: `Folder ${id}`,
  createdAt: 1000,
});

describe('db', () => {
  let db: (typeof import('@/lib/db'))['db'];

  beforeEach(async () => {
    jest.resetModules();
    jest.mock('idb', () => ({ openDB: jest.fn() }));
    const openDB = jest.requireMock('idb').openDB;
    for (const key of Object.keys(stores)) delete stores[key];
    process.env.NEXT_PUBLIC_MOCK_DELAY = '0';
    openDB.mockImplementation(
      (
        _name: string,
        _version: number,
        opts: { upgrade: (db: unknown) => void }
      ) => {
        const mockDB = createMockDB();
        opts.upgrade(mockDB);
        return Promise.resolve(mockDB);
      }
    );
    db = (await import('@/lib/db')).db;
  });

  it('creates the four object stores on upgrade', async () => {
    await db.conversations.getAll();
    expect(jest.requireMock('idb').openDB).toHaveBeenCalledWith(
      'chat-db',
      1,
      expect.any(Object)
    );
    expect(Object.keys(stores).sort()).toEqual([
      'conversations',
      'folders',
      'messages',
      'settings',
    ]);
  });

  it('conversations getAll/get/put/delete round-trip', async () => {
    await db.conversations.put(conversation('c1'));
    await db.conversations.put(conversation('c2'));
    await expect(db.conversations.getAll()).resolves.toHaveLength(2);
    await expect(db.conversations.get('c1')).resolves.toMatchObject({
      id: 'c1',
    });
    await expect(db.conversations.get('missing')).resolves.toBeUndefined();
    await db.conversations.delete('c1');
    await expect(db.conversations.getAll()).resolves.toHaveLength(1);
  });

  it('messages round-trip with getByConversation', async () => {
    await db.messages.put(message('m1', 'conv-1'));
    await db.messages.put(message('m2', 'conv-1'));
    await db.messages.put(message('m3', 'conv-2'));
    await expect(db.messages.getAll()).resolves.toHaveLength(3);
    await expect(db.messages.get('m1')).resolves.toMatchObject({
      id: 'm1',
    });
    await expect(db.messages.getByConversation('conv-1')).resolves.toHaveLength(
      2
    );
    await db.messages.delete('m1');
    await expect(db.messages.getAll()).resolves.toHaveLength(2);
  });

  it('messages deleteByConversation removes all messages in a conversation', async () => {
    await db.messages.put(message('m1', 'conv-1'));
    await db.messages.put(message('m2', 'conv-1'));
    await db.messages.put(message('m3', 'conv-2'));
    await db.messages.deleteByConversation('conv-1');
    await expect(db.messages.getAll()).resolves.toHaveLength(1);
  });

  it('folders round-trip', async () => {
    await db.folders.put(folder('f1'));
    await expect(db.folders.getAll()).resolves.toHaveLength(1);
    await db.folders.delete('f1');
    await expect(db.folders.getAll()).resolves.toEqual([]);
  });

  it('settings.get returns defaults when nothing is stored', async () => {
    await expect(db.settings.get()).resolves.toEqual({
      id: 'default',
      theme: 'chat-light',
      defaultModel: 'gpt-4o',
      systemPrompt: '',
      mockDelay: 800,
    });
  });

  it('settings.get returns stored settings', async () => {
    await db.settings.put({
      theme: 'night',
      defaultModel: 'claude-3.5',
      systemPrompt: 'Be concise',
      mockDelay: 0,
    });
    await expect(db.settings.get()).resolves.toEqual({
      id: 'default',
      theme: 'night',
      defaultModel: 'claude-3.5',
      systemPrompt: 'Be concise',
      mockDelay: 0,
    });
  });

  it('settings.put merges the settings id', async () => {
    await db.settings.put({
      theme: 'dark',
      defaultModel: 'gpt-4o',
      systemPrompt: '',
      mockDelay: 0,
    });
    expect(stores.settings.data.get('default')).toMatchObject({
      id: 'default',
      theme: 'dark',
    });
  });

  it('skips stores that already exist on upgrade', async () => {
    stores['conversations'] = { data: new Map() };
    stores['messages'] = { data: new Map() };
    stores['folders'] = { data: new Map() };
    stores['settings'] = { data: new Map() };
    await db.conversations.getAll();
    expect(Object.keys(stores).sort()).toEqual([
      'conversations',
      'folders',
      'messages',
      'settings',
    ]);
  });

  it('falls back to the default delay when the env var is unset', async () => {
    const real = process.env.NEXT_PUBLIC_MOCK_DELAY;
    delete process.env.NEXT_PUBLIC_MOCK_DELAY;
    jest.useFakeTimers();
    const p = db.conversations.getAll();
    jest.advanceTimersByTime(800);
    await expect(p).resolves.toEqual([]);
    jest.useRealTimers();
    process.env.NEXT_PUBLIC_MOCK_DELAY = real;
  });
});
