import { useState } from 'react';

export const useHighStreak = () => {
  const [highStreak, setHighStreak] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('highStreak');
      return stored ? parseInt(stored, 10) : 0;
    }
    return 0;
  });

  const updateHighStreak = (newStreak: number) => {
    setHighStreak((prev) => {
      const high = Math.max(prev, newStreak);
      localStorage.setItem('highStreak', high.toString());
      return high;
    });
  };

  return { highStreak, updateHighStreak };
};
