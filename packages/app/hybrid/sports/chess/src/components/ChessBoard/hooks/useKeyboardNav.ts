import { useEffect, useRef, useState } from 'react';

interface KeyboardHandlers {
  enabled: boolean;
  onSan: (san: string) => boolean;
  onUndo: () => void;
  onRedo: () => void;
}

const SAN_CHARS = /[a-h0-9xoO\-+#=NBRQK]/i;

export const useKeyboardNav = ({
  enabled,
  onSan,
  onUndo,
  onRedo,
}: KeyboardHandlers) => {
  const [buffer, setBuffer] = useState('');
  const handlersRef = useRef({ enabled, onSan, onUndo, onRedo });
  handlersRef.current = { enabled, onSan, onUndo, onRedo };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const h = handlersRef.current;
      if (!h.enabled) return;
      const target = e.target as HTMLElement | null;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable
      ) {
        return;
      }
      if (e.key === 'Escape') {
        setBuffer('');
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        h.onUndo();
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        h.onRedo();
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) h.onRedo();
        else h.onUndo();
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        h.onRedo();
        return;
      }
      if (e.key === 'Backspace') {
        setBuffer((b) => b.slice(0, -1));
        return;
      }
      if (e.key.length !== 1 || !SAN_CHARS.test(e.key)) return;
      setBuffer((b) => {
        const next = b + e.key;
        if (h.onSan(next)) return '';
        return next;
      });
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return { buffer };
};
