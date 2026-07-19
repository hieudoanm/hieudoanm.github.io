import { invoke } from '@tauri-apps/api/core';
import { listen, UnlistenFn } from '@tauri-apps/api/event';

export interface OpenedSquadFile {
  name: string;
  content: string;
}

export const isDesktop = (): boolean =>
  typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

export const openSquadFile = async (): Promise<OpenedSquadFile | null> => {
  if (!isDesktop()) return null;
  return invoke<OpenedSquadFile | null>('open_squad_file');
};

export const saveSquadFile = async (
  defaultName: string,
  content: string
): Promise<boolean> => {
  if (!isDesktop()) return false;
  return invoke<boolean>('save_squad_file', { defaultName, content });
};

export const takePendingDeepLinks = async (): Promise<string[]> => {
  if (!isDesktop()) return [];
  return invoke<string[]>('take_pending_deep_links');
};

export const onDeepLink = (
  handler: (url: string) => void
): Promise<UnlistenFn> =>
  listen('deep-link://new-url', (event) => {
    const payload = event.payload as unknown;
    if (Array.isArray(payload)) {
      for (const url of payload) {
        if (typeof url === 'string') handler(url);
      }
    } else if (typeof payload === 'string') {
      handler(payload);
    }
  });
