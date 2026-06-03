import { createSignal, onCleanup, onMount } from 'solid-js';

interface ScrollPosition {
  scrollX: number;
  scrollY: number;
}

export const useScroll = () => {
  const [scrollPos, setScrollPos] = createSignal<ScrollPosition>({
    scrollX: window.scrollX,
    scrollY: window.scrollY,
  });

  onMount(() => {
    const handleScroll = () => {
      setScrollPos({
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    onCleanup(() => window.removeEventListener('scroll', handleScroll));
  });

  return scrollPos;
};
