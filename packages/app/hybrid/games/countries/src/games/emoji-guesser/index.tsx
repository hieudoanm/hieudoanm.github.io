'use client';

import type { FC } from 'react';
import { useEmojiGuesser } from './useEmojiGuesser';

const OPTION_CLASS = (state: 'idle' | 'correct' | 'dimmed'): string => {
  if (state === 'correct') return 'btn-success';
  if (state === 'dimmed') return 'btn-ghost opacity-40';
  return 'btn-outline';
};

export const EmojiGuesser: FC = () => {
  const { question, stats, message, guess, next } = useEmojiGuesser();
  const { current, options } = question;

  return (
    <div className="mx-auto flex w-80 flex-col gap-4 p-4">
      <div className="flex items-center justify-between text-sm">
        <span>
          Score: <strong>{stats.score}</strong>
        </span>
        <span className="opacity-60">
          Streak: <strong>{stats.streak}</strong> / Best:{' '}
          <strong>{stats.bestStreak}</strong>
        </span>
      </div>

      <div
        className="bg-base-200 flex items-center justify-center rounded-xl py-10"
        data-testid="emoji-guesser-name">
        <span className="text-3xl leading-none font-normal">
          {current.name}
        </span>
      </div>

      <div
        className="grid grid-cols-2 gap-2"
        data-testid="emoji-guesser-options">
        {options.map((option, index) => {
          const isCorrect = option.flag === current.flag;
          const state = !message ? 'idle' : isCorrect ? 'correct' : 'dimmed';
          return (
            <button
              key={`${option.flag}-${option.name}`}
              type="button"
              onClick={() => guess(option.flag)}
              disabled={Boolean(message)}
              data-testid={`emoji-option-${index}`}
              className={`btn btn-sm justify-center gap-2 ${OPTION_CLASS(state)}`}>
              <span className="text-xs opacity-40">{index + 1}</span>
              <span className="text-2xl leading-none">{option.flag}</span>
            </button>
          );
        })}
      </div>

      {message ? (
        <div className="flex flex-col items-center gap-2">
          <div
            className={`text-sm font-normal ${message.correct ? 'text-success' : 'text-error'}`}
            role="status"
            data-testid="emoji-guesser-message">
            {message.text}
          </div>
          <button
            type="button"
            onClick={next}
            className="btn btn-primary btn-sm w-full"
            data-testid="emoji-guesser-next">
            Next Country
          </button>
        </div>
      ) : null}
    </div>
  );
};
