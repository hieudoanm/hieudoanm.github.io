import type { Board, List, Card, ProjectsSettings } from '@/types';

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
  },
  getAll: (store: string) => [...stores[store].data.values()],
  get: (store: string, key: string) => stores[store].data.get(key),
  put: (store: string, value: { id: string }) => {
    stores[store].data.set(value.id, value);
  },
  delete: (store: string, key: string) => {
    stores[store].data.delete(key);
  },
});

const board = (id: string): Board => ({
  id,
  name: `Board ${id}`,
  background: '#3b82f6',
  starred: false,
  listIds: [],
  createdAt: 1000,
  updatedAt: 1000,
});

const list = (id: string): List => ({
  id,
  boardId: 'board-1',
  name: `List ${id}`,
  cardIds: [],
  collapsed: false,
  createdAt: 1000,
  updatedAt: 1000,
});

const card = (id: string): Card => ({
  id,
  listId: 'list-1',
  title: `Card ${id}`,
  description: '',
  labels: [],
  dueDate: null,
  priority: 'medium',
  memberIds: [],
  checklistItems: [],
  commentCount: 0,
  coverColor: null,
  archived: false,
  createdAt: 1000,
  updatedAt: 1000,
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

  it('creates the seven object stores on upgrade', async () => {
    await db.boards.getAll();
    expect(jest.requireMock('idb').openDB).toHaveBeenCalledWith(
      'projects-db',
      1,
      expect.any(Object)
    );
    expect(Object.keys(stores).sort()).toEqual([
      'activity',
      'boards',
      'cards',
      'labels',
      'lists',
      'members',
      'settings',
    ]);
  });

  it('boards getAll/get/put/delete round-trip', async () => {
    await db.boards.put(board('b1'));
    await db.boards.put(board('b2'));
    await expect(db.boards.getAll()).resolves.toHaveLength(2);
    await expect(db.boards.get('b1')).resolves.toMatchObject({ id: 'b1' });
    await expect(db.boards.get('missing')).resolves.toBeUndefined();
    await db.boards.delete('b1');
    await expect(db.boards.getAll()).resolves.toHaveLength(1);
  });

  it('lists getAll/get/put/delete round-trip', async () => {
    await db.lists.put(list('l1'));
    await expect(db.lists.get('l1')).resolves.toMatchObject({ id: 'l1' });
    await expect(db.lists.getAll()).resolves.toHaveLength(1);
    await db.lists.delete('l1');
    await expect(db.lists.getAll()).resolves.toEqual([]);
  });

  it('cards getAll/get/put/delete round-trip', async () => {
    await db.cards.put(card('c1'));
    await expect(db.cards.get('c1')).resolves.toMatchObject({ id: 'c1' });
    await expect(db.cards.getAll()).resolves.toHaveLength(1);
    await db.cards.delete('c1');
    await expect(db.cards.getAll()).resolves.toEqual([]);
  });

  it('labels and members round-trip', async () => {
    await db.labels.put({ id: 'lbl-1', name: 'Bug', color: '#ef4444' });
    await expect(db.labels.getAll()).resolves.toHaveLength(1);
    await db.members.put({
      id: 'mem-1',
      name: 'A',
      email: 'a@x.com',
      avatar: 'A',
    });
    await expect(db.members.getAll()).resolves.toHaveLength(1);
  });

  it('activity round-trips', async () => {
    await db.activity.put({
      id: 'act-1',
      boardId: 'board-1',
      cardId: null,
      message: 'Moved card',
      userId: 'mem-1',
      timestamp: 1000,
    });
    await expect(db.activity.getAll()).resolves.toHaveLength(1);
  });

  it('settings.get returns defaults when nothing is stored', async () => {
    await expect(db.settings.get()).resolves.toEqual({
      theme: 'nothing',
      defaultView: 'kanban',
      notifications: true,
    });
  });

  it('settings.get returns stored settings', async () => {
    const saved: ProjectsSettings = {
      theme: 'night',
      defaultView: 'list',
      notifications: false,
    };
    await db.settings.put(saved);
    await expect(db.settings.get()).resolves.toEqual({
      ...saved,
      id: 'settings',
    });
  });

  it('settings.put merges the settings id', async () => {
    await db.settings.put({
      theme: 'dark',
      defaultView: 'kanban',
      notifications: true,
    });
    expect(stores.settings.data.get('settings')).toMatchObject({
      id: 'settings',
      theme: 'dark',
    });
  });

  it('skips stores that already exist on upgrade', async () => {
    stores['boards'] = { data: new Map() };
    stores['lists'] = { data: new Map() };
    stores['cards'] = { data: new Map() };
    stores['labels'] = { data: new Map() };
    stores['members'] = { data: new Map() };
    stores['activity'] = { data: new Map() };
    stores['settings'] = { data: new Map() };
    await db.boards.getAll();
    expect(Object.keys(stores).sort()).toEqual([
      'activity',
      'boards',
      'cards',
      'labels',
      'lists',
      'members',
      'settings',
    ]);
  });

  it('falls back to the default delay when the env var is unset', async () => {
    const real = process.env.NEXT_PUBLIC_MOCK_DELAY;
    delete process.env.NEXT_PUBLIC_MOCK_DELAY;
    jest.useFakeTimers();
    const p = db.boards.getAll();
    jest.advanceTimersByTime(800);
    await expect(p).resolves.toEqual([]);
    jest.useRealTimers();
    process.env.NEXT_PUBLIC_MOCK_DELAY = real;
  });
});
