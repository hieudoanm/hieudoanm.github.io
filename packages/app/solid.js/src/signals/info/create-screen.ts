import { createSignal, onCleanup, onMount } from 'solid-js';

interface ScreenSize {
  width: number;
  height: number;
}

export const useScreen = () => {
  const [size, setSize] = createSignal<ScreenSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  onMount(() => {
    const onResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener('resize', onResize);
    onCleanup(() => window.removeEventListener('resize', onResize));
  });

  return size;
};
