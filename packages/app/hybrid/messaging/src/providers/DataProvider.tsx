'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type {
  User,
  Contact,
  Chat,
  Message,
  AppSettings,
  AuthSession,
  AuthMethod,
} from '@/types';
import { db } from '@/lib/db';
import { seedDatabase, generateId } from '@/data/seed';

export const REPLY_POOL = [
  'Got it, thanks!',
  'Sounds good 👍',
  'Let me check and get back to you.',
  'Sure, talk soon!',
  'Haha nice!',
];

const pickReply = (): string =>
  REPLY_POOL[Math.floor(Math.random() * REPLY_POOL.length)];

const OTHER = 'me';

interface DataContextType {
  account: User | null;
  contacts: Contact[];
  chats: Chat[];
  messages: Message[];
  settings: AppSettings;
  session: AuthSession | null;
  isLoading: boolean;

  refreshData: () => Promise<void>;
  signUp: (name: string, phone: string, username: string) => Promise<void>;
  signIn: (method: AuthMethod, identifier: string) => Promise<void>;
  signOut: () => Promise<void>;
  sendMessage: (chatId: string, text: string) => Promise<Message>;
  addReaction: (
    chatId: string,
    messageId: string,
    emoji: string
  ) => Promise<void>;
  deleteMessage: (chatId: string, messageId: string) => Promise<void>;
  editMessage: (
    chatId: string,
    messageId: string,
    text: string
  ) => Promise<void>;
  markChatRead: (chatId: string) => Promise<void>;
  togglePin: (chatId: string) => Promise<void>;
  toggleMute: (chatId: string) => Promise<void>;
  toggleSecret: (chatId: string) => Promise<void>;
  createChat: (contactId: string) => Promise<Chat>;
  createGroup: (title: string, memberIds: string[]) => Promise<Chat>;
  updateAccount: (partial: Partial<User>) => Promise<void>;
  updateSettings: (partial: Partial<AppSettings>) => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};

const DEFAULT_SETTINGS: AppSettings = {
  id: 'default',
  theme: 'nothing',
  notifications: true,
  readReceipts: true,
  typingIndicators: true,
  disappearingSeconds: 0,
};

