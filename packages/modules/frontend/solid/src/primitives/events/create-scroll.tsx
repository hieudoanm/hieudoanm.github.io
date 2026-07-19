import { createSignal, onCleanup, onMount } from 'solid-js';

interface ScrollPosition {
  scrollX: number;
  scrollY: number;
}

export const createScroll = (): ScrollPosition => {
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

    handleScroll();

    onCleanup(() => window.removeEventListener('scroll', handleScroll));
  });

  return scrollPos();
};
