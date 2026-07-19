export type VaultItemType = 'login' | 'card' | 'identity' | 'note' | 'ssh';

export interface VaultItem {
  id: string;
  type: VaultItemType;
  title: string;
  username?: string;
  password?: string;
  url?: string;
  notes?: string;
  cardNumber?: string;
  cardholder?: string;
  expiry?: string;
  cvv?: string;
  favorite: boolean;
  tags: string[];
  folderId?: string;
  createdAt: number;
  updatedAt: number;
  lastUsed?: number;
}

export interface Folder {
  id: string;
  name: string;
  createdAt: number;
}
export interface Settings {
  theme: string;
  autoLockTimeout: number;
  clipboardClear: number;
}
