import { HIGH_SCORE_KEY } from './constants';

export const handleEscape = (key: string, onClose: () => void): boolean => {
  if (key === 'Escape') {
    onClose();
    return true;
  }
  return false;
};

export const handlePracticeKey = (
  key: string,
  setIndex: (fn: (i: number) => number) => void,
  maxIndex: number
) => {
  if (key === 'ArrowRight') setIndex((i) => Math.min(i + 1, maxIndex));
  if (key === 'ArrowLeft') setIndex((i) => Math.max(i - 1, 0));
};

export const handleGameKey = (
  key: string,
  index: number,
  digits: string[],
  locked: boolean,
  setIndex: (fn: (i: number) => number) => void,
  setGameState: (fn: (prev: any) => any) => void,
  highScore: number
) => {
  if (!/^[0-9.]$/.test(key)) return;
  const correct = digits[index];
  setGameState((p: any) => ({ ...p, revealedIndex: index }));

  if (key === correct) {
    setGameState((p: any) => ({ ...p, lastResult: 'correct' }));
    setTimeout(() => {
      setIndex((i: number) => Math.min(i + 1, digits.length - 1));
      setGameState((p: any) => ({
        ...p,
        lastResult: null,
        revealedIndex: null,
      }));
    }, 200);
  } else {
    setGameState((p: any) => {
      const newHighScore = Math.max(p.highScore, index);
      localStorage.setItem(HIGH_SCORE_KEY, String(newHighScore));
      return {
        ...p,
        locked: true,
        lastResult: 'wrong',
        highScore: newHighScore,
      };
    });
  }
};
