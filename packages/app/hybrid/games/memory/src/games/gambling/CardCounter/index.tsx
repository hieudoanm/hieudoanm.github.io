'use client';

import type { FC } from 'react';
import { useCardCounter } from './useCardCounter';
import { isRedSuit } from './utils';

export const CardCounter: FC = () => {
  const { current, count, revealed, done, cardsLeft, deal, reveal, reset } =
    useCardCounter();

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4 p-4">
      <div
        className="bg-base-200 flex flex-col items-center justify-center rounded-xl py-6"
        data-testid="card-counter-display">
        {current ? (
          <span
            className={`text-6xl leading-none font-normal ${isRedSuit(current.suit) ? 'text-error' : 'text-base-content'}`}>
            {current.rank}
            {current.suit}
          </span>
        ) : (
          <span className="text-base-content/40 text-sm">
            {done ? 'Deck finished' : 'Deal a card to start'}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="opacity-50">Cards left: {cardsLeft}</span>
        {revealed ? (
          <span className="badge badge-info" data-testid="card-counter-count">
            Count: <strong className="ml-1">{count}</strong>
          </span>
        ) : (
          <span className="text-xs opacity-30">Reveal to check the count</span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={deal}
          disabled={done}
          className="btn btn-primary btn-sm"
          data-testid="card-counter-deal">
          Deal
        </button>
        <button
          type="button"
          onClick={reveal}
          disabled={revealed}
          className="btn btn-secondary btn-sm"
          data-testid="card-counter-reveal">
          Reveal
        </button>
        <button
          type="button"
          onClick={reset}
          className="btn btn-accent btn-sm"
          data-testid="card-counter-reset">
          Reset
        </button>
      </div>

      <p className="text-center text-xs opacity-40">
        Hi-Lo: 2–6 count +1 · 7–9 count 0 · 10–A count −1
      </p>
    </div>
  );
};
