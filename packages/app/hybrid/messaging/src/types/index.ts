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

export type MessageType =
  'text' | 'image' | 'video' | 'audio' | 'file' | 'system' | 'sticker';

export type DeliveryStatus = 'sending' | 'sent' | 'delivered' | 'read';

export interface Reaction {
  emoji: string;
  authorId: string;
  createdAt: number;
}

export interface LinkPreview {
  url: string;
  title: string;
  description: string;
  image?: string;
  siteName: string;
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
  mediaUrl?: string;
  mediaThumbnail?: string;
  mediaDuration?: number;
  mediaMimeType?: string;
  linkPreview?: LinkPreview;
  stickerUrl?: string;
  encrypted?: boolean;
}

export interface MediaAttachment {
  file: File;
  url: string;
  type: 'image' | 'video' | 'audio' | 'file';
  compressed?: Blob;
}

export interface UploadProgress {
  messageId: string;
  progress: number;
  status: 'uploading' | 'processing' | 'done' | 'error';
}

export interface StickerPack {
  id: string;
  name: string;
  thumbnails: string[];
  stickers: string[];
}

export interface ForwardSelection {
  messageId: string;
  targetChatIds: string[];
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
  settings: ChatSettings;
  isIncognito?: boolean;
}

export type Tab = 'chats' | 'contacts' | 'calls' | 'devices';

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

export type GroupRole = 'owner' | 'admin' | 'member';

export interface ChatSettings {
  wallpaper: string;
  notificationSound: boolean;
  disappearingSeconds: number;
}

export interface TypingState {
  chatId: string;
  userId: string;
  typing: boolean;
  timestamp: number;
}

export interface DeviceKeyPair {
  id: string;
  publicKey: string;
  privateKey: string;
  createdAt: number;
  deviceLabel: string;
  trusted: boolean;
}

export interface VerificationCode {
  chatId: string;
  code: string;
  createdAt: number;
  expiresAt: number;
}

export interface DeviceTrustEntry {
  deviceId: string;
  deviceLabel: string;
  publicKey: string;
  trustedAt: number;
  verified: boolean;
}

export interface PrivacySettings {
  lastSeen: 'everyone' | 'contacts' | 'nobody';
  profilePhoto: 'everyone' | 'contacts' | 'nobody';
  readReceipts: boolean;
  typingIndicators: boolean;
  groupsInvite: 'everyone' | 'contacts' | 'nobody';
  blockedContactIds: string[];
  pinEnabled: boolean;
  pinHash: string;
}

export interface SpamReport {
  contactId: string;
  reason: string;
  reportedAt: number;
}

export type CallStatus = 'ringing' | 'active' | 'ended' | 'missed' | 'declined';

export type CallType = 'voice' | 'video';

export interface CallParticipant {
  userId: string;
  name: string;
  avatarColor: string;
  audioMuted: boolean;
  videoOff: boolean;
  joinedAt: number;
}

export interface CallQuality {
  bitrate: number;
  latency: number;
  packetLoss: number;
}

export interface Call {
  id: string;
  chatId: string;
  type: CallType;
  status: CallStatus;
  participants: CallParticipant[];
  startedAt: number;
  endedAt?: number;
  duration?: number;
  quality?: CallQuality;
  isGroup: boolean;
}

export type PeerConnectionState =
  'new' | 'connecting' | 'connected' | 'disconnected' | 'failed' | 'closed';

export interface PairedDevice {
  id: string;
  label: string;
  publicKey: string;
  pairedAt: number;
  lastSeenAt: number;
  online: boolean;
}

export interface DeliveryReceipt {
  messageId: string;
  deviceId: string;
  status: DeliveryStatus;
  timestamp: number;
}

export interface SyncState {
  lastSyncAt: number;
  deviceId: string;
  keyBackupVersion: number;
  pendingSyncCount: number;
}
