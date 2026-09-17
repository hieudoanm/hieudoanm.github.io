'use client';

import type { FC } from 'react';
import { BET_AMOUNT, SYMBOLS } from './constants';
import { useSlotMachine } from './useSlotMachine';

export const SlotMachine: FC = () => {
  const { reels, credits, message, winAmount, broke, spin, resetCredits } =
    useSlotMachine();

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4 p-4">
      <div className="flex items-center justify-between text-sm">
        <span>
          Credits:{' '}
          <strong className="text-success" data-testid="slots-credits">
            {credits}
          </strong>
        </span>
        <span className="opacity-60">Bet: {BET_AMOUNT}</span>
      </div>

      <div className="bg-base-200 flex items-center justify-center gap-3 rounded-xl py-8">
        {reels.map((index, position) => (
          <div
            key={position}
            className="bg-base-300 flex h-20 w-20 items-center justify-center rounded-xl text-4xl shadow-inner"
            data-testid={`slot-reel-${position}`}>
            {SYMBOLS[index].emoji}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={spin}
        disabled={broke}
        className="btn btn-primary w-full"
        data-testid="slot-spin">
        Spin
      </button>

      {message ? (
        <div
          className={`text-center text-sm font-normal ${winAmount > 0 ? 'text-success' : 'opacity-50'}`}
          data-testid="slot-message">
          {message}
        </div>
      ) : null}

      {broke ? (
        <div className="alert alert-warning py-2 text-center text-xs">
          Out of credits! Reset to play again.
        </div>
      ) : null}

      <button
        type="button"
        onClick={resetCredits}
        className="btn btn-ghost btn-xs"
        data-testid="slot-reset">
        Reset Credits
      </button>

      <p className="text-center text-xs opacity-40">
        Three of a kind pays the full multiplier · a pair pays half
      </p>
    </div>
  );
};
