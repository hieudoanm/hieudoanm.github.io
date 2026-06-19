import { twinkleTwinkle } from '@hieudoanm.github.io/data/twinkle-twinkle-little-star';
import { useState } from 'react';

import { whiteKeys } from './constants';

export const useSequence = (playTone: (id: string) => void) => {
  const [isPracticing, setIsPracticing] = useState(false);
  const [highlightedKey, setHighlightedKey] = useState<string | null>(null);

  const playSequence = async (
    sequence: { id?: string; note?: string; duration?: number }[],
    getKey: (item: any) => string,
    getDuration: (item: any) => number
  ) => {
    if (isPracticing) return;
    setIsPracticing(true);
    for (const item of sequence) {
      const key = getKey(item);
      setHighlightedKey(key);
      playTone(key);
      await new Promise((res) => setTimeout(res, getDuration(item)));
      setHighlightedKey(null);
    }
    setIsPracticing(false);
  };

  const playPractice = () =>
    playSequence(
      whiteKeys,
      (k) => k.id,
      () => 800
    );

  const playTwinkle = () =>
    playSequence(
      twinkleTwinkle,
      (k) => k.note,
      (k) => k.duration
    );

  return { isPracticing, highlightedKey, playPractice, playTwinkle };
};
