export interface User {
  id: string;
  name: string;
  phone: string;
  username: string;
  avatarColor: string;
  online: boolean;
  lastSeenAt: number;
}

export interface Contact extends User {
  blocked: boolean;
  starred: boolean;
}

export type ChatKind = 'direct' | 'group';

export type MessageType = 'text' | 'image' | 'audio' | 'file' | 'system';

export type DeliveryStatus = 'sending' | 'sent' | 'delivered' | 'read';

export interface Reaction {
  emoji: string;
  authorId: string;
  createdAt: number;
}

export interface Message {
  id: string;
  chatId: string;
  authorId: string;
  type: MessageType;
  text: string;
  status: DeliveryStatus;
  createdAt: number;
  editedAt?: number;
  deletedAt?: number;
  replyToId?: string;
  reactions: Reaction[];
  fileName?: string;
  fileSize?: number;
}

export interface Chat {
  id: string;
  kind: ChatKind;
  title: string;
  avatarColor: string;
  memberIds: string[];
  adminIds: string[];
  pinned: boolean;
  muted: boolean;
  isSecret: boolean;
  disappearingSeconds: number;
  unreadCount: number;
  createdAt: number;
  lastMessageAt: number;
}

export type Tab = 'chats' | 'contacts';

export interface AppSettings {
  id: string;
  theme: string;
  notifications: boolean;
  readReceipts: boolean;
  typingIndicators: boolean;
  disappearingSeconds: number;
}

export type AuthMethod = 'phone' | 'username';

export interface AuthSession {
  id: string;
  method: AuthMethod;
  identifier: string;
  signedInAt: number;
}
