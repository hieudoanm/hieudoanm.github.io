import { useCallback, useState } from 'react';

import { HIGH_STREAK_KEY } from './constants';

const readStoredStreak = (): number => {
  if (typeof window === 'undefined') return 0;

  const stored = Number(localStorage.getItem(HIGH_STREAK_KEY));

  return Number.isNaN(stored) ? 0 : stored;
};

export const useHighStreak = () => {
  const [highStreak, setHighStreak] = useState(readStoredStreak);

  const updateHighStreak = useCallback((streak: number) => {
    setHighStreak((previous) => {
      const high = Math.max(previous, streak);

      if (typeof window !== 'undefined') {
        localStorage.setItem(HIGH_STREAK_KEY, high.toString());
      }

      return high;
    });
  }, []);

  return { highStreak, updateHighStreak };
};
