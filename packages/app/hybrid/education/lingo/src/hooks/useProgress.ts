'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  awardXp as persistAwardXp,
  getProgress,
  type Progress,
} from '@/lib/progress';

export const useProgress = (): {
  progress: Progress;
  refresh: () => void;
  awardXp: (amount: number) => void;
} => {
  const [progress, setProgress] = useState<Progress>({
    xp: 0,
    streak: 0,
    lastActive: '',
  });

  const refresh = useCallback((): void => {
    void getProgress().then(setProgress);
  }, []);

  const awardXp = useCallback((amount: number): void => {
    void persistAwardXp(amount).then(setProgress);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { progress, refresh, awardXp };
};
