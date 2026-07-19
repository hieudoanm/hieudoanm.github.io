import { FC } from 'react';

import { blackKeys, whiteKeys } from './constants';
import { useMusicGame } from './useMusicGame';

const CHUNKY_BTN =
  'btn w-full rounded-2xl border-0 border-b-4 border-black/25 text-base font-extrabold tracking-wide transition-all duration-100 active:translate-y-1 active:border-b-0 sm:w-auto sm:min-w-36';

export const Music: FC = () => {
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
  } = useMusicGame();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-between">
        <span className="badge bg-base-100 border-base-content/10 badge-lg rounded-full border font-bold shadow-sm">
          Level {level}
        </span>
        <progress
          className="progress progress-primary h-3 w-full max-w-40 rounded-full sm:w-40"
          value={score % 10}
          max={10}
          aria-label="Level progress"
        />
        <div className="flex gap-2">
          <span className="badge badge-primary badge-lg rounded-full font-bold text-white shadow-[0_2px_0_rgba(0,0,0,0.2)]">
            Score: {score}
          </span>
          <span className="badge badge-accent badge-lg rounded-full font-bold shadow-[0_2px_0_rgba(74,58,0,0.25)]">
            🏆 Best: {highScore}
          </span>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        {ripple && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="bg-primary h-24 w-24 animate-ping rounded-full opacity-20" />
          </div>
        )}
        {!started ? (
          <div className="flex flex-wrap justify-center gap-3">
            <button
              className={`${CHUNKY_BTN} btn-primary`}
              onClick={startGame}
              disabled={isPracticing}>
              ▶ Start
            </button>
            <button
              className={`${CHUNKY_BTN} btn-info`}
              onClick={playPractice}
              disabled={isPracticing}>
              🎵 Practice
            </button>
            <button
              className={`${CHUNKY_BTN} btn-secondary`}
              onClick={playTwinkle}
              disabled={isPracticing}>
              ⭐ Twinkle
            </button>
          </div>
        ) : (
          <p className="text-secondary text-lg font-extrabold tracking-wide">
            Guess the note!
          </p>
        )}
      </div>

      <div className="border-base-content/20 h-44 w-full overflow-hidden rounded-2xl border-2">
        <div className="relative h-full w-full">
          <div className="bg-base-content/15 flex h-full gap-1">
            {whiteKeys.map(({ id, note }) => (
              <button
                key={id}
                onClick={() => (started ? handleGuess(id) : playTone(id))}
                className={`relative flex flex-1 items-end justify-center rounded-xl border-2 pb-2 text-xs font-normal transition-all duration-150 active:translate-y-0.5 ${whiteKeyClass(id)}`}>
                {note}
              </button>
            ))}
          </div>

          {blackKeys.map(({ id, note, position }) => (
            <button
              key={id}
              onClick={() => (started ? handleGuess(id) : playTone(id))}
              className={`absolute top-0 z-20 h-[58%] w-[9%] -translate-x-1/2 rounded-b-xl border-2 text-white transition-all duration-150 active:translate-y-0.5 ${blackKeyClass(id)}`}
              style={{ left: `${((position + 1) * 100) / 7}%` }}>
              <div className="flex h-full items-end justify-center pb-1 text-[10px] font-normal">
                {note}
              </div>
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-xs opacity-40">Click keys to play</p>
    </div>
  );
};
Music.displayName = 'Music';
