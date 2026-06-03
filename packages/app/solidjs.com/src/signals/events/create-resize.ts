import { createSignal, onCleanup, onMount } from 'solid-js';

interface WindowSize {
  width: number;
  height: number;
}

export const useWindowResize = () => {
  const [size, setSize] = createSignal<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  onMount(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    onCleanup(() => window.removeEventListener('resize', handleResize));
  });

  return size;
};
