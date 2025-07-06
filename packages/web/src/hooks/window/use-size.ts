import { useCallback, useEffect, useState } from 'react';

type WindowSize = { width: number; height: number };

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window?.innerWidth || 0,
      height: window?.innerHeight || 0,
    });
  }, []);

  useEffect(() => {
    if (!window) return;
    // Add event listener
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      if (!window) return;
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return windowSize;
};
