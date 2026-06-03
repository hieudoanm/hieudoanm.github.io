import { createSignal, onCleanup, onMount } from 'solid-js';

interface UseKeyboardOptions {
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  onKeyPress?: (event: KeyboardEvent) => void;
}

export const useKeyboard = ({
  onKeyDown,
  onKeyUp,
  onKeyPress,
}: UseKeyboardOptions = {}) => {
  const [pressedKeys, setPressedKeys] = createSignal<Set<string>>(new Set());

  const handleKeyDown = (event: KeyboardEvent) => {
    setPressedKeys((prev) => {
      if (!prev.has(event.key)) {
        const newSet = new Set(prev);
        newSet.add(event.key);
        return newSet;
      }
      return prev;
    });
    onKeyDown?.(event);
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    setPressedKeys((prev) => {
      if (prev.has(event.key)) {
        const newSet = new Set(prev);
        newSet.delete(event.key);
        return newSet;
      }
      return prev;
    });
    onKeyUp?.(event);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    onKeyPress?.(event);
  };

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    if (onKeyPress) {
      window.addEventListener('keypress', handleKeyPress);
    }
  });

  onCleanup(() => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    if (onKeyPress) {
      window.removeEventListener('keypress', handleKeyPress);
    }
  });

  return { pressedKeys };
};
