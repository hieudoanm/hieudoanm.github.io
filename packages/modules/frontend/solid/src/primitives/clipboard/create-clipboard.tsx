import { createSignal } from 'solid-js';

export interface ClipboardState {
  isSupported: boolean;
  copied: boolean;
  error: Error | null;
  copy: (text: string) => Promise<void>;
  paste: () => Promise<string | null>;
}

const getClipboard = (): Clipboard | null => {
  if (typeof window === 'undefined') return null;
  if (!navigator?.clipboard) return null;
  return navigator.clipboard;
};

export const createClipboard = (resetDelay = 1500): ClipboardState => {
  const clipboard = getClipboard();

  const [copied, setCopied] = createSignal(false);
  const [error, setError] = createSignal<Error | null>(null);

  const isSupported = clipboard !== null;

  const copy = async (text: string) => {
    if (!clipboard) {
      const err = new Error('Clipboard API not supported');
      setError(err);
      throw err;
    }

    try {
      await clipboard.writeText(text);
      setCopied(true);
      setError(null);

      if (resetDelay > 0) {
        setTimeout(() => setCopied(false), resetDelay);
      }
    } catch (err) {
      const e = err as Error;
      setError(e);
      setCopied(false);
      throw e;
    }
  };

  const paste = async (): Promise<string | null> => {
    if (!clipboard) {
      const err = new Error('Clipboard API not supported');
      setError(err);
      throw err;
    }

    try {
      const text = await clipboard.readText();
      setError(null);
      return text;
    } catch (err) {
      const e = err as Error;
      setError(e);
      throw e;
    }
  };

  return {
    isSupported,
    get copied() {
      return copied();
    },
    get error() {
      return error();
    },
    copy,
    paste,
  };
};
