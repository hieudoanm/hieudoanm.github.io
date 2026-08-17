'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
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
  GroupRole,
  TypingState,
  MediaAttachment,
  UploadProgress,
  PrivacySettings,
  DeviceTrustEntry,
  VerificationCode,
  SpamReport,
  Call,
  CallType,
  PairedDevice,
  SyncState,
  DeliveryReceipt,
  PeerConnectionState,
} from '@/types';
import { db } from '@/lib/db';
import { seedDatabase, generateId } from '@/data/seed';
import {
  generateKeyPair,
  generateVerificationCode,
  hashPin,
  verifyPin,
  deriveSharedKey,
  encrypt,
  decrypt,
  exportSharedKey,
  getDeviceFingerprint,
} from '@/lib/crypto';
import {
  PeerConnection,
  generateDeviceId,
  DEFAULT_ICE_SERVERS,
} from '@/lib/webrtc';

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
  typingUsers: TypingState[];

  refreshData: () => Promise<void>;
  signUp: (name: string, phone: string, username: string) => Promise<void>;
  signIn: (method: AuthMethod, identifier: string) => Promise<void>;
  signOut: () => Promise<void>;
  sendMessage: (
    chatId: string,
    text: string,
    replyToId?: string
  ) => Promise<Message>;
  addReaction: (
    chatId: string,
    messageId: string,
    emoji: string
  ) => Promise<void>;
  deleteMessage: (chatId: string, messageId: string) => Promise<void>;
  deleteForEveryone: (chatId: string, messageId: string) => Promise<void>;
  editMessage: (
    chatId: string,
    messageId: string,
    text: string
  ) => Promise<void>;
  forwardMessage: (messageId: string, targetChatId: string) => Promise<void>;
  markChatRead: (chatId: string) => Promise<void>;
  togglePin: (chatId: string) => Promise<void>;
  toggleMute: (chatId: string) => Promise<void>;
  toggleSecret: (chatId: string) => Promise<void>;
  createChat: (contactId: string) => Promise<Chat>;
  createGroup: (title: string, memberIds: string[]) => Promise<Chat>;
  updateAccount: (partial: Partial<User>) => Promise<void>;
  updateSettings: (partial: Partial<AppSettings>) => Promise<void>;
  promoteAdmin: (chatId: string, userId: string) => Promise<void>;
  demoteAdmin: (chatId: string, userId: string) => Promise<void>;
  addGroupMember: (chatId: string, userId: string) => Promise<void>;
  removeGroupMember: (chatId: string, userId: string) => Promise<void>;
  setTyping: (chatId: string, typing: boolean) => void;
  updateChatSettings: (
    chatId: string,
    partial: Partial<Chat['settings']>
  ) => Promise<void>;
  sendMediaMessage: (
    chatId: string,
    attachment: MediaAttachment,
    caption: string
  ) => Promise<Message>;
  sendSticker: (chatId: string, stickerUrl: string) => Promise<Message>;
  updateUploadProgress: (messageId: string, progress: UploadProgress) => void;
  getMediaMessages: (chatId: string) => Message[];
  forwardToMultiple: (
    messageId: string,
    targetChatIds: string[]
  ) => Promise<void>;

  privacySettings: PrivacySettings;
  updatePrivacySettings: (partial: Partial<PrivacySettings>) => Promise<void>;
  blockContact: (contactId: string) => Promise<void>;
  unblockContact: (contactId: string) => Promise<void>;
  reportSpam: (contactId: string, reason: string) => Promise<void>;
  deviceTrustList: DeviceTrustEntry[];
  addTrustedDevice: (
    device: Omit<DeviceTrustEntry, 'trustedAt'>
  ) => Promise<void>;
  removeTrustedDevice: (deviceId: string) => Promise<void>;
  verifyDevice: (deviceId: string) => Promise<void>;
  activeVerification: VerificationCode | null;
  startVerification: (chatId: string) => Promise<VerificationCode>;
  clearVerification: () => void;
  isPinValid: (pin: string) => Promise<boolean>;
  setPin: (pin: string) => Promise<void>;
  unlockPin: (pin: string) => Promise<boolean>;
  isLocked: boolean;
  spamReports: SpamReport[];

  callHistory: Call[];
  activeCall: Call | null;
  startCall: (chatId: string, type: CallType) => Promise<void>;
  answerCall: (callId: string) => Promise<void>;
  endCall: () => Promise<void>;
  declineCall: (callId: string) => Promise<void>;
  toggleCallMute: () => void;
  toggleCallVideo: () => void;
  toggleCallSpeaker: () => void;
  shareScreen: () => Promise<void>;
  callMuted: boolean;
  callVideoOff: boolean;
  callSpeakerOff: boolean;

  peerState: PeerConnectionState;
  pairedDevices: PairedDevice[];
  syncState: SyncState;
  deliveryReceipts: DeliveryReceipt[];
  syncNow: () => void;
  removePairedDevice: (deviceId: string) => void;
  sendPresence: (online: boolean) => void;
  sendTypingOverDataChannel: (chatId: string, typing: boolean) => void;
  trackDelivery: (messageId: string, status: DeliveryReceipt['status']) => void;
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
  const [typingUsers, setTypingUsers] = useState<TypingState[]>([]);
  const [uploadProgress, setUploadProgress] = useState<
    Map<string, UploadProgress>
  >(new Map());
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    lastSeen: 'everyone',
    profilePhoto: 'everyone',
    readReceipts: true,
    typingIndicators: true,
    groupsInvite: 'everyone',
    blockedContactIds: [],
    pinEnabled: false,
    pinHash: '',
  });
  const [deviceTrustList, setDeviceTrustList] = useState<DeviceTrustEntry[]>(
    []
  );
  const [activeVerification, setActiveVerification] =
    useState<VerificationCode | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [spamReports, setSpamReports] = useState<SpamReport[]>([]);
  const [callHistory, setCallHistory] = useState<Call[]>([]);
  const [activeCall, setActiveCall] = useState<Call | null>(null);

  const [peerState, setPeerState] = useState<PeerConnectionState>('new');
  const [pairedDevices, setPairedDevices] = useState<PairedDevice[]>([]);
  const [syncState, setSyncState] = useState<SyncState>({
    lastSyncAt: Date.now(),
    deviceId: generateDeviceId(),
    keyBackupVersion: 1,
    pendingSyncCount: 0,
  });
  const [deliveryReceipts, setDeliveryReceipts] = useState<DeliveryReceipt[]>(
    []
  );
  const peerRef = useRef<PeerConnection | null>(null);

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

  useEffect(() => {
    if (privacySettings.pinEnabled && privacySettings.pinHash) {
      setIsLocked(true);
    }
  }, [privacySettings.pinEnabled, privacySettings.pinHash]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setMessages((prev) => {
        const toDelete = prev.filter(
          (m) =>
            m.deletedAt === undefined &&
            m.encrypted !== true &&
            (() => {
              const chat = chats.find((c) => c.id === m.chatId);
              if (!chat) return false;
              const seconds = chat.settings.disappearingSeconds;
              if (seconds <= 0) return false;
              return now - m.createdAt > seconds * 1000;
            })()
        );
        if (toDelete.length === 0) return prev;
        return prev.map((m) => {
          if (toDelete.some((d) => d.id === m.id)) {
            void db.messages.put({ ...m, deletedAt: now });
            return { ...m, deletedAt: now };
          }
          return m;
        });
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [chats]);

  useEffect(() => {
    const fp = getDeviceFingerprint();
    const shortId = Array.from(
      new Uint8Array(new TextEncoder().encode(fp).slice(0, 8))
    )
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    setDeviceTrustList((prev) => {
      if (prev.some((d) => d.deviceId === shortId)) return prev;
      return [
        ...prev,
        {
          deviceId: shortId,
          deviceLabel: navigator.userAgent.includes('Mac')
            ? 'Mac'
            : navigator.userAgent.includes('Win')
              ? 'Windows'
              : 'Device',
          publicKey: fp,
          trustedAt: Date.now(),
          verified: true,
        },
      ];
    });
  }, []);

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
      if (privacySettings.blockedContactIds.includes(otherId)) return;
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
    [contacts, updateChatState, privacySettings.blockedContactIds]
  );

  const sendMessage = useCallback(
    async (
      chatId: string,
      text: string,
      replyToId?: string
    ): Promise<Message> => {
      const chat = chats.find((c) => c.id === chatId);
      if (!chat || text.trim() === '')
        throw new Error('Chat not found or empty message');
      let messageText = text.trim();
      let encrypted = false;
      if (chat.isSecret) {
        try {
          const keys = await generateKeyPair();
          const fakePeerKeys = await generateKeyPair();
          const shared = await deriveSharedKey(
            keys.privateKey,
            fakePeerKeys.publicKey
          );
          const sharedB64 = await exportSharedKey(shared);
          messageText = await encrypt(messageText, sharedB64);
          encrypted = true;
          void keys;
        } catch {
          // fallback to plaintext if crypto fails
        }
      }
      const message: Message = {
        id: generateId(),
        chatId,
        authorId: OTHER,
        type: 'text',
        text: messageText,
        status: 'sending',
        createdAt: Date.now(),
        reactions: [],
        replyToId,
        encrypted,
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

  const deleteForEveryone = useCallback(
    async (chatId: string, messageId: string) => {
      const message = messages.find((m) => m.id === messageId);
      if (!message) return;
      const updated = {
        ...message,
        deletedAt: Date.now(),
        text: 'Deleted for everyone',
      };
      await db.messages.put(updated);
      updateMessageState(messageId, {
        deletedAt: updated.deletedAt,
        text: updated.text,
      });
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
        settings: {
          wallpaper: '',
          notificationSound: true,
          disappearingSeconds: 0,
        },
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
        settings: {
          wallpaper: '',
          notificationSound: true,
          disappearingSeconds: 0,
        },
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

  const forwardMessage = useCallback(
    async (messageId: string, targetChatId: string) => {
      const message = messages.find((m) => m.id === messageId);
      const targetChat = chats.find((c) => c.id === targetChatId);
      if (!message || !targetChat || message.deletedAt !== undefined) return;
      const forwarded: Message = {
        id: generateId(),
        chatId: targetChatId,
        authorId: OTHER,
        type: message.type,
        text: message.text,
        status: 'sending',
        createdAt: Date.now(),
        reactions: [],
      };
      await persistMessage(forwarded, targetChat);
      await deliver(forwarded);
    },
    [messages, chats, persistMessage, deliver]
  );

  const promoteAdmin = useCallback(
    async (chatId: string, userId: string) => {
      const chat = chats.find((c) => c.id === chatId);
      if (!chat || chat.adminIds.includes(userId)) return;
      const updated = { ...chat, adminIds: [...chat.adminIds, userId] };
      await db.chats.put(updated);
      updateChatState(chatId, { adminIds: updated.adminIds });
    },
    [chats, updateChatState]
  );

  const demoteAdmin = useCallback(
    async (chatId: string, userId: string) => {
      const chat = chats.find((c) => c.id === chatId);
      if (!chat) return;
      const updated = {
        ...chat,
        adminIds: chat.adminIds.filter((id) => id !== userId),
      };
      await db.chats.put(updated);
      updateChatState(chatId, { adminIds: updated.adminIds });
    },
    [chats, updateChatState]
  );

  const addGroupMember = useCallback(
    async (chatId: string, userId: string) => {
      const chat = chats.find((c) => c.id === chatId);
      if (!chat || chat.memberIds.includes(userId)) return;
      const updated = {
        ...chat,
        memberIds: [...chat.memberIds, userId],
        lastMessageAt: Date.now(),
      };
      await db.chats.put(updated);
      updateChatState(chatId, { memberIds: updated.memberIds });
    },
    [chats, updateChatState]
  );

  const removeGroupMember = useCallback(
    async (chatId: string, userId: string) => {
      const chat = chats.find((c) => c.id === chatId);
      if (!chat) return;
      const updated = {
        ...chat,
        memberIds: chat.memberIds.filter((id) => id !== userId),
        adminIds: chat.adminIds.filter((id) => id !== userId),
      };
      await db.chats.put(updated);
      updateChatState(chatId, {
        memberIds: updated.memberIds,
        adminIds: updated.adminIds,
      });
    },
    [chats, updateChatState]
  );

  const setTyping = useCallback((chatId: string, typing: boolean) => {
    const state: TypingState = {
      chatId,
      userId: OTHER,
      typing,
      timestamp: Date.now(),
    };
    setTypingUsers((prev) => {
      const filtered = prev.filter(
        (t) => !(t.chatId === chatId && t.userId === OTHER)
      );
      return typing ? [...filtered, state] : filtered;
    });
  }, []);

  const updateChatSettings = useCallback(
    async (chatId: string, partial: Partial<Chat['settings']>) => {
      const chat = chats.find((c) => c.id === chatId);
      if (!chat) return;
      const updated = {
        ...chat,
        settings: { ...chat.settings, ...partial },
      };
      await db.chats.put(updated);
      updateChatState(chatId, { settings: updated.settings });
    },
    [chats, updateChatState]
  );

  const updateUploadProgressFn = useCallback(
    (messageId: string, progress: UploadProgress) => {
      setUploadProgress((prev) => {
        const next = new Map(prev);
        next.set(messageId, progress);
        return next;
      });
    },
    []
  );

  const sendMediaMessage = useCallback(
    async (
      chatId: string,
      attachment: MediaAttachment,
      caption: string
    ): Promise<Message> => {
      const chat = chats.find((c) => c.id === chatId);
      if (!chat) throw new Error('Chat not found');
      const messageType =
        attachment.type === 'image'
          ? 'image'
          : attachment.type === 'video'
            ? 'video'
            : attachment.type === 'audio'
              ? 'audio'
              : 'file';
      const message: Message = {
        id: generateId(),
        chatId,
        authorId: OTHER,
        type: messageType,
        text: caption,
        status: 'sending',
        createdAt: Date.now(),
        reactions: [],
        mediaUrl: attachment.url,
        mediaMimeType: attachment.file.type,
        fileName: attachment.file.name,
        fileSize: attachment.file.size,
      };
      updateUploadProgressFn(message.id, {
        messageId: message.id,
        progress: 0,
        status: 'uploading',
      });
      await persistMessage(message, chat);
      for (let i = 0; i <= 100; i += 20) {
        await new Promise((r) => setTimeout(r, 80));
        updateUploadProgressFn(message.id, {
          messageId: message.id,
          progress: i,
          status: i < 100 ? 'uploading' : 'processing',
        });
      }
      updateUploadProgressFn(message.id, {
        messageId: message.id,
        progress: 100,
        status: 'done',
      });
      await deliver(message);
      void scheduleMockReply(chat);
      return message;
    },
    [chats, persistMessage, deliver, scheduleMockReply, updateUploadProgressFn]
  );

  const sendSticker = useCallback(
    async (chatId: string, stickerUrl: string): Promise<Message> => {
      const chat = chats.find((c) => c.id === chatId);
      if (!chat) throw new Error('Chat not found');
      const message: Message = {
        id: generateId(),
        chatId,
        authorId: OTHER,
        type: 'sticker',
        text: '',
        status: 'sending',
        createdAt: Date.now(),
        reactions: [],
        stickerUrl,
      };
      await persistMessage(message, chat);
      await deliver(message);
      void scheduleMockReply(chat);
      return message;
    },
    [chats, persistMessage, deliver, scheduleMockReply]
  );

  const getMediaMessages = useCallback(
    (chatId: string): Message[] =>
      messages.filter(
        (m) =>
          m.chatId === chatId &&
          m.deletedAt === undefined &&
          (m.type === 'image' ||
            m.type === 'video' ||
            m.type === 'audio' ||
            m.type === 'file')
      ),
    [messages]
  );

  const forwardToMultiple = useCallback(
    async (messageId: string, targetChatIds: string[]) => {
      const message = messages.find((m) => m.id === messageId);
      if (!message || message.deletedAt !== undefined) return;
      for (const targetId of targetChatIds) {
        const targetChat = chats.find((c) => c.id === targetId);
        if (!targetChat) continue;
        const forwarded: Message = {
          id: generateId(),
          chatId: targetId,
          authorId: OTHER,
          type: message.type,
          text: message.text,
          status: 'sending',
          createdAt: Date.now(),
          reactions: [],
          mediaUrl: message.mediaUrl,
          mediaThumbnail: message.mediaThumbnail,
          mediaDuration: message.mediaDuration,
          mediaMimeType: message.mediaMimeType,
          fileName: message.fileName,
          fileSize: message.fileSize,
          stickerUrl: message.stickerUrl,
          linkPreview: message.linkPreview,
        };
        await persistMessage(forwarded, targetChat);
        await deliver(forwarded);
      }
    },
    [messages, chats, persistMessage, deliver]
  );

  const updatePrivacySettings = useCallback(
    async (partial: Partial<PrivacySettings>) => {
      setPrivacySettings((prev) => ({ ...prev, ...partial }));
    },
    []
  );

  const blockContact = useCallback(async (contactId: string) => {
    setPrivacySettings((prev) => ({
      ...prev,
      blockedContactIds: [...new Set([...prev.blockedContactIds, contactId])],
    }));
    setContacts((prev) =>
      prev.map((c) => (c.id === contactId ? { ...c, blocked: true } : c))
    );
  }, []);

  const unblockContact = useCallback(async (contactId: string) => {
    setPrivacySettings((prev) => ({
      ...prev,
      blockedContactIds: prev.blockedContactIds.filter(
        (id) => id !== contactId
      ),
    }));
    setContacts((prev) =>
      prev.map((c) => (c.id === contactId ? { ...c, blocked: false } : c))
    );
  }, []);

  const reportSpam = useCallback(
    async (contactId: string, reason: string) => {
      const report: SpamReport = { contactId, reason, reportedAt: Date.now() };
      setSpamReports((prev) => [...prev, report]);
      await blockContact(contactId);
    },
    [blockContact]
  );

  const addTrustedDevice = useCallback(
    async (device: Omit<DeviceTrustEntry, 'trustedAt'>) => {
      const entry: DeviceTrustEntry = { ...device, trustedAt: Date.now() };
      setDeviceTrustList((prev) => [
        ...prev.filter((d) => d.deviceId !== device.deviceId),
        entry,
      ]);
    },
    []
  );

  const removeTrustedDevice = useCallback(async (deviceId: string) => {
    setDeviceTrustList((prev) => prev.filter((d) => d.deviceId !== deviceId));
  }, []);

  const verifyDevice = useCallback(async (deviceId: string) => {
    setDeviceTrustList((prev) =>
      prev.map((d) => (d.deviceId === deviceId ? { ...d, verified: true } : d))
    );
  }, []);

  const startVerification = useCallback(
    async (chatId: string): Promise<VerificationCode> => {
      const myKeys = await generateKeyPair();
      const peerKeys = await generateKeyPair();
      const code = await generateVerificationCode(
        myKeys.publicKey,
        peerKeys.publicKey
      );
      const verification: VerificationCode = {
        chatId,
        code,
        createdAt: Date.now(),
        expiresAt: Date.now() + 10 * 60 * 1000,
      };
      setActiveVerification(verification);
      return verification;
    },
    []
  );

  const clearVerification = useCallback(() => {
    setActiveVerification(null);
  }, []);

  const isPinValid = useCallback(
    async (pin: string): Promise<boolean> => {
      if (!privacySettings.pinHash) return false;
      return verifyPin(pin, privacySettings.pinHash);
    },
    [privacySettings.pinHash]
  );

  const setPin = useCallback(async (pin: string) => {
    const hashed = await hashPin(pin);
    setPrivacySettings((prev) => ({
      ...prev,
      pinEnabled: true,
      pinHash: hashed,
    }));
    setIsLocked(false);
  }, []);

  const unlockPin = useCallback(
    async (pin: string): Promise<boolean> => {
      const valid = await isPinValid(pin);
      if (valid) setIsLocked(false);
      return valid;
    },
    [isPinValid]
  );

  const generateMockQuality = useCallback(
    (): { bitrate: number; latency: number; packetLoss: number } => ({
      bitrate: Math.floor(Math.random() * 400) + 100,
      latency: Math.floor(Math.random() * 50) + 10,
      packetLoss: Math.round(Math.random() * 2 * 100) / 100,
    }),
    []
  );

  const startCall = useCallback(
    async (chatId: string, type: CallType): Promise<void> => {
      const chat = chats.find((c) => c.id === chatId);
      if (!chat) return;
      const otherId = getOtherParticipantId(chat);
      const contact = otherId
        ? contacts.find((c) => c.id === otherId)
        : undefined;
      const participants = [
        {
          userId: OTHER,
          name: account?.name ?? 'You',
          avatarColor: account?.avatarColor ?? '#ff0030',
          audioMuted: false,
          videoOff: type === 'voice',
          joinedAt: Date.now(),
        },
      ];
      if (contact) {
        participants.push({
          userId: contact.id,
          name: contact.name,
          avatarColor: contact.avatarColor,
          audioMuted: false,
          videoOff: type === 'voice',
          joinedAt: Date.now(),
        });
      }
      const call: Call = {
        id: generateId(),
        chatId,
        type,
        status: 'active',
        participants,
        startedAt: Date.now(),
        quality: generateMockQuality(),
        isGroup: chat.kind === 'group',
      };
      setActiveCall(call);
      setCallHistory((prev) => [call, ...prev]);
      void db.messages.put({
        id: generateId(),
        chatId,
        authorId: OTHER,
        type: 'system',
        text: `You started a ${type} call`,
        status: 'read',
        createdAt: Date.now(),
        reactions: [],
      });
    },
    [chats, contacts, account, generateMockQuality]
  );

  const answerCall = useCallback(async (callId: string): Promise<void> => {
    setCallHistory((prev) =>
      prev.map((c) =>
        c.id === callId ? { ...c, status: 'active' as const } : c
      )
    );
    setActiveCall((prev) =>
      prev && prev.id === callId ? { ...prev, status: 'active' } : prev
    );
  }, []);

  const endCall = useCallback(async (): Promise<void> => {
    if (!activeCall) return;
    const ended = {
      ...activeCall,
      status: 'ended' as const,
      endedAt: Date.now(),
      duration: Math.floor((Date.now() - activeCall.startedAt) / 1000),
      quality: generateMockQuality(),
    };
    setCallHistory((prev) => prev.map((c) => (c.id === ended.id ? ended : c)));
    setActiveCall(null);
    void db.messages.put({
      id: generateId(),
      chatId: ended.chatId,
      authorId: OTHER,
      type: 'system',
      text: `Call ended · ${ended.duration ?? 0}s`,
      status: 'read',
      createdAt: Date.now(),
      reactions: [],
    });
  }, [activeCall, generateMockQuality]);

  const declineCall = useCallback(async (callId: string): Promise<void> => {
    setCallHistory((prev) =>
      prev.map((c) =>
        c.id === callId
          ? { ...c, status: 'declined' as const, endedAt: Date.now() }
          : c
      )
    );
    setActiveCall((prev) => (prev?.id === callId ? null : prev));
  }, []);

  const [callMuted, setCallMuted] = useState(false);
  const [callVideoOff, setCallVideoOff] = useState(false);
  const [callSpeakerOff, setCallSpeakerOff] = useState(false);

  const toggleCallMute = useCallback(() => {
    setCallMuted((prev) => !prev);
    setActiveCall((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        participants: prev.participants.map((p) =>
          p.userId === OTHER ? { ...p, audioMuted: !p.audioMuted } : p
        ),
      };
    });
  }, []);

  const toggleCallVideo = useCallback(() => {
    setCallVideoOff((prev) => !prev);
    setActiveCall((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        participants: prev.participants.map((p) =>
          p.userId === OTHER ? { ...p, videoOff: !p.videoOff } : p
        ),
      };
    });
  }, []);

  const toggleCallSpeaker = useCallback(() => {
    setCallSpeakerOff((prev) => !prev);
  }, []);

  const shareScreen = useCallback(async (): Promise<void> => {
    try {
      await navigator.mediaDevices.getDisplayMedia({ video: true });
    } catch {
      // user cancelled or unsupported
    }
  }, []);

  useEffect(() => {
    const peer = new PeerConnection(DEFAULT_ICE_SERVERS);
    peerRef.current = peer;
    peer.onState((s) => setPeerState(s));
    peer.onData((msg) => {
      if (msg.channel === 'presence') {
        const payload = msg.payload as { online?: boolean; userId?: string };
        setContacts((prev) =>
          prev.map((c) =>
            c.id === payload.userId
              ? {
                  ...c,
                  online: payload.online ?? false,
                  lastSeenAt: Date.now(),
                }
              : c
          )
        );
      }
      if (msg.channel === 'typing') {
        const payload = msg.payload as {
          chatId?: string;
          userId?: string;
          typing?: boolean;
        };
        const chatId = payload.chatId;
        const userId = payload.userId;
        if (chatId && userId) {
          setTypingUsers((prev) => {
            const filtered = prev.filter(
              (t) => !(t.chatId === chatId && t.userId === userId)
            );
            if (payload.typing) {
              return [
                ...filtered,
                { chatId, userId, typing: true, timestamp: Date.now() },
              ];
            }
            return filtered;
          });
        }
      }
      if (msg.channel === 'receipts') {
        const payload = msg.payload as {
          messageId?: string;
          status?: DeliveryReceipt['status'];
          deviceId?: string;
        };
        const msgId = payload.messageId;
        const msgStatus = payload.status;
        const devId = payload.deviceId ?? 'peer';
        if (msgId && msgStatus) {
          setDeliveryReceipts((prev) => [
            ...prev.filter(
              (r) => !(r.messageId === msgId && r.deviceId === devId)
            ),
            {
              messageId: msgId,
              deviceId: devId,
              status: msgStatus,
              timestamp: Date.now(),
            },
          ]);
          if (msgStatus === 'delivered' || msgStatus === 'read') {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === msgId ? { ...m, status: msgStatus } : m
              )
            );
          }
        }
      }
      if (msg.channel === 'messaging') {
        const payload = msg.payload as { message?: Message };
        if (payload.message) {
          setMessages((prev) => {
            if (prev.some((m) => m.id === payload.message!.id)) return prev;
            return [...prev, payload.message!];
          });
          setChats((prev) =>
            prev.map((c) =>
              c.id === payload.message!.chatId
                ? {
                    ...c,
                    lastMessageAt: payload.message!.createdAt,
                    unreadCount:
                      c.id === payload.message!.chatId
                        ? c.unreadCount + 1
                        : c.unreadCount,
                  }
                : c
            )
          );
        }
      }
    });
    return () => peer.close();
  }, []);

  const syncNow = useCallback((): void => {
    setSyncState((prev) => ({
      ...prev,
      lastSyncAt: Date.now(),
      pendingSyncCount: 0,
      keyBackupVersion: prev.keyBackupVersion + 1,
    }));
    peerRef.current?.send('presence', { type: 'sync', timestamp: Date.now() });
  }, []);

  const removePairedDevice = useCallback((deviceId: string) => {
    setPairedDevices((prev) => prev.filter((d) => d.id !== deviceId));
  }, []);

  const sendPresence = useCallback((online: boolean) => {
    peerRef.current?.send('presence', {
      online,
      userId: 'me',
      timestamp: Date.now(),
    });
  }, []);

  const sendTypingOverDataChannel = useCallback(
    (chatId: string, typing: boolean) => {
      peerRef.current?.send('typing', {
        chatId,
        userId: 'me',
        typing,
        timestamp: Date.now(),
      });
    },
    []
  );

  const trackDelivery = useCallback(
    (messageId: string, status: DeliveryReceipt['status']) => {
      setDeliveryReceipts((prev) => [
        ...prev,
        {
          messageId,
          deviceId: syncState.deviceId,
          status,
          timestamp: Date.now(),
        },
      ]);
      peerRef.current?.send('receipts', {
        messageId,
        status,
        deviceId: syncState.deviceId,
      });
    },
    [syncState.deviceId]
  );

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
        typingUsers,
        refreshData,
        signUp,
        signIn,
        signOut,
        sendMessage,
        addReaction,
        deleteMessage,
        deleteForEveryone,
        editMessage,
        forwardMessage,
        markChatRead,
        togglePin,
        toggleMute,
        toggleSecret,
        createChat,
        createGroup,
        updateAccount,
        updateSettings,
        promoteAdmin,
        demoteAdmin,
        addGroupMember,
        removeGroupMember,
        setTyping,
        updateChatSettings,
        sendMediaMessage,
        sendSticker,
        updateUploadProgress: updateUploadProgressFn,
        getMediaMessages,
        forwardToMultiple,
        privacySettings,
        updatePrivacySettings,
        blockContact,
        unblockContact,
        reportSpam,
        deviceTrustList,
        addTrustedDevice,
        removeTrustedDevice,
        verifyDevice,
        activeVerification,
        startVerification,
        clearVerification,
        isPinValid,
        setPin,
        unlockPin,
        isLocked,
        spamReports,
        callHistory,
        activeCall,
        startCall,
        answerCall,
        endCall,
        declineCall,
        toggleCallMute,
        toggleCallVideo,
        toggleCallSpeaker,
        shareScreen,
        callMuted,
        callVideoOff,
        callSpeakerOff,
        peerState,
        pairedDevices,
        syncState,
        deliveryReceipts,
        syncNow,
        removePairedDevice,
        sendPresence,
        sendTypingOverDataChannel,
        trackDelivery,
      }}>
      {children}
    </DataContext.Provider>
  );
};
