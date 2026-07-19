import { useEffect, useState } from 'react';

import { levels } from './constants';

export const useGame = (playTone: (id: string) => void) => {
  const [started, setStarted] = useState(false);
  const [target, setTarget] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [feedback, setFeedback] = useState<{
    correctId?: string;
    wrongId?: string;
  } | null>(null);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem('pitch-high-score');
    if (saved) setHighScore(Number.parseInt(saved, 10));
  }, []);

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
    if (!started || !target) return;

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

  return {
    started,
    target,
    score,
    highScore,
    feedback,
    level,
    startGame,
    handleGuess,
  };
};
