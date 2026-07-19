import { createClipboard, createStorage } from '@frontend/native';

export interface ClipItem {
  id: string;
  content: string;
  createdAt: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClipboardSchema = Record<string, any>;

export const clipboard = createClipboard();

export const storage = createStorage<ClipboardSchema>('local', {
  namespace: 'clipboard',
});
