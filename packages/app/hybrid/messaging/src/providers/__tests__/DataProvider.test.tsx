import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { DataProvider, useData, REPLY_POOL } from '@/providers/DataProvider';
import type { User, Contact, Chat, AppSettings } from '@/types';

jest.mock('@/lib/db', () => ({
  db: {
    account: {
      get: jest.fn(),
      getAll: jest.fn().mockResolvedValue([]),
      put: jest.fn(),
    },
    contacts: { getAll: jest.fn(), put: jest.fn() },
    chats: { getAll: jest.fn(), get: jest.fn(), put: jest.fn() },
    messages: {
      getAll: jest.fn(),
      getByChat: jest.fn(),
      get: jest.fn(),
      put: jest.fn(),
    },
    settings: { get: jest.fn(), put: jest.fn() },
    auth: {
      get: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

jest.mock('@/data/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
  generateId: jest.fn(() => 'gen-id'),
}));

const { db } = jest.requireMock('@/lib/db');
const { seedDatabase } = jest.requireMock('@/data/seed');

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
  id: 'chat-alice',
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

const settings = (overrides: Partial<AppSettings> = {}): AppSettings => ({
  id: 'default',
  theme: 'nothing',
  notifications: true,
  readReceipts: true,
  typingIndicators: true,
  disappearingSeconds: 0,
  ...overrides,
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <DataProvider>{children}</DataProvider>
);

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers();
  db.account.get.mockResolvedValue(user());
  db.account.getAll.mockResolvedValue([user()]);
  db.contacts.getAll.mockResolvedValue([contact()]);
  db.chats.getAll.mockResolvedValue([
    chat(),
    chat({ id: 'c2', lastMessageAt: 5 }),
  ]);
  db.messages.getAll.mockResolvedValue([]);
  db.settings.get.mockResolvedValue(settings());
  db.messages.put.mockResolvedValue(undefined);
  db.chats.put.mockResolvedValue(undefined);
  db.account.put.mockResolvedValue(undefined);
  db.settings.put.mockResolvedValue(undefined);
  db.auth.get.mockResolvedValue({
    id: 'session',
    method: 'phone',
    identifier: '+1 555 010 0000',
    signedInAt: 1000,
  });
});

afterEach(() => {
  jest.useRealTimers();
});

const flush = async (): Promise<void> => {
  await act(async () => {});
};

describe('DataProvider', () => {
  it('throws when used outside its provider', () => {
    const originalError = console.error;
    console.error = jest.fn();
    expect(() => renderHook(() => useData())).toThrow(
      'useData must be used within DataProvider'
    );
    console.error = originalError;
  });

  it('seeds and loads account, contacts, chats and settings on mount', async () => {
    const { result } = renderHook(() => useData(), { wrapper: Wrapper });
    await flush();
    expect(seedDatabase).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.account?.name).toBe('You');
    expect(result.current.contacts).toHaveLength(1);
    expect(result.current.chats.map((c) => c.id)).toEqual(['chat-alice', 'c2']);
    expect(result.current.settings.theme).toBe('nothing');
  });

  it('handles a missing account', async () => {
    db.account.get.mockResolvedValue(undefined);
    const { result } = renderHook(() => useData(), { wrapper: Wrapper });
    await flush();
    expect(result.current.account).toBeNull();
  });

  it('sends a message and advances its delivery status', async () => {
    const { result } = renderHook(() => useData(), { wrapper: Wrapper });
    await flush();
    const before = result.current.messages.length;
    await act(async () => {
      await result.current.sendMessage('chat-alice', '  Hello there  ');
    });
    const sent = result.current.messages[result.current.messages.length - 1];
    expect(sent.text).toBe('Hello there');
    expect(sent.status).toBe('sending');
    expect(result.current.messages.length).toBe(before + 1);
    expect(db.messages.put).toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(1300);
    });
    expect(
      result.current.messages[result.current.messages.length - 1].status
    ).toBe('delivered');

    await act(async () => {
      jest.advanceTimersByTime(1400);
    });
    expect(
      result.current.messages[result.current.messages.length - 1].status
    ).toBe('read');
  });

  it('does not mark messages as read when read receipts are off', async () => {
    db.settings.get.mockResolvedValue(settings({ readReceipts: false }));
    const { result } = renderHook(() => useData(), { wrapper: Wrapper });
    await flush();
    await act(async () => {
      await result.current.sendMessage('chat-alice', 'hello');
    });
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    const mine = result.current.messages.find((m) => m.text === 'hello');
    expect(mine?.status).toBe('delivered');
  });

  it('rejects empty messages and unknown chats', async () => {
    const { result } = renderHook(() => useData(), { wrapper: Wrapper });
    await flush();
    await expect(
      result.current.sendMessage('chat-alice', '   ')
    ).rejects.toThrow('Chat not found or empty message');
    await expect(result.current.sendMessage('nope', 'hi')).rejects.toThrow(
      'Chat not found or empty message'
    );
  });

  it('schedules a mock reply for direct chats', async () => {
    const { result } = renderHook(() => useData(), { wrapper: Wrapper });
    await flush();
    await act(async () => {
      await result.current.sendMessage('chat-alice', 'hi');
    });
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    await flush();
    const reply = result.current.messages.find(
      (m) => m.authorId === 'alice' && m.text !== 'hi'
    );
    expect(reply).toBeDefined();
    expect(REPLY_POOL).toContain(reply?.text);
    expect(result.current.chats[0].unreadCount).toBe(1);
  });

  it('does not schedule a mock reply for group chats', async () => {
    db.chats.getAll.mockResolvedValue([
      chat({ id: 'group', kind: 'group', memberIds: ['me', 'alice', 'bob'] }),
    ]);
    const { result } = renderHook(() => useData(), { wrapper: Wrapper });
    await flush();
    await act(async () => {
      await result.current.sendMessage('group', 'hi');
    });
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    expect(
      result.current.messages.filter((m) => m.authorId !== 'me')
    ).toHaveLength(0);
  });

  it('toggles a reaction, removing an existing one from the current user', async () => {
    const { result } = renderHook(() => useData(), { wrapper: Wrapper });
    await flush();
    await act(async () => {
      await result.current.sendMessage('chat-alice', 'hi');
    });
    const messageId =
      result.current.messages[result.current.messages.length - 1].id;
    await act(async () => {
      await result.current.addReaction('chat-alice', messageId, '👍');
    });
    expect(
      result.current.messages[result.current.messages.length - 1].reactions
    ).toEqual([expect.objectContaining({ emoji: '👍', authorId: 'me' })]);
    await act(async () => {
      await result.current.addReaction('chat-alice', messageId, '👍');
    });
    expect(
      result.current.messages[result.current.messages.length - 1].reactions
    ).toEqual([]);
  });

  it('ignores reactions for unknown messages', async () => {
    const { result } = renderHook(() => useData(), { wrapper: Wrapper });
    await flush();
    await act(async () => {
      await result.current.addReaction('chat-alice', 'nope', '👍');
    });
    expect(db.messages.put).not.toHaveBeenCalled();
  });

  it('soft deletes a message', async () => {
    const { result } = renderHook(() => useData(), { wrapper: Wrapper });
    await flush();
    await act(async () => {
      await result.current.sendMessage('chat-alice', 'bye');
    });
    const messageId =
      result.current.messages[result.current.messages.length - 1].id;
    await act(async () => {
      await result.current.deleteMessage('chat-alice', messageId);
    });
    expect(
      result.current.messages[result.current.messages.length - 1].deletedAt
    ).toBeDefined();
  });

  it('edits a message, ignoring empty text', async () => {
    const { result } = renderHook(() => useData(), { wrapper: Wrapper });
    await flush();
    await act(async () => {
      await result.current.sendMessage('chat-alice', 'original');
    });
    const messageId =
      result.current.messages[result.current.messages.length - 1].id;
    await act(async () => {
      await result.current.editMessage('chat-alice', messageId, '  edited  ');
    });
    const edited = result.current.messages[result.current.messages.length - 1];
    expect(edited.text).toBe('edited');
    expect(edited.editedAt).toBeDefined();
    await act(async () => {
      await result.current.editMessage('chat-alice', messageId, '  ');
    });
    expect(
      result.current.messages[result.current.messages.length - 1].text
    ).toBe('edited');
  });

  it('marks a chat read, leaving zero unread untouched', async () => {
    const { result } = renderHook(() => useData(), { wrapper: Wrapper });
    await flush();
    await act(async () => {
      await result.current.markChatRead('chat-alice');
    });
    expect(db.chats.put).not.toHaveBeenCalled();

    db.chats.getAll.mockResolvedValue([chat({ unreadCount: 3 })]);
    await act(async () => {
      await result.current.refreshData();
    });
    await act(async () => {
      await result.current.markChatRead('chat-alice');
    });
    expect(result.current.chats[0].unreadCount).toBe(0);
  });

  it('toggles pin, mute and secret on a chat', async () => {
    const { result } = renderHook(() => useData(), { wrapper: Wrapper });
    await flush();
    await act(async () => {
      await result.current.togglePin('chat-alice');
    });
    expect(result.current.chats[0].pinned).toBe(true);
    await act(async () => {
      await result.current.toggleMute('chat-alice');
    });
    expect(result.current.chats[0].muted).toBe(true);
    await act(async () => {
      await result.current.toggleSecret('chat-alice');
    });
    expect(result.current.chats[0].isSecret).toBe(true);
    expect(result.current.chats[0].disappearingSeconds).toBe(60);
    await act(async () => {
      await result.current.toggleSecret('chat-alice');
    });
    expect(result.current.chats[0].isSecret).toBe(false);
    expect(result.current.chats[0].disappearingSeconds).toBe(0);
  });

  it('creates a new direct chat for a contact without an existing one', async () => {
    db.contacts.getAll.mockResolvedValue([
      contact(),
      contact({ id: 'bob', name: 'Bob' }),
    ]);
    const { result } = renderHook(() => useData(), { wrapper: Wrapper });
    await flush();
    let created: Chat;
    await act(async () => {
      created = await result.current.createChat('bob');
    });
    expect(created!.memberIds).toEqual(['me', 'bob']);
    expect(result.current.chats).toHaveLength(3);
  });

  it('returns the existing direct chat when a contact chat already exists', async () => {
    const { result } = renderHook(() => useData(), { wrapper: Wrapper });
    await flush();
    let existing: Chat;
    await act(async () => {
      existing = await result.current.createChat('alice');
    });
    expect(existing!.id).toBe('chat-alice');
  });

  it('creates a group with unique members and an admin', async () => {
    const { result } = renderHook(() => useData(), { wrapper: Wrapper });
    await flush();
    let group: Chat;
    await act(async () => {
      group = await result.current.createGroup('  Hikers  ', [
        'alice',
        'bob',
        'alice',
      ]);
    });
    expect(group!.title).toBe('Hikers');
    expect(group!.memberIds).toEqual(['me', 'alice', 'bob']);
    expect(group!.adminIds).toEqual(['me']);
  });

  it('uses a fallback title for blank group names', async () => {
    const { result } = renderHook(() => useData(), { wrapper: Wrapper });
    await flush();
    let group: Chat;
    await act(async () => {
      group = await result.current.createGroup('  ', ['alice']);
    });
    expect(group!.title).toBe('New Group');
  });

  it('updates the account with a partial patch', async () => {
    const { result } = renderHook(() => useData(), { wrapper: Wrapper });
    await flush();
    await act(async () => {
      await result.current.updateAccount({ name: 'Jane' });
    });
    expect(result.current.account?.name).toBe('Jane');
    expect(db.account.put).toHaveBeenCalled();
  });

  it('updates settings with a partial patch', async () => {
    const { result } = renderHook(() => useData(), { wrapper: Wrapper });
    await flush();
    await act(async () => {
      await result.current.updateSettings({ theme: 'dark' });
    });
    expect(result.current.settings.theme).toBe('dark');
    expect(db.settings.put).toHaveBeenCalled();
  });

  describe('auth actions', () => {
    it('signUp creates account, persists session and reloads data', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.signUp('New User', '+1 555 000 9999', 'newuser');
      });
      expect(db.account.put).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'New User',
          phone: '+1 555 000 9999',
          username: 'newuser',
        })
      );
      expect(db.auth.put).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'phone',
          identifier: '+1 555 000 9999',
        })
      );
      expect(db.auth.get).toHaveBeenCalled();
    });

    it('signIn finds existing account and persists session', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.signIn('phone', '+1 555 010 0000');
      });
      expect(db.account.getAll).toHaveBeenCalled();
      expect(db.auth.put).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'phone',
          identifier: '+1 555 010 0000',
        })
      );
      expect(result.current.session).toEqual(
        expect.objectContaining({
          method: 'phone',
          identifier: '+1 555 010 0000',
        })
      );
    });

    it('signIn throws when account not found', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await expect(
          result.current.signIn('phone', '+1 555 000 0000')
        ).rejects.toThrow('Account not found');
      });
    });

    it('signOut clears session and data', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      expect(result.current.session).not.toBeNull();
      await act(async () => {
        await result.current.signOut();
      });
      expect(db.auth.delete).toHaveBeenCalled();
      expect(result.current.session).toBeNull();
      expect(result.current.account).toBeNull();
      expect(result.current.chats).toHaveLength(0);
      expect(result.current.messages).toHaveLength(0);
    });
  });

  it('loads session on refreshData', async () => {
    const { result } = renderHook(() => useData(), { wrapper: Wrapper });
    await flush();
    expect(result.current.session).toEqual(
      expect.objectContaining({ id: 'session', method: 'phone' })
    );
  });

  it('sets session to null when no auth session exists', async () => {
    db.auth.get.mockResolvedValue(null);
    const { result } = renderHook(() => useData(), { wrapper: Wrapper });
    await flush();
    expect(result.current.session).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });
});
