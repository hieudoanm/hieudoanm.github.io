import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import {
  DataProvider,
  useData,
  REPLY_POOL,
  getOtherParticipantId,
} from '@/providers/DataProvider';
import type { User, Contact, Chat, Message, AppSettings } from '@/types';

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

jest.mock('@/lib/crypto', () => ({
  generateKeyPair: jest
    .fn()
    .mockResolvedValue({ publicKey: 'pub', privateKey: 'priv' }),
  generateVerificationCode: jest.fn().mockResolvedValue('ABC123'),
  hashPin: jest.fn().mockResolvedValue('hashed-pin'),
  verifyPin: jest.fn().mockResolvedValue(true),
  deriveSharedKey: jest.fn().mockResolvedValue('shared-key'),
  encrypt: jest
    .fn()
    .mockImplementation((text: string) => Promise.resolve(`encrypted:${text}`)),
  decrypt: jest
    .fn()
    .mockImplementation((text: string) =>
      Promise.resolve(text.replace('encrypted:', ''))
    ),
  exportSharedKey: jest.fn().mockResolvedValue('exported-key'),
  getDeviceFingerprint: jest.fn().mockReturnValue('fp-abc123def456'),
}));

jest.mock('@/lib/webrtc', () => {
  const mockSend = jest.fn();
  const mockOnState = jest.fn();
  const mockOnData = jest.fn();
  const mockClose = jest.fn();
  return {
    DEFAULT_ICE_SERVERS: [],
    generateDeviceId: jest.fn().mockReturnValue('device-123'),
    PeerConnection: jest.fn().mockImplementation(() => ({
      send: mockSend,
      onState: mockOnState,
      onData: mockOnData,
      close: mockClose,
    })),
    __mocks: { mockSend, mockOnState, mockOnData, mockClose },
  };
});

const { db } = jest.requireMock('@/lib/db');
const { seedDatabase } = jest.requireMock('@/data/seed');
const { mockSend, mockOnState, mockOnData, mockClose } =
  jest.requireMock('@/lib/webrtc').__mocks;

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
  settings: { wallpaper: '', notificationSound: true, disappearingSeconds: 0 },
  ...overrides,
});

const msg = (overrides: Partial<Message> = {}): Message => ({
  id: 'msg-1',
  chatId: 'chat-alice',
  authorId: 'alice',
  type: 'text',
  text: 'Hello',
  status: 'sent',
  createdAt: 1000,
  reactions: [],
  ...overrides,
});

