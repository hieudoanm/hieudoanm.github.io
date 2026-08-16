import { db } from '@/lib/db';
import type {
  User,
  Contact,
  Chat,
  Message,
  AppSettings,
  AuthSession,
} from '@/types';

const DB_NAME = 'messaging-db';
const DB_VERSION = 1;

const resetDB = async (): Promise<void> => {
  const existing = await indexedDB.databases();
  if (!existing.some((database) => database.name === DB_NAME)) {
    return;
  }
  await new Promise<void>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = () => {
      const database = request.result;
      const storeNames = Array.from(database.objectStoreNames);
      const tx = database.transaction(storeNames, 'readwrite');
      for (const name of storeNames) {
        tx.objectStore(name).clear();
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    };
    request.onerror = () => reject(request.error);
  });
};

const user = (overrides: Partial<User> = {}): User => ({
  id: 'me',
  name: 'You',
  phone: '+1 555 010 0000',
  username: 'you',
  avatarColor: '#ff0030',
  online: true,
  lastSeenAt: 1000,
  ...overrides,
});

const contact = (overrides: Partial<Contact> = {}): Contact => ({
  id: 'alice',
  name: 'Alice',
  phone: '+1 555 010 1001',
  username: 'alice',
  avatarColor: '#4da3ff',
  online: true,
  lastSeenAt: 1000,
  blocked: false,
  starred: true,
  ...overrides,
});

const chat = (overrides: Partial<Chat> = {}): Chat => ({
  id: 'c1',
  kind: 'direct',
  title: 'Alice',
  avatarColor: '#4da3ff',
  memberIds: ['me', 'alice'],
  adminIds: [],
  pinned: false,
  muted: false,
  isSecret: false,
  disappearingSeconds: 0,
  unreadCount: 0,
  createdAt: 1000,
  lastMessageAt: 1000,
  ...overrides,
});

const message = (overrides: Partial<Message> = {}): Message => ({
  id: 'm1',
  chatId: 'c1',
  authorId: 'me',
  type: 'text',
  text: 'hello',
  status: 'sent',
  createdAt: 1000,
  reactions: [],
  ...overrides,
});

describe('db.account', () => {
  beforeEach(async () => {
    await resetDB();
  });

  it('returns undefined when no account is stored', async () => {
    await expect(db.account.get()).resolves.toBeUndefined();
  });

  it('stores and retrieves the account forcing the me key', async () => {
    await db.account.put(user({ name: 'Jane' }));
    const stored = await db.account.get();
    expect(stored?.name).toBe('Jane');
    expect(stored?.id).toBe('me');
  });
});

describe('db.contacts', () => {
  beforeEach(async () => {
    await resetDB();
  });

  it('returns an empty list initially', async () => {
    await expect(db.contacts.getAll()).resolves.toEqual([]);
  });

  it('stores and lists contacts', async () => {
    await db.contacts.put(contact({ id: 'bob', name: 'Bob' }));
    const stored = await db.contacts.getAll();
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe('Bob');
  });
});

describe('db.chats', () => {
  beforeEach(async () => {
    await resetDB();
  });

  it('stores, gets and lists chats', async () => {
    await db.chats.put(chat());
    await expect(db.chats.get('c1')).resolves.toMatchObject({ id: 'c1' });
    await expect(db.chats.getAll()).resolves.toHaveLength(1);
  });
});

describe('db.messages', () => {
  beforeEach(async () => {
    await resetDB();
  });

  it('returns messages for a chat via the index', async () => {
    await db.messages.put(message({ id: 'm1' }));
    await db.messages.put(message({ id: 'm2', chatId: 'c2' }));
    const stored = await db.messages.getByChat('c1');
    expect(stored.map((m) => m.id)).toEqual(['m1']);
  });

  it('returns all messages', async () => {
    await db.messages.put(message({ id: 'm1' }));
    await db.messages.put(message({ id: 'm2', chatId: 'c2' }));
    await expect(db.messages.getAll()).resolves.toHaveLength(2);
  });

  it('gets a single message', async () => {
    await db.messages.put(message({ id: 'm1' }));
    await expect(db.messages.get('m1')).resolves.toMatchObject({ id: 'm1' });
  });
});

describe('db.settings', () => {
  beforeEach(async () => {
    await resetDB();
  });

  it('returns defaults when nothing is stored', async () => {
    const settings = await db.settings.get();
    expect(settings).toMatchObject<Partial<AppSettings>>({
      theme: 'nothing',
      notifications: true,
      readReceipts: true,
      typingIndicators: true,
      disappearingSeconds: 0,
    });
  });

  it('stores and retrieves settings with the default key', async () => {
    await db.settings.put({ ...(await db.settings.get()), theme: 'dark' });
    const settings = await db.settings.get();
    expect(settings.theme).toBe('dark');
    expect(settings.id).toBe('default');
  });
});

describe('db.auth', () => {
  beforeEach(async () => {
    await resetDB();
  });

  it('returns undefined when no session is stored', async () => {
    await expect(db.auth.get()).resolves.toBeUndefined();
  });

  it('stores and retrieves an auth session', async () => {
    const session: AuthSession = {
      id: 'session',
      method: 'phone',
      identifier: '+1 555 000 0000',
      signedInAt: 1000,
    };
    await db.auth.put(session);
    await expect(db.auth.get()).resolves.toEqual(session);
  });

  it('deletes the auth session', async () => {
    await db.auth.put({
      id: 'session',
      method: 'username',
      identifier: 'alice',
      signedInAt: 1000,
    });
    await db.auth.delete();
    await expect(db.auth.get()).resolves.toBeUndefined();
  });
});
