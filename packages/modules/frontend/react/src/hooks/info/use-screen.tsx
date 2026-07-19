import { useState, useEffect } from 'react';

interface ScreenSize {
  width: number;
  height: number;
}

export const useScreen = (): ScreenSize => {
  const [size, setSize] = useState<ScreenSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const onResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  return size;
};
