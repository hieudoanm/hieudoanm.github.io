'use client';

import type { FC } from 'react';
import { isRedSuit } from '../_shared/cards';
import { STAKE } from './constants';
import { useHiLo } from './useHiLo';

export const HiLo: FC = () => {
  const { current, credits, streak, bestStreak, message, guess } = useHiLo();

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4 p-4">
      <div className="flex items-center justify-between text-sm">
        <span>
          Credits:{' '}
          <strong className="text-success" data-testid="hilo-credits">
            {credits}
          </strong>
        </span>
        <span className="opacity-60">
          Streak: {streak} · Best: {bestStreak}
        </span>
      </div>

      <div className="bg-base-200 flex flex-col items-center justify-center gap-1 rounded-xl py-8">
        <span className="text-xs opacity-50">Current card</span>
        <span
          className={`text-6xl leading-none font-normal ${isRedSuit(current.suit) ? 'text-error' : 'text-base-content'}`}
          data-testid="hilo-card">
          {current.rank}
          {current.suit}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => guess('higher')}
          className="btn btn-primary btn-sm"
          data-testid="hilo-higher">
          ▲ Higher
        </button>
        <button
          type="button"
          onClick={() => guess('lower')}
          className="btn btn-secondary btn-sm"
          data-testid="hilo-lower">
          ▼ Lower
        </button>
      </div>

      {message ? (
        <p
          className={`text-center text-sm font-normal ${message.correct ? 'text-success' : 'opacity-50'}`}
          role="status"
          data-testid="hilo-message">
          {message.text} · +{STAKE}
        </p>
      ) : null}

      <p className="text-center text-xs opacity-40">
        Will the next card be higher or lower? Aces high · ties lose · pays 2:1
      </p>
    </div>
  );
};
