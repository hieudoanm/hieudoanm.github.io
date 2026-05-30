import { useEffect, useState, useCallback } from 'react';

interface UseKeyboardOptions {
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  onKeyPress?: (event: KeyboardEvent) => void; // Note: keypress is deprecated but included if needed
}

export const useKeyboard = ({
  onKeyDown,
  onKeyUp,
  onKeyPress,
}: UseKeyboardOptions = {}) => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      setPressedKeys((prev) => {
        if (!prev.has(event.key)) {
          const newSet = new Set(prev);
          newSet.add(event.key);
          return newSet;
        }
        return prev;
      });
      onKeyDown?.(event);
    },
    [onKeyDown]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      setPressedKeys((prev) => {
        if (prev.has(event.key)) {
          const newSet = new Set(prev);
          newSet.delete(event.key);
          return newSet;
        }
        return prev;
      });
      onKeyUp?.(event);
    },
    [onKeyUp]
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      onKeyPress?.(event);
    },
    [onKeyPress]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    if (onKeyPress) {
      window.addEventListener('keypress', handleKeyPress);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (onKeyPress) {
        window.removeEventListener('keypress', handleKeyPress);
      }
    };
  }, [handleKeyDown, handleKeyUp, handleKeyPress, onKeyPress]);

  return {
    pressedKeys, // Set of currently pressed keys
  };
};
