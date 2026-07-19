import { createSignal, onCleanup, onMount } from 'solid-js';

interface WindowSize {
  width: number;
  height: number;
}

export const createWindowResize = (): WindowSize => {
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

    handleResize();

    onCleanup(() => window.removeEventListener('resize', handleResize));
  });

  return size();
};
