import { openDB, type IDBPDatabase } from 'idb';
import type {
  Board,
  List,
  Card,
  Label,
  Member,
  Activity,
  ProjectsSettings,
} from '@/types';

const DB_NAME = 'projects-db';
const DB_VERSION = 1;

const delay = () =>
  new Promise((r) =>
    setTimeout(r, parseInt(process.env.NEXT_PUBLIC_MOCK_DELAY ?? '800'))
  );

interface ProjectsDB {
  boards: { key: string; value: Board };
  lists: { key: string; value: List };
  cards: { key: string; value: Card };
  labels: { key: string; value: Label };
  members: { key: string; value: Member };
  activity: { key: string; value: Activity };
  settings: { key: string; value: ProjectsSettings & { id: string } };
}

let dbPromise: Promise<IDBPDatabase<ProjectsDB>> | null = null;

const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<ProjectsDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('boards'))
          db.createObjectStore('boards', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('lists'))
          db.createObjectStore('lists', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('cards'))
          db.createObjectStore('cards', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('labels'))
          db.createObjectStore('labels', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('members'))
          db.createObjectStore('members', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('activity'))
          db.createObjectStore('activity', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('settings'))
          db.createObjectStore('settings', { keyPath: 'id' });
      },
    });
  }
  return dbPromise;
};

export const db = {
  boards: {
    getAll: async (): Promise<Board[]> => {
      await delay();
      return (await getDB()).getAll('boards');
    },
    get: async (id: string): Promise<Board | undefined> => {
      await delay();
      return (await getDB()).get('boards', id);
    },
    put: async (board: Board): Promise<void> => {
      await delay();
      await (await getDB()).put('boards', board);
    },
    delete: async (id: string): Promise<void> => {
      await delay();
      await (await getDB()).delete('boards', id);
    },
  },
  lists: {
    getAll: async (): Promise<List[]> => {
      await delay();
      return (await getDB()).getAll('lists');
    },
    get: async (id: string): Promise<List | undefined> => {
      await delay();
      return (await getDB()).get('lists', id);
    },
    put: async (list: List): Promise<void> => {
      await delay();
      await (await getDB()).put('lists', list);
    },
    delete: async (id: string): Promise<void> => {
      await delay();
      await (await getDB()).delete('lists', id);
    },
  },
  cards: {
    getAll: async (): Promise<Card[]> => {
      await delay();
      return (await getDB()).getAll('cards');
    },
    get: async (id: string): Promise<Card | undefined> => {
      await delay();
      return (await getDB()).get('cards', id);
    },
    put: async (card: Card): Promise<void> => {
      await delay();
      await (await getDB()).put('cards', card);
    },
    delete: async (id: string): Promise<void> => {
      await delay();
      await (await getDB()).delete('cards', id);
    },
  },
  labels: {
    getAll: async (): Promise<Label[]> => {
      await delay();
      return (await getDB()).getAll('labels');
    },
    put: async (label: Label): Promise<void> => {
      await delay();
      await (await getDB()).put('labels', label);
    },
  },
  members: {
    getAll: async (): Promise<Member[]> => {
      await delay();
      return (await getDB()).getAll('members');
    },
    put: async (member: Member): Promise<void> => {
      await delay();
      await (await getDB()).put('members', member);
    },
  },
  activity: {
    getAll: async (): Promise<Activity[]> => {
      await delay();
      return (await getDB()).getAll('activity');
    },
    put: async (a: Activity): Promise<void> => {
      await delay();
      await (await getDB()).put('activity', a);
    },
  },
  settings: {
    get: async (): Promise<ProjectsSettings> => {
      await delay();
      const s = await (await getDB()).get('settings', 'settings');
      return (
        s ?? { theme: 'night', defaultView: 'kanban', notifications: true }
      );
    },
    put: async (s: ProjectsSettings): Promise<void> => {
      await delay();
      await (await getDB()).put('settings', { ...s, id: 'settings' });
    },
  },
};
