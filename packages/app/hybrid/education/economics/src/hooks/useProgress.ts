'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  DEFAULT_PROGRESS,
  awardXp,
  getProgress,
  type Progress,
} from '@/lib/progress';

interface UseProgressResult {
  progress: Progress;
  addXp: (amount: number) => void;
}

export const useProgress = (): UseProgressResult => {
  const [progress, setProgress] = useState<Progress>(DEFAULT_PROGRESS);

  useEffect(() => {
    let active = true;
    getProgress().then((stored) => {
      if (active) setProgress(stored);
    });
    return () => {
      active = false;
    };
  }, []);

  const addXp = useCallback((amount: number): void => {
    awardXp(amount).then(setProgress);
  }, []);

  return { progress, addXp };
};