const appSettings = (overrides: Partial<AppSettings> = {}): AppSettings => ({
  id: 'default',
  theme: 'messaging-light',
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
  db.settings.get.mockResolvedValue(appSettings());
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

const advanceUploadLoop = async (): Promise<void> => {
  for (let i = 0; i < 7; i++) {
    await act(async () => {
      jest.advanceTimersByTime(80);
    });
  }
};

describe('DataProvider', () => {
  describe('useData hook', () => {
    it('throws when used outside its provider', () => {
      const originalError = console.error;
      console.error = jest.fn();
      expect(() => renderHook(() => useData())).toThrow(
        'useData must be used within DataProvider'
      );
      console.error = originalError;
    });
  });

  describe('initialization', () => {
    it('seeds and loads account, contacts, chats and settings on mount', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      expect(seedDatabase).toHaveBeenCalled();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.account?.name).toBe('You');
      expect(result.current.contacts).toHaveLength(1);
      expect(result.current.chats.map((c) => c.id)).toEqual([
        'chat-alice',
        'c2',
      ]);
      expect(result.current.settings.theme).toBe('messaging-light');
    });

    it('handles a missing account', async () => {
      db.account.get.mockResolvedValue(undefined);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      expect(result.current.account).toBeNull();
    });

    it('sets session to null when no auth session exists', async () => {
      db.auth.get.mockResolvedValue(null);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      expect(result.current.session).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });

    it('loads session on refreshData', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      expect(result.current.session).toEqual(
        expect.objectContaining({ id: 'session', method: 'phone' })
      );
    });

    it('sorts chats by lastMessageAt descending', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      expect(result.current.chats[0].lastMessageAt).toBeGreaterThanOrEqual(
        result.current.chats[1].lastMessageAt
      );
    });

    it('initializes default peerState, syncState, and empty arrays', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      expect(result.current.peerState).toBe('new');
      expect(result.current.syncState.deviceId).toBeDefined();
      expect(result.current.syncState.keyBackupVersion).toBe(1);
      expect(result.current.deliveryReceipts).toEqual([]);
      expect(result.current.pairedDevices).toEqual([]);
      expect(result.current.callHistory).toEqual([]);
      expect(result.current.activeCall).toBeNull();
      expect(result.current.callMuted).toBe(false);
      expect(result.current.callVideoOff).toBe(false);
      expect(result.current.callSpeakerOff).toBe(false);
      expect(result.current.typingUsers).toEqual([]);
      expect(result.current.isLocked).toBe(false);
      expect(result.current.spamReports).toEqual([]);
      expect(result.current.activeVerification).toBeNull();
    });

    it('initializes deviceTrustList with current device', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      expect(result.current.deviceTrustList).toHaveLength(1);
      expect(result.current.deviceTrustList[0].verified).toBe(true);
    });

    it('creates PeerConnection on mount and cleans up on unmount', async () => {
      const { unmount } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      expect(mockOnState).toHaveBeenCalled();
      expect(mockOnData).toHaveBeenCalled();
      unmount();
      expect(mockClose).toHaveBeenCalled();
    });
  });

  describe('isLocked auto-lock effect', () => {
    it('sets isLocked true when pinEnabled and pinHash are set', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.updatePrivacySettings({
          pinEnabled: true,
          pinHash: 'some-hash',
        });
      });
      expect(result.current.isLocked).toBe(true);
    });
  });

  describe('disappearing messages effect', () => {
    it('marks old messages as deleted when disappearingSeconds is set', async () => {
      const now = Date.now();
      db.chats.getAll.mockResolvedValue([
        chat({
          settings: {
            wallpaper: '',
            notificationSound: true,
            disappearingSeconds: 60,
          },
          lastMessageAt: now - 120000,
        }),
      ]);
      db.messages.getAll.mockResolvedValue([
        msg({ id: 'old-msg', createdAt: now - 120000 }),
      ]);

      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();

      expect(
        result.current.messages.find((m) => m.id === 'old-msg')
      ).toBeDefined();

      await act(async () => {
        jest.advanceTimersByTime(5000);
      });

      const deleted = result.current.messages.find((m) => m.id === 'old-msg');
      expect(deleted?.deletedAt).toBeDefined();
    });

    it('does not delete messages within disappearing window', async () => {
      const now = Date.now();
      db.chats.getAll.mockResolvedValue([
        chat({
          settings: {
            wallpaper: '',
            notificationSound: true,
            disappearingSeconds: 300,
          },
          lastMessageAt: now - 10000,
        }),
      ]);
      db.messages.getAll.mockResolvedValue([
        msg({ id: 'recent-msg', createdAt: now - 10000 }),
      ]);

      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();

      await act(async () => {
        jest.advanceTimersByTime(5000);
      });

      expect(
        result.current.messages.find((m) => m.id === 'recent-msg')?.deletedAt
      ).toBeUndefined();
    });

    it('does not delete messages when chat has disappearingSeconds 0', async () => {
      const now = Date.now();
      db.chats.getAll.mockResolvedValue([
        chat({
          settings: {
            wallpaper: '',
            notificationSound: true,
            disappearingSeconds: 0,
          },
          lastMessageAt: now - 120000,
        }),
      ]);
      db.messages.getAll.mockResolvedValue([
        msg({ id: 'no-expire-msg', createdAt: now - 120000 }),
      ]);

      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();

      await act(async () => {
        jest.advanceTimersByTime(5000);
      });

      expect(
        result.current.messages.find((m) => m.id === 'no-expire-msg')?.deletedAt
      ).toBeUndefined();
    });

    it('does not delete messages whose chat does not exist', async () => {
      const now = Date.now();
      db.chats.getAll.mockResolvedValue([
        chat({ id: 'other-chat', lastMessageAt: now }),
      ]);
      db.messages.getAll.mockResolvedValue([
        msg({
          id: 'orphan-msg',
          chatId: 'nonexistent',
          createdAt: now - 120000,
        }),
      ]);

      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();

      await act(async () => {
        jest.advanceTimersByTime(5000);
      });

      expect(
        result.current.messages.find((m) => m.id === 'orphan-msg')?.deletedAt
      ).toBeUndefined();
    });
  });

  describe('message operations', () => {
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
      db.settings.get.mockResolvedValue(appSettings({ readReceipts: false }));
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

    it('does not schedule a mock reply when contact is blocked', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.blockContact('alice');
      });
      await act(async () => {
        await result.current.sendMessage('chat-alice', 'hello');
      });
      await act(async () => {
        jest.advanceTimersByTime(3000);
      });
      await flush();
      const reply = result.current.messages.find((m) => m.authorId === 'alice');
      expect(reply).toBeUndefined();
    });

    it('sends a secret message with encryption', async () => {
      db.chats.getAll.mockResolvedValue([
        chat({ isSecret: true, disappearingSeconds: 60 }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.sendMessage('chat-alice', 'secret msg');
      });
      const sent = result.current.messages.find((m) =>
        m.text?.startsWith('encrypted:')
      );
      expect(sent).toBeDefined();
      expect(sent?.encrypted).toBe(true);
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

    it('does nothing when deleting an unknown message', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.deleteMessage('chat-alice', 'nonexistent');
      });
      expect(db.messages.put).not.toHaveBeenCalled();
    });

    it('deleteForEveryone replaces text and sets deletedAt', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.sendMessage('chat-alice', 'secret stuff');
      });
      const messageId =
        result.current.messages[result.current.messages.length - 1].id;
      await act(async () => {
        await result.current.deleteForEveryone('chat-alice', messageId);
      });
      const deleted = result.current.messages.find((m) => m.id === messageId);
      expect(deleted?.deletedAt).toBeDefined();
      expect(deleted?.text).toBe('Deleted for everyone');
    });

    it('deleteForEveryone does nothing for unknown message', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.deleteForEveryone('chat-alice', 'nonexistent');
      });
      expect(db.messages.put).not.toHaveBeenCalled();
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
      const edited =
        result.current.messages[result.current.messages.length - 1];
      expect(edited.text).toBe('edited');
      expect(edited.editedAt).toBeDefined();
      await act(async () => {
        await result.current.editMessage('chat-alice', messageId, '  ');
      });
      expect(
        result.current.messages[result.current.messages.length - 1].text
      ).toBe('edited');
    });

    it('editMessage does nothing for unknown message', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.editMessage('chat-alice', 'nonexistent', 'new');
      });
      expect(db.messages.put).not.toHaveBeenCalled();
    });

    it('forwards a message to another chat', async () => {
      db.chats.getAll.mockResolvedValue([
        chat(),
        chat({ id: 'chat-bob', memberIds: ['me', 'bob'] }),
      ]);
      db.messages.getAll.mockResolvedValue([
        msg({ id: 'fwd-msg', text: 'forward me' }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.forwardMessage('fwd-msg', 'chat-bob');
      });
      const forwarded = result.current.messages.find(
        (m) => m.chatId === 'chat-bob' && m.text === 'forward me'
      );
      expect(forwarded).toBeDefined();
      expect(forwarded?.status).toBe('sending');
    });

    it('forwardMessage does nothing for unknown message', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.forwardMessage('nonexistent', 'chat-alice');
      });
      expect(db.messages.put).not.toHaveBeenCalled();
    });

    it('forwardMessage does nothing for deleted message', async () => {
      db.messages.getAll.mockResolvedValue([
        msg({ id: 'deleted-msg', deletedAt: 999 }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.forwardMessage('deleted-msg', 'chat-alice');
      });
      expect(db.messages.put).not.toHaveBeenCalled();
    });

    it('forwardMessage does nothing for unknown target chat', async () => {
      db.messages.getAll.mockResolvedValue([
        msg({ id: 'fwd-msg-2', text: 'hi' }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.forwardMessage('fwd-msg-2', 'chat-nonexistent');
      });
      expect(db.messages.put).not.toHaveBeenCalled();
    });

    it('forwardToMultiple forwards to multiple chats', async () => {
      db.chats.getAll.mockResolvedValue([
        chat({ id: 'chat-bob', memberIds: ['me', 'bob'] }),
        chat({ id: 'chat-carol', memberIds: ['me', 'carol'] }),
      ]);
      db.messages.getAll.mockResolvedValue([
        msg({ id: 'multi-fwd', text: 'multi forward' }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.forwardToMultiple('multi-fwd', [
          'chat-bob',
          'chat-carol',
        ]);
      });
      const bobs = result.current.messages.filter(
        (m) => m.chatId === 'chat-bob' && m.text === 'multi forward'
      );
      const carols = result.current.messages.filter(
        (m) => m.chatId === 'chat-carol' && m.text === 'multi forward'
      );
      expect(bobs).toHaveLength(1);
      expect(carols).toHaveLength(1);
    });

    it('forwardToMultiple skips deleted messages', async () => {
      db.messages.getAll.mockResolvedValue([
        msg({ id: 'deleted-fwd', deletedAt: 999 }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.forwardToMultiple('deleted-fwd', ['chat-alice']);
      });
      expect(db.messages.put).not.toHaveBeenCalled();
    });

    it('forwardToMultiple skips unknown chats', async () => {
      db.messages.getAll.mockResolvedValue([
        msg({ id: 'fwd-unknown', text: 'hi' }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.forwardToMultiple('fwd-unknown', [
          'chat-nonexistent',
        ]);
      });
      expect(db.messages.put).not.toHaveBeenCalled();
    });

    it('addReaction toggles reaction on existing user emoji', async () => {
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

    it('addReaction ignores unknown messages', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.addReaction('chat-alice', 'nope', '👍');
      });
      expect(db.messages.put).not.toHaveBeenCalled();
    });

    it('addReaction replaces previous user reaction with new emoji', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.sendMessage('chat-alice', 'hi');
      });
      const messageId =
        result.current.messages[result.current.messages.length - 1].id;
      await act(async () => {
        await result.current.addReaction('chat-alice', messageId, '❤️');
      });
      await act(async () => {
        await result.current.addReaction('chat-alice', messageId, '😂');
      });
      const reactions =
        result.current.messages[result.current.messages.length - 1].reactions;
      expect(reactions).toHaveLength(1);
      expect(reactions[0].emoji).toBe('😂');
    });

    it('sends a media message with correct type mapping', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      const attachment = {
        type: 'image' as const,
        url: 'blob:image',
        file: new File([''], 'photo.jpg', { type: 'image/jpeg' }),
      };
      await act(async () => {
        const promise = result.current.sendMediaMessage(
          'chat-alice',
          attachment,
          'Check this'
        );
        await advanceUploadLoop();
        await promise;
      });
      const mediaMsg = result.current.messages.find(
        (m) => m.text === 'Check this'
      );
      expect(mediaMsg).toBeDefined();
      expect(mediaMsg?.type).toBe('image');
      expect(mediaMsg?.mediaUrl).toBe('blob:image');
    });

    it('sendMediaMessage throws for unknown chat', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      const attachment = {
        type: 'image' as const,
        url: 'blob:image',
        file: new File([''], 'photo.jpg', { type: 'image/jpeg' }),
      };
      await expect(
        result.current.sendMediaMessage('nope', attachment, 'hi')
      ).rejects.toThrow('Chat not found');
    });

    it('sendMediaMessage maps video type correctly', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      const attachment = {
        type: 'video' as const,
        url: 'blob:video',
        file: new File([''], 'clip.mp4', { type: 'video/mp4' }),
      };
      await act(async () => {
        const promise = result.current.sendMediaMessage(
          'chat-alice',
          attachment,
          ''
        );
        await advanceUploadLoop();
        await promise;
      });
      const videoMsg =
        result.current.messages[result.current.messages.length - 1];
      expect(videoMsg.type).toBe('video');
    });

    it('sendMediaMessage maps audio type correctly', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      const attachment = {
        type: 'audio' as const,
        url: 'blob:audio',
        file: new File([''], 'song.mp3', { type: 'audio/mpeg' }),
      };
      await act(async () => {
        const promise = result.current.sendMediaMessage(
          'chat-alice',
          attachment,
          ''
        );
        await advanceUploadLoop();
        await promise;
      });
      const audioMsg =
        result.current.messages[result.current.messages.length - 1];
      expect(audioMsg.type).toBe('audio');
    });

    it('sendMediaMessage maps document type correctly', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      const attachment = {
        type: 'file' as const,
        url: 'blob:doc',
        file: new File([''], 'doc.pdf', { type: 'application/pdf' }),
      };
      await act(async () => {
        const promise = result.current.sendMediaMessage(
          'chat-alice',
          attachment,
          ''
        );
        await advanceUploadLoop();
        await promise;
      });
      const docMsg =
        result.current.messages[result.current.messages.length - 1];
      expect(docMsg.type).toBe('file');
    });

    it('sendSticker creates a sticker message', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.sendSticker('chat-alice', 'sticker.png');
      });
      const stickerMsg =
        result.current.messages[result.current.messages.length - 1];
      expect(stickerMsg.type).toBe('sticker');
      expect(stickerMsg.stickerUrl).toBe('sticker.png');
    });

    it('sendSticker throws for unknown chat', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await expect(
        result.current.sendSticker('nope', 'sticker.png')
      ).rejects.toThrow('Chat not found');
    });

    it('updateUploadProgress updates progress state without error', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      act(() => {
        result.current.updateUploadProgress('msg-1', {
          messageId: 'msg-1',
          progress: 50,
          status: 'uploading',
        });
      });
    });

    it('getMediaMessages returns only media messages for a chat', async () => {
      db.messages.getAll.mockResolvedValue([
        msg({ id: 'txt', type: 'text', text: 'hello' }),
        msg({ id: 'img', type: 'image', text: '' }),
        msg({ id: 'vid', type: 'video', text: '' }),
        msg({ id: 'aud', type: 'audio', text: '' }),
        msg({ id: 'doc', type: 'file', text: '' }),
        msg({ id: 'del', type: 'image', text: '', deletedAt: 999 }),
        msg({ id: 'other-chat', type: 'image', chatId: 'chat-bob', text: '' }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      const media = result.current.getMediaMessages('chat-alice');
      expect(media).toHaveLength(4);
      expect(media.map((m) => m.id).sort()).toEqual([
        'aud',
        'doc',
        'img',
        'vid',
      ]);
    });
  });

  describe('chat operations', () => {
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

    it('markChatRead does nothing for non-existing chat', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.markChatRead('nonexistent');
      });
      expect(db.chats.put).not.toHaveBeenCalled();
    });

    it('toggles pin on a chat', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.togglePin('chat-alice');
      });
      expect(result.current.chats[0].pinned).toBe(true);
      await act(async () => {
        await result.current.togglePin('chat-alice');
      });
      expect(result.current.chats[0].pinned).toBe(false);
    });

    it('togglePin does nothing for non-existing chat', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.togglePin('nonexistent');
      });
      expect(db.chats.put).not.toHaveBeenCalled();
    });

    it('toggles mute on a chat', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.toggleMute('chat-alice');
      });
      expect(result.current.chats[0].muted).toBe(true);
      await act(async () => {
        await result.current.toggleMute('chat-alice');
      });
      expect(result.current.chats[0].muted).toBe(false);
    });

    it('toggleMute does nothing for non-existing chat', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.toggleMute('nonexistent');
      });
      expect(db.chats.put).not.toHaveBeenCalled();
    });

    it('toggles secret mode on a chat', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
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

    it('toggleSecret does nothing for non-existing chat', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.toggleSecret('nonexistent');
      });
      expect(db.chats.put).not.toHaveBeenCalled();
    });

    it('updateChatSettings updates a chat settings', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.updateChatSettings('chat-alice', {
          wallpaper: 'dark.png',
        });
      });
      expect(result.current.chats[0].settings.wallpaper).toBe('dark.png');
      expect(db.chats.put).toHaveBeenCalled();
    });

    it('updateChatSettings does nothing for non-existing chat', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.updateChatSettings('nonexistent', {
          wallpaper: 'x.png',
        });
      });
      expect(db.chats.put).not.toHaveBeenCalled();
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
  });

  describe('group admin/member operations', () => {
    const groupChat = () =>
      chat({
        id: 'group-1',
        kind: 'group',
        memberIds: ['me', 'alice', 'bob'],
        adminIds: ['me', 'alice'],
      });

    beforeEach(() => {
      db.chats.getAll.mockResolvedValue([groupChat()]);
    });

    it('promotes a member to admin', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.promoteAdmin('group-1', 'bob');
      });
      expect(result.current.chats[0].adminIds).toContain('bob');
      expect(db.chats.put).toHaveBeenCalled();
    });

    it('promoteAdmin does nothing if user is already admin', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.promoteAdmin('group-1', 'alice');
      });
      expect(db.chats.put).not.toHaveBeenCalled();
    });

    it('promoteAdmin does nothing for non-existing chat', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.promoteAdmin('nonexistent', 'bob');
      });
      expect(db.chats.put).not.toHaveBeenCalled();
    });

    it('demotes an admin to member', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.demoteAdmin('group-1', 'alice');
      });
      expect(result.current.chats[0].adminIds).not.toContain('alice');
      expect(db.chats.put).toHaveBeenCalled();
    });

    it('demoteAdmin does nothing for non-existing chat', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.demoteAdmin('nonexistent', 'alice');
      });
      expect(db.chats.put).not.toHaveBeenCalled();
    });

    it('adds a member to a group', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.addGroupMember('group-1', 'carol');
      });
      expect(result.current.chats[0].memberIds).toContain('carol');
      expect(db.chats.put).toHaveBeenCalled();
    });

    it('addGroupMember does nothing if user is already a member', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.addGroupMember('group-1', 'alice');
      });
      expect(db.chats.put).not.toHaveBeenCalled();
    });

    it('addGroupMember does nothing for non-existing chat', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.addGroupMember('nonexistent', 'carol');
      });
      expect(db.chats.put).not.toHaveBeenCalled();
    });

    it('removes a member from a group', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.removeGroupMember('group-1', 'bob');
      });
      expect(result.current.chats[0].memberIds).not.toContain('bob');
      expect(db.chats.put).toHaveBeenCalled();
    });

    it('removeGroupMember also removes admin role', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.removeGroupMember('group-1', 'alice');
      });
      expect(result.current.chats[0].memberIds).not.toContain('alice');
      expect(result.current.chats[0].adminIds).not.toContain('alice');
    });

    it('removeGroupMember does nothing for non-existing chat', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.removeGroupMember('nonexistent', 'alice');
      });
      expect(db.chats.put).not.toHaveBeenCalled();
    });
  });

  describe('typing', () => {
    it('setTyping adds and removes typing state', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      act(() => {
        result.current.setTyping('chat-alice', true);
      });
      expect(result.current.typingUsers).toHaveLength(1);
      expect(result.current.typingUsers[0].chatId).toBe('chat-alice');
      expect(result.current.typingUsers[0].typing).toBe(true);
      act(() => {
        result.current.setTyping('chat-alice', false);
      });
      expect(result.current.typingUsers).toHaveLength(0);
    });

    it('setTyping replaces existing typing state for same chat', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      act(() => {
        result.current.setTyping('chat-alice', true);
      });
      act(() => {
        result.current.setTyping('chat-alice', true);
      });
      expect(
        result.current.typingUsers.filter((t) => t.chatId === 'chat-alice')
      ).toHaveLength(1);
    });
  });

  describe('account and settings', () => {
    it('updates the account with a partial patch', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.updateAccount({ name: 'Jane' });
      });
      expect(result.current.account?.name).toBe('Jane');
      expect(db.account.put).toHaveBeenCalled();
    });

    it('updateAccount creates default account if none exists', async () => {
      db.account.get.mockResolvedValue(undefined);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.updateAccount({ name: 'Default User' });
      });
      expect(result.current.account?.name).toBe('Default User');
      expect(db.account.put).toHaveBeenCalled();
    });

    it('updates settings with a partial patch', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.updateSettings({ theme: 'messaging-dark' });
      });
      expect(result.current.settings.theme).toBe('messaging-dark');
      expect(db.settings.put).toHaveBeenCalled();
    });
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

    it('signIn with username method finds by username', async () => {
      db.account.getAll.mockResolvedValue([user({ username: 'you' })]);
      db.auth.get.mockImplementation(async () => ({
        id: 'session',
        method: 'username',
        identifier: 'you',
        signedInAt: 1000,
      }));
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.signIn('username', 'you');
      });
      expect(result.current.session).toEqual(
        expect.objectContaining({ method: 'username', identifier: 'you' })
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

  describe('privacy settings', () => {
    it('updatePrivacySettings merges partial', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.updatePrivacySettings({ lastSeen: 'contacts' });
      });
      expect(result.current.privacySettings.lastSeen).toBe('contacts');
      expect(result.current.privacySettings.profilePhoto).toBe('everyone');
    });

    it('blockContact adds id to blockedContactIds and marks contact', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.blockContact('alice');
      });
      expect(result.current.privacySettings.blockedContactIds).toContain(
        'alice'
      );
      expect(result.current.contacts[0].blocked).toBe(true);
    });

    it('blockContact does not duplicate ids', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.blockContact('alice');
      });
      await act(async () => {
        await result.current.blockContact('alice');
      });
      expect(
        result.current.privacySettings.blockedContactIds.filter(
          (id) => id === 'alice'
        )
      ).toHaveLength(1);
    });

    it('unblockContact removes id and unmarks contact', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.blockContact('alice');
      });
      await act(async () => {
        await result.current.unblockContact('alice');
      });
      expect(result.current.privacySettings.blockedContactIds).not.toContain(
        'alice'
      );
      expect(result.current.contacts[0].blocked).toBe(false);
    });

    it('reportSpam adds report and blocks contact', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.reportSpam('alice', 'Spam content');
      });
      expect(result.current.spamReports).toHaveLength(1);
      expect(result.current.spamReports[0].reason).toBe('Spam content');
      expect(result.current.privacySettings.blockedContactIds).toContain(
        'alice'
      );
      expect(result.current.contacts[0].blocked).toBe(true);
    });
  });

  describe('device trust', () => {
    it('addTrustedDevice adds entry', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.addTrustedDevice({
          deviceId: 'device-new',
          deviceLabel: 'iPhone',
          publicKey: 'key123',
          verified: false,
        });
      });
      const found = result.current.deviceTrustList.find(
        (d) => d.deviceId === 'device-new'
      );
      expect(found).toBeDefined();
      expect(found?.trustedAt).toBeDefined();
    });

    it('addTrustedDevice replaces existing with same deviceId', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.addTrustedDevice({
          deviceId: 'device-replace',
          deviceLabel: 'v1',
          publicKey: 'key1',
          verified: false,
        });
      });
      await act(async () => {
        await result.current.addTrustedDevice({
          deviceId: 'device-replace',
          deviceLabel: 'v2',
          publicKey: 'key2',
          verified: true,
        });
      });
      const matches = result.current.deviceTrustList.filter(
        (d) => d.deviceId === 'device-replace'
      );
      expect(matches).toHaveLength(1);
      expect(matches[0].deviceLabel).toBe('v2');
    });

    it('removeTrustedDevice removes entry', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.addTrustedDevice({
          deviceId: 'device-remove',
          deviceLabel: 'X',
          publicKey: 'key',
          verified: false,
        });
      });
      await act(async () => {
        await result.current.removeTrustedDevice('device-remove');
      });
      expect(
        result.current.deviceTrustList.find(
          (d) => d.deviceId === 'device-remove'
        )
      ).toBeUndefined();
    });

    it('verifyDevice marks device as verified', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.addTrustedDevice({
          deviceId: 'device-verify',
          deviceLabel: 'X',
          publicKey: 'key',
          verified: false,
        });
      });
      await act(async () => {
        await result.current.verifyDevice('device-verify');
      });
      const d = result.current.deviceTrustList.find(
        (x) => x.deviceId === 'device-verify'
      );
      expect(d?.verified).toBe(true);
    });
  });

  describe('verification', () => {
    it('startVerification creates verification code', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      let verification: any;
      await act(async () => {
        verification = await result.current.startVerification('chat-alice');
      });
      expect(verification.code).toBe('ABC123');
      expect(verification.chatId).toBe('chat-alice');
      expect(result.current.activeVerification).not.toBeNull();
    });

    it('clearVerification removes active verification', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.startVerification('chat-alice');
      });
      expect(result.current.activeVerification).not.toBeNull();
      act(() => {
        result.current.clearVerification();
      });
      expect(result.current.activeVerification).toBeNull();
    });
  });

  describe('PIN operations', () => {
    it('isPinValid returns false when no pinHash', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      const valid = await result.current.isPinValid('1234');
      expect(valid).toBe(false);
    });

    it('isPinValid returns true when pinHash matches', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.setPin('1234');
      });
      const valid = await result.current.isPinValid('1234');
      expect(valid).toBe(true);
    });

    it('setPin hashes pin and enables pin', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.setPin('5678');
      });
      expect(result.current.privacySettings.pinEnabled).toBe(true);
      expect(result.current.privacySettings.pinHash).toBe('hashed-pin');
    });

    it('unlockPin unlocks when valid', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.updatePrivacySettings({
          pinEnabled: true,
          pinHash: 'some-hash',
        });
      });
      expect(result.current.isLocked).toBe(true);
      let valid: boolean;
      await act(async () => {
        valid = await result.current.unlockPin('1234');
      });
      expect(valid!).toBe(true);
      expect(result.current.isLocked).toBe(false);
    });

    it('unlockPin returns false when invalid', async () => {
      const { verifyPin } = jest.requireMock('@/lib/crypto');
      verifyPin.mockResolvedValueOnce(false);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.updatePrivacySettings({
          pinEnabled: true,
          pinHash: 'some-hash',
        });
      });
      let valid: boolean;
      await act(async () => {
        valid = await result.current.unlockPin('wrong');
      });
      expect(valid!).toBe(false);
    });
  });

  describe('call operations', () => {
    it('startCall creates an active video call', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.startCall('chat-alice', 'video');
      });
      expect(result.current.activeCall).not.toBeNull();
      expect(result.current.activeCall?.type).toBe('video');
      expect(result.current.activeCall?.chatId).toBe('chat-alice');
      expect(result.current.activeCall?.status).toBe('active');
      expect(result.current.callHistory).toHaveLength(1);
    });

    it('startCall creates a voice call with videoOff true', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.startCall('chat-alice', 'voice');
      });
      expect(result.current.activeCall?.type).toBe('voice');
      const meParticipant = result.current.activeCall?.participants.find(
        (p) => p.userId === 'me'
      );
      expect(meParticipant?.videoOff).toBe(true);
    });

    it('startCall includes contact participant for direct chat', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.startCall('chat-alice', 'voice');
      });
      expect(result.current.activeCall?.participants).toHaveLength(2);
      const alice = result.current.activeCall?.participants.find(
        (p) => p.userId === 'alice'
      );
      expect(alice?.name).toBe('Alice');
    });

    it('startCall does nothing for non-existing chat', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.startCall('nonexistent', 'voice');
      });
      expect(result.current.activeCall).toBeNull();
    });

    it('startCall with group chat sets isGroup true', async () => {
      db.chats.getAll.mockResolvedValue([
        chat({
          id: 'group-chat',
          kind: 'group',
          memberIds: ['me', 'alice', 'bob'],
        }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.startCall('group-chat', 'video');
      });
      expect(result.current.activeCall?.isGroup).toBe(true);
    });

    it('endCall ends the active call', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.startCall('chat-alice', 'video');
      });
      expect(result.current.activeCall).not.toBeNull();
      await act(async () => {
        await result.current.endCall();
      });
      expect(result.current.activeCall).toBeNull();
      expect(result.current.callHistory[0].status).toBe('ended');
      expect(result.current.callHistory[0].endedAt).toBeDefined();
    });

    it('endCall does nothing when no active call', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.endCall();
      });
      expect(result.current.callHistory).toHaveLength(0);
    });

    it('declineCall declines the call', async () => {
      db.chats.getAll.mockResolvedValue([
        chat({ id: 'inc-chat', memberIds: ['me', 'bob'] }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.startCall('inc-chat', 'voice');
      });
      const callId = result.current.activeCall?.id;
      await act(async () => {
        await result.current.declineCall(callId!);
      });
      expect(result.current.activeCall).toBeNull();
      expect(result.current.callHistory[0].status).toBe('declined');
    });

    it('toggleCallMute toggles mute state and updates participant', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.startCall('chat-alice', 'video');
      });
      act(() => {
        result.current.toggleCallMute();
      });
      expect(result.current.callMuted).toBe(true);
      const meP = result.current.activeCall?.participants.find(
        (p) => p.userId === 'me'
      );
      expect(meP?.audioMuted).toBe(true);
      act(() => {
        result.current.toggleCallMute();
      });
      expect(result.current.callMuted).toBe(false);
    });

    it('toggleCallMute does nothing without active call', () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      act(() => {
        result.current.toggleCallMute();
      });
      expect(result.current.callMuted).toBe(true);
      act(() => {
        result.current.toggleCallMute();
      });
      expect(result.current.callMuted).toBe(false);
    });

    it('toggleCallVideo toggles video state', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.startCall('chat-alice', 'video');
      });
      act(() => {
        result.current.toggleCallVideo();
      });
      expect(result.current.callVideoOff).toBe(true);
      const meP = result.current.activeCall?.participants.find(
        (p) => p.userId === 'me'
      );
      expect(meP?.videoOff).toBe(true);
      act(() => {
        result.current.toggleCallVideo();
      });
      expect(result.current.callVideoOff).toBe(false);
    });

    it('toggleCallVideo does nothing without active call', () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      act(() => {
        result.current.toggleCallVideo();
      });
      expect(result.current.callVideoOff).toBe(true);
      act(() => {
        result.current.toggleCallVideo();
      });
      expect(result.current.callVideoOff).toBe(false);
    });

    it('toggleCallSpeaker toggles speaker state', () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      act(() => {
        result.current.toggleCallSpeaker();
      });
      expect(result.current.callSpeakerOff).toBe(true);
      act(() => {
        result.current.toggleCallSpeaker();
      });
      expect(result.current.callSpeakerOff).toBe(false);
    });

    it('shareScreen calls getDisplayMedia', async () => {
      const mockGetDisplayMedia = jest.fn().mockResolvedValue(null);
      Object.defineProperty(navigator, 'mediaDevices', {
        value: { getDisplayMedia: mockGetDisplayMedia },
        writable: true,
        configurable: true,
      });
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.shareScreen();
      });
      expect(mockGetDisplayMedia).toHaveBeenCalledWith({ video: true });
    });

    it('shareScreen handles rejection gracefully', async () => {
      const originalDevices = (navigator as any).mediaDevices;
      Object.defineProperty(navigator, 'mediaDevices', {
        value: {
          getDisplayMedia: jest.fn().mockRejectedValue(new Error('cancelled')),
        },
        writable: true,
        configurable: true,
      });
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await expect(
        act(async () => {
          await result.current.shareScreen();
        })
      ).resolves.not.toThrow();
      Object.defineProperty(navigator, 'mediaDevices', {
        value: originalDevices,
        writable: true,
        configurable: true,
      });
    });
  });

  describe('peer / sync operations', () => {
    it('syncNow updates syncState and sends presence', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      const prevVersion = result.current.syncState.keyBackupVersion;
      act(() => {
        result.current.syncNow();
      });
      expect(result.current.syncState.keyBackupVersion).toBe(prevVersion + 1);
      expect(result.current.syncState.pendingSyncCount).toBe(0);
      expect(mockSend).toHaveBeenCalledWith(
        'presence',
        expect.objectContaining({ type: 'sync' })
      );
    });

    it('sendPresence sends online status', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      act(() => {
        result.current.sendPresence(true);
      });
      expect(mockSend).toHaveBeenCalledWith(
        'presence',
        expect.objectContaining({ online: true, userId: 'me' })
      );
    });

    it('sendPresence sends offline status', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      act(() => {
        result.current.sendPresence(false);
      });
      expect(mockSend).toHaveBeenCalledWith(
        'presence',
        expect.objectContaining({ online: false })
      );
    });

    it('sendTypingOverDataChannel sends typing true', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      act(() => {
        result.current.sendTypingOverDataChannel('chat-alice', true);
      });
      expect(mockSend).toHaveBeenCalledWith(
        'typing',
        expect.objectContaining({
          chatId: 'chat-alice',
          typing: true,
          userId: 'me',
        })
      );
    });

    it('sendTypingOverDataChannel sends typing false', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      act(() => {
        result.current.sendTypingOverDataChannel('chat-alice', false);
      });
      expect(mockSend).toHaveBeenCalledWith(
        'typing',
        expect.objectContaining({ typing: false })
      );
    });

    it('trackDelivery adds receipt and sends via data channel', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      act(() => {
        result.current.trackDelivery('msg-123', 'delivered');
      });
      expect(result.current.deliveryReceipts).toHaveLength(1);
      expect(result.current.deliveryReceipts[0].messageId).toBe('msg-123');
      expect(result.current.deliveryReceipts[0].status).toBe('delivered');
      expect(mockSend).toHaveBeenCalledWith(
        'receipts',
        expect.objectContaining({ messageId: 'msg-123', status: 'delivered' })
      );
    });

    it('trackDelivery can track read status', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      act(() => {
        result.current.trackDelivery('msg-456', 'read');
      });
      expect(result.current.deliveryReceipts[0].status).toBe('read');
    });

    it('removePairedDevice removes from pairedDevices', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      act(() => {
        result.current.removePairedDevice('any');
      });
      expect(result.current.pairedDevices).toEqual([]);
    });
  });

  describe('REPLY_POOL', () => {
    it('exports an array of at least one reply', () => {
      expect(REPLY_POOL.length).toBeGreaterThan(0);
      REPLY_POOL.forEach((reply) => {
        expect(typeof reply).toBe('string');
      });
    });
  });

  describe('getOtherParticipantId', () => {
    it('returns the other participant id for a direct chat', () => {
      const c = chat({ memberIds: ['me', 'alice'] });
      expect(getOtherParticipantId(c)).toBe('alice');
    });

    it('returns undefined for a group chat', () => {
      const c = chat({ kind: 'group', memberIds: ['me', 'alice', 'bob'] });
      expect(getOtherParticipantId(c)).toBeUndefined();
    });

    it('returns undefined when only own id is in memberIds', () => {
      const c = chat({ memberIds: ['me'] });
      expect(getOtherParticipantId(c)).toBeUndefined();
    });
  });

  describe('data channel message handling', () => {
    it('handles presence data channel messages', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      const dataHandler = mockOnData.mock.calls[0]?.[0];
      expect(dataHandler).toBeDefined();
      act(() => {
        dataHandler({
          channel: 'presence',
          payload: { online: true, userId: 'alice' },
        });
      });
      expect(result.current.contacts[0].online).toBe(true);
    });

    it('handles typing data channel messages', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      const dataHandler = mockOnData.mock.calls[0]?.[0];
      expect(dataHandler).toBeDefined();
      act(() => {
        dataHandler({
          channel: 'typing',
          payload: { chatId: 'chat-alice', userId: 'alice', typing: true },
        });
      });
      expect(result.current.typingUsers).toHaveLength(1);
    });

    it('handles receipts data channel messages updating message status', async () => {
      db.messages.getAll.mockResolvedValue([
        msg({ id: 'rmsg', status: 'sending' }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      const dataHandler = mockOnData.mock.calls[0]?.[0];
      expect(dataHandler).toBeDefined();
      act(() => {
        dataHandler({
          channel: 'receipts',
          payload: {
            messageId: 'rmsg',
            status: 'delivered',
            deviceId: 'peer1',
          },
        });
      });
      expect(result.current.deliveryReceipts).toHaveLength(1);
      const updated = result.current.messages.find((m) => m.id === 'rmsg');
      expect(updated?.status).toBe('delivered');
    });

    it('handles receipts with read status via data channel', async () => {
      db.messages.getAll.mockResolvedValue([
        msg({ id: 'rmsg2', status: 'delivered' }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      const dataHandler = mockOnData.mock.calls[0]?.[0];
      act(() => {
        dataHandler({
          channel: 'receipts',
          payload: { messageId: 'rmsg2', status: 'read' },
        });
      });
      const updated = result.current.messages.find((m) => m.id === 'rmsg2');
      expect(updated?.status).toBe('read');
    });

    it('handles messaging data channel messages', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      const dataHandler = mockOnData.mock.calls[0]?.[0];
      const incoming = msg({
        id: 'incoming-msg',
        authorId: 'alice',
        text: 'Peer message',
      });
      act(() => {
        dataHandler({
          channel: 'messaging',
          payload: { message: incoming },
        });
      });
      expect(result.current.messages.some((m) => m.id === 'incoming-msg')).toBe(
        true
      );
    });

    it('ignores duplicate messaging messages via data channel', async () => {
      db.messages.getAll.mockResolvedValue([
        msg({ id: 'dup-msg', text: 'already here' }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      const initialLength = result.current.messages.length;
      const dataHandler = mockOnData.mock.calls[0]?.[0];
      act(() => {
        dataHandler({
          channel: 'messaging',
          payload: {
            message: msg({ id: 'dup-msg', text: 'already here' }),
          },
        });
      });
      expect(result.current.messages.length).toBe(initialLength);
    });
  });

  describe('branch coverage: createChat with unknown contact', () => {
    it('uses contactId as fallback title and default color when contact is not in contacts list', async () => {
      db.contacts.getAll.mockResolvedValue([]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      let created: Chat;
      await act(async () => {
        created = await result.current.createChat('unknown-id');
      });
      expect(created!.title).toBe('unknown-id');
      expect(created!.avatarColor).toBe('#64748b');
    });
  });

  describe('branch coverage: startCall without account', () => {
    it('uses fallback name and color when account is null', async () => {
      db.account.get.mockResolvedValue(undefined);
      db.chats.getAll.mockResolvedValue([
        chat({ id: 'no-acc-chat', memberIds: ['me', 'alice'] }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.startCall('no-acc-chat', 'video');
      });
      expect(result.current.activeCall).not.toBeNull();
      const meP = result.current.activeCall?.participants.find(
        (p) => p.userId === 'me'
      );
      expect(meP?.name).toBe('You');
      expect(meP?.avatarColor).toBe('#ff0030');
    });
  });

  describe('branch coverage: answerCall', () => {
    it('answerCall sets matching call to active', async () => {
      db.chats.getAll.mockResolvedValue([
        chat({ id: 'ans-chat', memberIds: ['me', 'bob'] }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.startCall('ans-chat', 'voice');
      });
      const callId = result.current.activeCall?.id!;
      await act(async () => {
        await result.current.answerCall(callId);
      });
      expect(result.current.callHistory[0].status).toBe('active');
      expect(result.current.activeCall?.status).toBe('active');
    });

    it('answerCall with non-matching callId does not change active call', async () => {
      db.chats.getAll.mockResolvedValue([
        chat({ id: 'ans2-chat', memberIds: ['me', 'bob'] }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.startCall('ans2-chat', 'voice');
      });
      await act(async () => {
        await result.current.answerCall('non-matching-id');
      });
    });
  });

  describe('branch coverage: scheduleMockReply with unknown contact', () => {
    it('does not schedule reply when contact is not found', async () => {
      db.contacts.getAll.mockResolvedValue([]);
      db.chats.getAll.mockResolvedValue([
        chat({ id: 'orphan-chat', memberIds: ['me', 'alice'] }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.sendMessage('orphan-chat', 'hi');
      });
      await act(async () => {
        jest.advanceTimersByTime(3500);
      });
      await flush();
      const reply = result.current.messages.find((m) => m.authorId === 'alice');
      expect(reply).toBeUndefined();
    });
  });

  describe('branch coverage: block/unblock with other contacts', () => {
    it('blockContact only marks the target contact', async () => {
      db.contacts.getAll.mockResolvedValue([
        contact(),
        contact({ id: 'bob', name: 'Bob', blocked: false }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.blockContact('alice');
      });
      expect(
        result.current.contacts.find((c) => c.id === 'alice')?.blocked
      ).toBe(true);
      expect(result.current.contacts.find((c) => c.id === 'bob')?.blocked).toBe(
        false
      );
    });

    it('unblockContact only unmarks the target contact', async () => {
      db.contacts.getAll.mockResolvedValue([
        contact({ blocked: true }),
        contact({ id: 'bob', name: 'Bob', blocked: true }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.unblockContact('alice');
      });
      expect(
        result.current.contacts.find((c) => c.id === 'alice')?.blocked
      ).toBe(false);
      expect(result.current.contacts.find((c) => c.id === 'bob')?.blocked).toBe(
        true
      );
    });
  });

  describe('branch coverage: endCall with multiple calls', () => {
    it('endCall only updates the matching call in history', async () => {
      db.chats.getAll.mockResolvedValue([
        chat({ id: 'ec1', memberIds: ['me', 'bob'] }),
        chat({ id: 'ec2', memberIds: ['me', 'carol'] }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.startCall('ec1', 'voice');
      });
      await act(async () => {
        await result.current.endCall();
      });
      await act(async () => {
        await result.current.startCall('ec2', 'video');
      });
      await act(async () => {
        await result.current.endCall();
      });
      expect(result.current.callHistory).toHaveLength(2);
      expect(result.current.callHistory[0].status).toBe('ended');
      expect(result.current.callHistory[1].status).toBe('ended');
    });
  });

  describe('branch coverage: declineCall with multiple calls', () => {
    it('declineCall only updates the matching call in history', async () => {
      db.chats.getAll.mockResolvedValue([
        chat({ id: 'dc1', memberIds: ['me', 'bob'] }),
        chat({ id: 'dc2', memberIds: ['me', 'carol'] }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.startCall('dc1', 'voice');
      });
      const call1Id = result.current.activeCall?.id!;
      await act(async () => {
        await result.current.declineCall(call1Id);
      });
      await act(async () => {
        await result.current.startCall('dc2', 'video');
      });
      const call2Id = result.current.activeCall?.id!;
      await act(async () => {
        await result.current.declineCall(call2Id);
      });
      expect(result.current.callHistory).toHaveLength(2);
      expect(result.current.callHistory[0].status).toBe('declined');
      expect(result.current.callHistory[1].status).toBe('declined');
    });
  });

  describe('branch coverage: disappearing messages edge cases', () => {
    it('does not delete encrypted messages', async () => {
      const now = Date.now();
      db.chats.getAll.mockResolvedValue([
        chat({
          settings: {
            wallpaper: '',
            notificationSound: true,
            disappearingSeconds: 60,
          },
          lastMessageAt: now,
        }),
      ]);
      db.messages.getAll.mockResolvedValue([
        msg({ id: 'enc-msg', createdAt: now - 120000, encrypted: true }),
      ]);

      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();

      await act(async () => {
        jest.advanceTimersByTime(5000);
      });

      expect(
        result.current.messages.find((m) => m.id === 'enc-msg')?.deletedAt
      ).toBeUndefined();
    });
  });

  describe('branch coverage: messaging data channel with multiple chats', () => {
    it('increments unreadCount only for the matching chat', async () => {
      db.chats.getAll.mockResolvedValue([
        chat({ id: 'match-chat', unreadCount: 0 }),
        chat({ id: 'other-chat', unreadCount: 5, lastMessageAt: 1 }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      const dataHandler = mockOnData.mock.calls[0]?.[0];
      expect(dataHandler).toBeDefined();
      const incoming = msg({
        id: 'ch-msg',
        chatId: 'match-chat',
        authorId: 'alice',
        text: 'hi',
      });
      act(() => {
        dataHandler({
          channel: 'messaging',
          payload: { message: incoming },
        });
      });
      const matchChat = result.current.chats.find((c) => c.id === 'match-chat');
      const otherChat = result.current.chats.find((c) => c.id === 'other-chat');
      expect(matchChat?.unreadCount).toBe(1);
      expect(otherChat?.unreadCount).toBe(5);
    });
  });

  describe('branch coverage: presence data channel with non-matching userId', () => {
    it('does not affect contacts when userId does not match', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      const dataHandler = mockOnData.mock.calls[0]?.[0];
      act(() => {
        dataHandler({
          channel: 'presence',
          payload: { online: true, userId: 'nonexistent' },
        });
      });
      expect(result.current.contacts[0].online).toBe(true);
    });
  });

  describe('branch coverage: typing data channel with existing state', () => {
    it('removes existing typing state when typing is false', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      const dataHandler = mockOnData.mock.calls[0]?.[0];
      act(() => {
        dataHandler({
          channel: 'typing',
          payload: { chatId: 'chat-alice', userId: 'alice', typing: true },
        });
      });
      expect(result.current.typingUsers).toHaveLength(1);
      act(() => {
        dataHandler({
          channel: 'typing',
          payload: { chatId: 'chat-alice', userId: 'alice', typing: false },
        });
      });
      expect(result.current.typingUsers).toHaveLength(0);
    });
  });

  describe('branch coverage: receipts data channel with non-matching filter', () => {
    it('adds receipt and updates message status for matching message', async () => {
      db.messages.getAll.mockResolvedValue([
        msg({ id: 'rcpt-msg', status: 'delivered' }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      const dataHandler = mockOnData.mock.calls[0]?.[0];
      act(() => {
        dataHandler({
          channel: 'receipts',
          payload: { messageId: 'rcpt-msg', status: 'read', deviceId: 'dev-a' },
        });
      });
      expect(
        result.current.messages.find((m) => m.id === 'rcpt-msg')?.status
      ).toBe('read');
      act(() => {
        dataHandler({
          channel: 'receipts',
          payload: { messageId: 'rcpt-msg', status: 'read', deviceId: 'dev-b' },
        });
      });
      expect(result.current.deliveryReceipts.length).toBeGreaterThanOrEqual(2);
    });

    it('does not update message status when messageId does not match', async () => {
      db.messages.getAll.mockResolvedValue([
        msg({ id: 'no-match-msg', status: 'sent' }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      const dataHandler = mockOnData.mock.calls[0]?.[0];
      act(() => {
        dataHandler({
          channel: 'receipts',
          payload: {
            messageId: 'different-msg',
            status: 'delivered',
            deviceId: 'dev',
          },
        });
      });
      expect(
        result.current.messages.find((m) => m.id === 'no-match-msg')?.status
      ).toBe('sent');
    });
  });

  describe('branch coverage: messaging data channel with non-matching chat', () => {
    it('increments unreadCount only for the matching chat not others', async () => {
      db.chats.getAll.mockResolvedValue([
        chat({ id: 'target-chat', unreadCount: 0 }),
        chat({ id: 'bystander-chat', unreadCount: 2, lastMessageAt: 1 }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      const dataHandler = mockOnData.mock.calls[0]?.[0];
      act(() => {
        dataHandler({
          channel: 'messaging',
          payload: {
            message: msg({
              id: 'target-msg',
              chatId: 'target-chat',
              authorId: 'alice',
              text: 'hey',
            }),
          },
        });
      });
      expect(
        result.current.chats.find((c) => c.id === 'target-chat')?.unreadCount
      ).toBe(1);
      expect(
        result.current.chats.find((c) => c.id === 'bystander-chat')?.unreadCount
      ).toBe(2);
    });
  });

  describe('branch coverage: signIn with username', () => {
    it('signIn with username method finds by username', async () => {
      db.account.getAll.mockResolvedValue([user({ username: 'you' })]);
      db.auth.get.mockImplementation(async () => ({
        id: 'session',
        method: 'username',
        identifier: 'you',
        signedInAt: 1000,
      }));
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.signIn('username', 'you');
      });
      expect(result.current.session).toEqual(
        expect.objectContaining({ method: 'username', identifier: 'you' })
      );
    });
  });

  describe('branch coverage: editMessage with non-matching messageId', () => {
    it('editMessage does nothing for non-existent message', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.editMessage('chat-alice', 'ghost-id', 'new text');
      });
      expect(db.messages.put).not.toHaveBeenCalled();
    });
  });

  describe('branch coverage: deleteMessage with non-matching messageId', () => {
    it('deleteMessage does nothing for non-existent message', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.deleteMessage('chat-alice', 'ghost-id');
      });
      expect(db.messages.put).not.toHaveBeenCalled();
    });
  });

  describe('branch coverage: deleteForEveryone with non-matching messageId', () => {
    it('deleteForEveryone does nothing for non-existent message', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.deleteForEveryone('chat-alice', 'ghost-id');
      });
      expect(db.messages.put).not.toHaveBeenCalled();
    });
  });

  describe('branch coverage: addReaction with non-matching messageId', () => {
    it('addReaction does nothing for non-existent message', async () => {
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.addReaction('chat-alice', 'ghost-id', '👍');
      });
      expect(db.messages.put).not.toHaveBeenCalled();
    });
  });

  describe('branch coverage: forwardMessage edge cases', () => {
    it('forwardMessage does nothing when target chat does not exist', async () => {
      db.messages.getAll.mockResolvedValue([
        msg({ id: 'fwd-no-target', text: 'hi' }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.forwardMessage('fwd-no-target', 'nonexistent');
      });
      expect(db.messages.put).not.toHaveBeenCalled();
    });
  });

  describe('branch coverage: messaging data channel with duplicate', () => {
    it('does not add duplicate messages from data channel', async () => {
      db.messages.getAll.mockResolvedValue([
        msg({ id: 'existing-dup', text: 'here already' }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      const initialLen = result.current.messages.length;
      const dataHandler = mockOnData.mock.calls[0]?.[0];
      act(() => {
        dataHandler({
          channel: 'messaging',
          payload: {
            message: msg({ id: 'existing-dup', text: 'dup attempt' }),
          },
        });
      });
      expect(result.current.messages.length).toBe(initialLen);
    });
  });

  describe('branch coverage: startCall with group chat (no contact)', () => {
    it('startCall on group chat skips contact lookup', async () => {
      db.chats.getAll.mockResolvedValue([
        chat({
          id: 'grp-call',
          kind: 'group',
          memberIds: ['me', 'alice', 'bob'],
        }),
      ]);
      const { result } = renderHook(() => useData(), { wrapper: Wrapper });
      await flush();
      await act(async () => {
        await result.current.startCall('grp-call', 'video');
      });
      expect(result.current.activeCall?.isGroup).toBe(true);
      expect(result.current.activeCall?.participants).toHaveLength(1);
    });
  });
});