export const getOtherParticipantId = (chat: Chat): string | undefined =>
  chat.kind === 'direct'
    ? chat.memberIds.find((id) => id !== OTHER)
    : undefined;

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [account, setAccount] = useState<User | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    const authSession = await db.auth.get();
    setSession(authSession ?? null);
    if (!authSession) {
      setIsLoading(false);
      return;
    }
    await seedDatabase();
    const [acc, cons, chs, msgs, sett] = await Promise.all([
      db.account.get(),
      db.contacts.getAll(),
      db.chats.getAll(),
      db.messages.getAll(),
      db.settings.get(),
    ]);
    setAccount(acc ?? null);
    setContacts(cons);
    setChats(chs.sort((a, b) => b.lastMessageAt - a.lastMessageAt));
    setMessages(msgs);
    setSettings(sett);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const signUp = useCallback(
    async (name: string, phone: string, username: string): Promise<void> => {
      const user: User = {
        id: 'me',
        name,
        phone,
        username,
        avatarColor: '#ff0030',
        online: true,
        lastSeenAt: Date.now(),
      };
      await db.account.put(user);
      const authSession: AuthSession = {
        id: 'session',
        method: 'phone',
        identifier: phone,
        signedInAt: Date.now(),
      };
      await db.auth.put(authSession);
      setAccount(user);
      setSession(authSession);
      await refreshData();
    },
    [refreshData]
  );

  const signIn = useCallback(
    async (method: AuthMethod, identifier: string): Promise<void> => {
      const accounts = await db.account.getAll();
      const found = accounts.find((a) =>
        method === 'phone' ? a.phone === identifier : a.username === identifier
      );
      if (!found) throw new Error('Account not found');
      const authSession: AuthSession = {
        id: 'session',
        method,
        identifier,
        signedInAt: Date.now(),
      };
      await db.auth.put(authSession);
      setAccount(found);
      setSession(authSession);
      await refreshData();
    },
    [refreshData]
  );

  const signOut = useCallback(async (): Promise<void> => {
    await db.auth.delete();
    setSession(null);
    setAccount(null);
    setContacts([]);
    setChats([]);
    setMessages([]);
  }, []);

  const updateChatState = useCallback(
    (chatId: string, patch: Partial<Chat>) => {
      setChats((prev) =>
        prev.map((c) => (c.id === chatId ? { ...c, ...patch } : c))
      );
    },
    []
  );

  const updateMessageState = useCallback(
    (messageId: string, patch: Partial<Message>) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, ...patch } : m))
      );
    },
    []
  );

  const updateMessageStatus = useCallback(
    (messageId: string, status: Message['status']) => {
      updateMessageState(messageId, { status });
    },
    [updateMessageState]
  );

  const deliver = useCallback(
    async (message: Message) => {
      await db.messages.put(message);
      const readReceipts = (await db.settings.get()).readReceipts;
      setTimeout(() => updateMessageStatus(message.id, 'delivered'), 1200);
      if (readReceipts) {
        setTimeout(() => updateMessageStatus(message.id, 'read'), 2600);
      }
    },
    [updateMessageStatus]
  );

  const persistMessage = useCallback(
    async (message: Message, chat: Chat) => {
      await db.messages.put(message);
      const updatedChat = { ...chat, lastMessageAt: message.createdAt };
      await db.chats.put(updatedChat);
      setMessages((prev) => [...prev, message]);
      updateChatState(chat.id, { lastMessageAt: message.createdAt });
      return message;
    },
    [updateChatState]
  );

  const scheduleMockReply = useCallback(
    async (chat: Chat) => {
      const otherId = getOtherParticipantId(chat);
      if (!otherId) return;
      const contact = contacts.find((c) => c.id === otherId);
      if (!contact) return;
      const createdAt = Date.now() + 3200;
      setTimeout(() => {
        void (async () => {
          const reply: Message = {
            id: generateId(),
            chatId: chat.id,
            authorId: otherId,
            type: 'text',
            text: pickReply(),
            status: 'sent',
            createdAt,
            reactions: [],
          };
          await db.messages.put(reply);
          await db.chats.put({
            ...chat,
            lastMessageAt: createdAt,
            unreadCount: chat.unreadCount + 1,
          });
          setMessages((prev) => [...prev, reply]);
          updateChatState(chat.id, {
            lastMessageAt: createdAt,
            unreadCount: chat.unreadCount + 1,
          });
        })();
      }, 3000);
    },
    [contacts, updateChatState]
  );

  const sendMessage = useCallback(
    async (chatId: string, text: string): Promise<Message> => {
      const chat = chats.find((c) => c.id === chatId);
      if (!chat || text.trim() === '')
        throw new Error('Chat not found or empty message');
      const message: Message = {
        id: generateId(),
        chatId,
        authorId: OTHER,
        type: 'text',
        text: text.trim(),
        status: 'sending',
        createdAt: Date.now(),
        reactions: [],
      };
      await persistMessage(message, chat);
      await deliver(message);
      void scheduleMockReply(chat);
      return message;
    },
    [chats, deliver, persistMessage, scheduleMockReply]
  );

  const addReaction = useCallback(
    async (chatId: string, messageId: string, emoji: string) => {
      const message = messages.find((m) => m.id === messageId);
      if (!message) return;
      const mine = message.reactions.find(
        (r) => r.authorId === OTHER && r.emoji === emoji
      );
      const reactions = mine
        ? message.reactions.filter((r) => r !== mine)
        : [
            ...message.reactions.filter((r) => r.authorId !== OTHER),
            { emoji, authorId: OTHER, createdAt: Date.now() },
          ];
      const updated = { ...message, reactions };
      await db.messages.put(updated);
      updateMessageState(messageId, { reactions });
    },
    [messages, updateMessageState]
  );

  const deleteMessage = useCallback(
    async (chatId: string, messageId: string) => {
      const message = messages.find((m) => m.id === messageId);
      if (!message) return;
      const updated = { ...message, deletedAt: Date.now() };
      await db.messages.put(updated);
      updateMessageState(messageId, { deletedAt: updated.deletedAt });
    },
    [messages, updateMessageState]
  );

  const editMessage = useCallback(
    async (chatId: string, messageId: string, text: string) => {
      const message = messages.find((m) => m.id === messageId);
      if (!message || text.trim() === '') return;
      const updated = { ...message, text: text.trim(), editedAt: Date.now() };
      await db.messages.put(updated);
      updateMessageState(messageId, {
        text: updated.text,
        editedAt: updated.editedAt,
      });
    },
    [messages, updateMessageState]
  );

  const markChatRead = useCallback(
    async (chatId: string) => {
      const chat = chats.find((c) => c.id === chatId);
      if (!chat || chat.unreadCount === 0) return;
      await db.chats.put({ ...chat, unreadCount: 0 });
      updateChatState(chatId, { unreadCount: 0 });
    },
    [chats, updateChatState]
  );

  const togglePin = useCallback(
    async (chatId: string) => {
      const chat = chats.find((c) => c.id === chatId);
      if (!chat) return;
      await db.chats.put({ ...chat, pinned: !chat.pinned });
      updateChatState(chatId, { pinned: !chat.pinned });
    },
    [chats, updateChatState]
  );

  const toggleMute = useCallback(
    async (chatId: string) => {
      const chat = chats.find((c) => c.id === chatId);
      if (!chat) return;
      await db.chats.put({ ...chat, muted: !chat.muted });
      updateChatState(chatId, { muted: !chat.muted });
    },
    [chats, updateChatState]
  );

  const toggleSecret = useCallback(
    async (chatId: string) => {
      const chat = chats.find((c) => c.id === chatId);
      if (!chat) return;
      const updated = {
        ...chat,
        isSecret: !chat.isSecret,
        disappearingSeconds: chat.isSecret ? 0 : 60,
      };
      await db.chats.put(updated);
      updateChatState(chatId, updated);
    },
    [chats, updateChatState]
  );

  const createChat = useCallback(
    async (contactId: string): Promise<Chat> => {
      const existing = chats.find(
        (c) => c.kind === 'direct' && c.memberIds.includes(contactId)
      );
      if (existing) return existing;
      const contact = contacts.find((c) => c.id === contactId);
      const chat: Chat = {
        id: generateId(),
        kind: 'direct',
        title: contact?.name ?? contactId,
        avatarColor: contact?.avatarColor ?? '#64748b',
        memberIds: [OTHER, contactId],
        adminIds: [],
        pinned: false,
        muted: false,
        isSecret: false,
        disappearingSeconds: 0,
        unreadCount: 0,
        createdAt: Date.now(),
        lastMessageAt: Date.now(),
      };
      await db.chats.put(chat);
      setChats((prev) => [chat, ...prev]);
      return chat;
    },
    [chats, contacts]
  );

  const createGroup = useCallback(
    async (title: string, memberIds: string[]): Promise<Chat> => {
      const chat: Chat = {
        id: generateId(),
        kind: 'group',
        title: title.trim() || 'New Group',
        avatarColor: '#ec4899',
        memberIds: [...new Set([OTHER, ...memberIds])],
        adminIds: [OTHER],
        pinned: false,
        muted: false,
        isSecret: false,
        disappearingSeconds: 0,
        unreadCount: 0,
        createdAt: Date.now(),
        lastMessageAt: Date.now(),
      };
      await db.chats.put(chat);
      setChats((prev) => [chat, ...prev]);
      return chat;
    },
    []
  );

  const updateAccount = useCallback(
    async (partial: Partial<User>) => {
      const current = account ?? {
        id: OTHER,
        name: 'You',
        phone: '',
        username: 'you',
        avatarColor: '#ff0030',
        online: true,
        lastSeenAt: Date.now(),
      };
      const updated = { ...current, ...partial };
      await db.account.put(updated);
      setAccount(updated);
    },
    [account]
  );

  const updateSettings = useCallback(async (partial: Partial<AppSettings>) => {
    const current = await db.settings.get();
    const updated = { ...current, ...partial };
    await db.settings.put(updated);
    setSettings(updated);
  }, []);

  return (
    <DataContext.Provider
      value={{
        account,
        contacts,
        chats,
        messages,
        settings,
        session,
        isLoading,
        refreshData,
        signUp,
        signIn,
        signOut,
        sendMessage,
        addReaction,
        deleteMessage,
        editMessage,
        markChatRead,
        togglePin,
        toggleMute,
        toggleSecret,
        createChat,
        createGroup,
        updateAccount,
        updateSettings,
      }}>
      {children}
    </DataContext.Provider>
  );
};
