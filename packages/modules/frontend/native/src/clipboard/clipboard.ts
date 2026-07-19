export interface ClipboardAPI {
  copy: (text: string) => Promise<void>;
  paste: () => Promise<string>;
  isSupported: () => boolean;
}

const getClipboard = (): Clipboard | null => {
  if (globalThis.window === undefined) {
    return null;
  }

  if (!globalThis.navigator?.clipboard) {
    return null;
  }

  return globalThis.navigator.clipboard;
};

export const createClipboard = (): ClipboardAPI => {
  const clipboard = getClipboard();

  const isSupported = (): boolean => clipboard !== null;

  const copy = async (text: string): Promise<void> => {
    if (!clipboard) {
      throw new Error('Clipboard API not supported');
    }

    await clipboard.writeText(text);
  };

  const paste = async (): Promise<string> => {
    if (!clipboard) {
      throw new Error('Clipboard API not supported');
    }

    return clipboard.readText();
  };

  return {
    copy,
    paste,
    isSupported,
  };
};
