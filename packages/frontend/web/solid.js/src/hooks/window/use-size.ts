import { createSignal, onMount } from 'solid-js';

type WindowSize = { width: number; height: number };

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = createSignal<WindowSize>({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setWindowSize({
      width: window?.innerWidth || 0,
      height: window?.innerHeight || 0,
    });
  };

  onMount(() => {
    if (!window) return;
    // Add event listener
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      if (!window) return;
      window.removeEventListener('resize', handleResize);
    };
  });

  return windowSize();
};
