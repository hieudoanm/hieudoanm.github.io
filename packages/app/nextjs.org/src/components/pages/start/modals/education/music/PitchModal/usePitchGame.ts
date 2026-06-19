import { twinkleTwinkle } from '@hieudoanm.github.io/data/twinkle-twinkle-little-star';
import { useEffect, useRef, useState } from 'react';

import { NODE_ENV, levels, whiteKeys } from './constants';

export const usePitchGame = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [started, setStarted] = useState(false);
  const [target, setTarget] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [ripple, setRipple] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);
  const [feedback, setFeedback] = useState<{
    correctId?: string;
    wrongId?: string;
  } | null>(null);
  const [highlightedKey, setHighlightedKey] = useState<string | null>(null);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem('pitch-high-score');
    if (saved) setHighScore(Number.parseInt(saved, 10));
  }, []);

  const playTone = (id: string) => {
    try {
      const note =
        NODE_ENV === 'development'
          ? `/audio/3/${id}.mp3`
          : `/hieudoanm/audio/3/${id}.mp3`;
      const audio = new Audio(note);
      audioRef.current = audio;
      audio.play();
      setRipple(true);
      setTimeout(() => setRipple(false), 600);
    } catch (error) {
      console.error(error);
    }
  };

  const playSequence = async (
    sequence: { id?: string; note?: string; duration?: number }[],
    getKey: (item: any) => string,
    getDuration: (item: any) => number
  ) => {
    if (isPracticing) return;
    setIsPracticing(true);
    setStarted(false);
    setTarget(null);
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

  const nextRound = () => {
    const available = levels[level - 1];
    const random = available[Math.floor(Math.random() * available.length)];
    setTarget(random);
    playTone(random);
  };

  const startGame = () => {
    setScore(0);
    setStarted(true);
    nextRound();
  };

  const handleGuess = (id: string) => {
    if (!started || !target || isPracticing) return;

    if (id === target) {
      setFeedback({ correctId: id });
      const newScore = score + 1;
      setScore(newScore);
      if (newScore % 10 === 0 && level < levels.length) setLevel((l) => l + 1);
      setTimeout(() => {
        setFeedback(null);
        nextRound();
      }, 700);
    } else {
      setFeedback({ correctId: target, wrongId: id });
      setTimeout(() => {
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('pitch-high-score', score.toString());
        }
        setFeedback(null);
        setScore(0);
        setStarted(false);
        setTarget(null);
      }, 900);
    }
  };

  const whiteKeyClass = (id: string) => {
    if (feedback?.correctId === id)
      return 'bg-success border-success text-success-content';
    if (feedback?.wrongId === id)
      return 'bg-error border-error text-error-content';
    if (highlightedKey === id) return 'bg-info border-info text-info-content';
    return 'bg-base-content border-base-content text-base-100';
  };

  const blackKeyClass = (id: string) => {
    if (feedback?.correctId === id)
      return 'bg-success border-success text-success-content shadow-[0_4px_0_oklch(var(--su)/0.6)]';
    if (feedback?.wrongId === id)
      return 'bg-error border-error text-error-content shadow-[0_4px_0_oklch(var(--er)/0.6)]';
    if (highlightedKey === id)
      return 'bg-info border-info text-info-content shadow-[0_4px_0_oklch(var(--in)/0.6)]';
    return 'bg-base-100 border-base-300 text-base-content shadow-[0_4px_0_oklch(0_0_0/0.3)]';
  };

  return {
    started,
    score,
    highScore,
    ripple,
    isPracticing,
    feedback,
    highlightedKey,
    level,
    playTone,
    startGame,
    playPractice,
    playTwinkle,
    handleGuess,
    whiteKeyClass,
    blackKeyClass,
  };
};
