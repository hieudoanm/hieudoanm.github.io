'use client';

import type { FC } from 'react';
import { useFlagGuesser } from './useFlagGuesser';

const OPTION_CLASS = (state: 'idle' | 'correct' | 'dimmed'): string => {
  if (state === 'correct') return 'btn-success';
  if (state === 'dimmed') return 'btn-ghost opacity-40';
  return 'btn-outline';
};

export const FlagGuesser: FC = () => {
  const { question, stats, message, guess, next } = useFlagGuesser();
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
        data-testid="flag-guesser-flag">
        <span className="text-7xl leading-none">{current.flag}</span>
      </div>

      <div
        className="grid grid-cols-2 gap-2"
        data-testid="flag-guesser-options">
        {options.map((option, index) => {
          const isCorrect = option.name === current.name;
          const state = !message ? 'idle' : isCorrect ? 'correct' : 'dimmed';
          return (
            <button
              key={option.name}
              type="button"
              onClick={() => guess(option.name)}
              disabled={Boolean(message)}
              data-testid={`flag-option-${index}`}
              className={`btn btn-sm justify-start gap-2 ${OPTION_CLASS(state)}`}>
              <span className="text-xs opacity-40">{index + 1}</span>
              <span className="truncate">{option.name}</span>
            </button>
          );
        })}
      </div>

      {message ? (
        <div className="flex flex-col items-center gap-2">
          <div
            className={`text-sm font-normal ${message.correct ? 'text-success' : 'text-error'}`}
            role="status"
            data-testid="flag-guesser-message">
            {message.text}
            {!message.correct ? (
              <span className="ml-2 text-base">{current.flag}</span>
            ) : null}
          </div>
          <button
            type="button"
            onClick={next}
            className="btn btn-primary btn-sm w-full"
            data-testid="flag-guesser-next">
            Next Flag
          </button>
        </div>
      ) : null}
    </div>
  );
};
