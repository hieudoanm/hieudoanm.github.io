import { createClipboard, createStorage } from '@frontend/native';

export type ClipItem = {
  id: string;
  content: string;
  createdAt: number;
};

type ClipboardSchema = {
  clips: ClipItem[];
};

export const clipboard = createClipboard();

export const storage = createStorage<ClipboardSchema>('local', {
  namespace: 'clipboard',
});
