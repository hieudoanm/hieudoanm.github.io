import { useState, useEffect } from 'react';

interface ScrollPosition {
  scrollX: number;
  scrollY: number;
}

export const useScroll = (): ScrollPosition => {
  const [scrollPos, setScrollPos] = useState<ScrollPosition>({
    scrollX: window.scrollX,
    scrollY: window.scrollY,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos({
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Optional: update on mount in case scroll position changed before hook
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPos;
};
