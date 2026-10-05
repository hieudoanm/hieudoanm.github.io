'use client';

import type { FC } from 'react';
import { KENO_MAX, STAKE } from './utils';
import { useKeno } from './useKeno';

export const Keno: FC = () => {
  const { selected, credits, draw, canPlay, toggle, clear, autoPick, play } =
    useKeno();

  const numbers = Array.from({ length: KENO_MAX }, (_, index) => index + 1);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3 p-4">
      <div className="flex items-center justify-between text-sm">
        <span>
          Credits:{' '}
          <strong className="text-success" data-testid="keno-credits">
            {credits}
          </strong>
        </span>
        <span className="opacity-60">
          Picked: {selected.length}/{5} · Stake: {STAKE}
        </span>
      </div>

      <div className="grid grid-cols-10 gap-1" data-testid="keno-grid">
        {numbers.map((number_) => {
          const picked = selected.includes(number_);
          const caught = draw?.drawn.includes(number_) ?? false;
          return (
            <button
              key={number_}
              type="button"
              onClick={() => toggle(number_)}
              data-testid={`keno-number-${number_}`}
              className={`btn btn-xs ${picked ? 'btn-primary' : 'btn-ghost'} ${caught && !picked ? 'text-success' : ''}`}>
              {number_}
              {caught ? '•' : ''}
            </button>
          );
        })}
      </div>

      {draw ? (
        <p className="text-center text-sm" data-testid="keno-result">
          {draw.catches} catch{draw.catches === 1 ? '' : 'es'} —{' '}
          {draw.won > 0 ? (
            <span className="text-success">you win +{draw.won}!</span>
          ) : (
            <span className="opacity-50">no win</span>
          )}
        </p>
      ) : null}

      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={autoPick}
          className="btn btn-ghost btn-sm"
          data-testid="keno-auto">
          Quick Pick 5
        </button>
        <button
          type="button"
          onClick={clear}
          className="btn btn-ghost btn-sm"
          data-testid="keno-clear">
          Clear
        </button>
        <button
          type="button"
          onClick={play}
          disabled={!canPlay}
          className="btn btn-primary btn-sm"
          data-testid="keno-play">
          Draw
        </button>
      </div>

      <p className="text-center text-xs opacity-40">
        Pick up to 5 spots · 20 numbers drawn · matches pay up to 70×
      </p>
    </div>
  );
};
