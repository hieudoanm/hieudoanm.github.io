import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { FC } from 'react';

import { blackKeys, whiteKeys } from './constants';
import { usePitchGame } from './usePitchGame';

export const PitchModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
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
  } = usePitchGame();

  return (
    <FullScreen onClose={onClose} title="🎹 Pitch Trainer">
      <div className="mb-4 flex justify-center gap-3 text-xs">
        <span className="badge badge-neutral">Level {level}</span>
        <span className="badge badge-primary">Score: {score}</span>
        <span className="badge badge-accent">🏆 Best: {highScore}</span>
      </div>

      <div className="relative mb-6 flex items-center justify-center">
        {ripple && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="bg-primary h-16 w-16 animate-ping rounded-full opacity-20" />
          </div>
        )}
        {!started ? (
          <div className="flex gap-2">
            <button
              className="btn btn-success btn-sm"
              onClick={startGame}
              disabled={isPracticing}>
              ▶ Start
            </button>
            <button
              className="btn btn-info btn-sm"
              onClick={playPractice}
              disabled={isPracticing}>
              🎵 Practice
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={playTwinkle}
              disabled={isPracticing}>
              ⭐ Twinkle
            </button>
          </div>
        ) : (
          <p className="text-base-content/50 text-xs">Guess the note!</p>
        )}
      </div>

      <div className="relative h-44 w-full">
        <div className="flex h-full gap-1">
          {whiteKeys.map(({ id, note }) => (
            <button
              key={id}
              onClick={() => (started ? handleGuess(id) : playTone(id))}
              className={`relative flex flex-1 items-end justify-center rounded-lg border-2 pb-2 text-xs font-normal transition-all duration-150 active:translate-y-0.5 ${whiteKeyClass(id)}`}>
              {note}
            </button>
          ))}
        </div>

        {blackKeys.map(({ id, note, position }) => (
          <button
            key={id}
            onClick={() => (started ? handleGuess(id) : playTone(id))}
            className={`absolute top-0 z-10 h-[58%] w-[9%] -translate-x-1/2 rounded-b-lg border-2 text-white transition-all duration-150 active:translate-y-0.5 ${blackKeyClass(id)}`}
            style={{ left: `${((position + 1) * 100) / 7}%` }}>
            <div className="flex h-full items-end justify-center pb-1 text-[10px] font-normal">
              {note}
            </div>
          </button>
        ))}
      </div>

      <p className="mt-4 text-center text-xs opacity-40">
        Click keys to play · Esc close
      </p>
    </FullScreen>
  );
};
PitchModal.displayName = 'PitchModal';
