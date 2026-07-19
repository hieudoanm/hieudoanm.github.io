'use client';

import type { FC } from 'react';
import { countries } from '../_shared/countries-data';
import { useBorder } from './useBorder';

const FLAG_BY_NAME = new Map(
  countries.map((entry) => [entry.name, entry.flag])
);

const OPTION_CLASS = (
  state: 'idle' | 'correct' | 'dimmed' | 'muted'
): string => {
  if (state === 'correct') return 'btn-success';
  if (state === 'dimmed') return 'btn-ghost opacity-40';
  if (state === 'muted') return 'btn-ghost';
  return 'btn-outline';
};

export const Border: FC = () => {
  const { question, stats, message, revealed, neighbours, guess, next } =
    useBorder();
  const { currentName, currentFlag, correct, options } = question;

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

      <div className="bg-base-200 flex items-center justify-center gap-3 rounded-xl py-8">
        <span className="text-5xl">{currentFlag}</span>
        <span className="text-lg font-medium">{currentName}</span>
      </div>

      <p className="text-center text-xs opacity-60">
        Which country does {currentName} border?
      </p>

      <div className="grid grid-cols-2 gap-2" data-testid="border-options">
        {options.map((name, index) => {
          const isCorrect = name === correct;
          const state = !message
            ? 'idle'
            : isCorrect
              ? 'correct'
              : revealed
                ? 'dimmed'
                : 'muted';
          return (
            <button
              key={name}
              type="button"
              onClick={() => guess(name)}
              disabled={Boolean(message)}
              data-testid={`border-option-${index}`}
              className={`btn btn-sm justify-start gap-2 ${OPTION_CLASS(state)}`}>
              <span className="text-xs opacity-40">{index + 1}</span>
              <span className="text-lg leading-none">
                {FLAG_BY_NAME.get(name)}
              </span>
              <span className="truncate">{name}</span>
            </button>
          );
        })}
      </div>

      {message ? (
        <div className="flex flex-col items-center gap-2">
          <div
            className={`text-sm font-bold ${message.correct ? 'text-success' : 'text-error'}`}
            role="status"
            data-testid="border-message">
            {message.text}
          </div>
          {revealed ? (
            <p
              className="text-center text-xs opacity-50"
              data-testid="border-neighbours">
              Neighbors: {neighbours.join(', ')}
            </p>
          ) : null}
          <button
            type="button"
            onClick={next}
            className="btn btn-primary btn-sm w-full"
            data-testid="border-next">
            Next Country
          </button>
        </div>
      ) : null}
    </div>
  );
};
