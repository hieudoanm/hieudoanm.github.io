import { useAudio } from './useAudio';
import { useGame } from './useGame';
import { useSequence } from './useSequence';
import { blackKeyClass, whiteKeyClass } from './keyClasses';

export const usePitchGame = () => {
  const { ripple, playTone } = useAudio();
  const { isPracticing, highlightedKey, playPractice, playTwinkle } =
    useSequence(playTone);
  const { started, score, highScore, feedback, level, startGame, handleGuess } =
    useGame(playTone);

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
    whiteKeyClass: (id: string) => whiteKeyClass(feedback, highlightedKey, id),
    blackKeyClass: (id: string) => blackKeyClass(feedback, highlightedKey, id),
  };
};
