import { useEffect } from 'react';

interface KeyboardShortcutHandlers {
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
}

export const useKeyboardShortcuts = ({
  onUndo,
  onRedo,
  onSave,
}: KeyboardShortcutHandlers): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.metaKey && !event.ctrlKey) return;
      const key = event.key.toLowerCase();
      if (key === 'z') {
        event.preventDefault();
        if (event.shiftKey) onRedo();
        else onUndo();
      } else if (key === 'y') {
        event.preventDefault();
        onRedo();
      } else if (key === 's') {
        event.preventDefault();
        onSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onUndo, onRedo, onSave]);
};
