'use client';

import type { FC } from 'react';
import { DICE_FACES } from '../over-under-seven/utils';
import { STAKE } from './types';
import { useCraps } from './useCraps';

export const Craps: FC = () => {
  const {
    phase,
    credits,
    point,
    dice,
    total,
    lastWon,
    finished,
    roll,
    nextRound,
  } = useCraps();

  const status = (): string => {
    if (phase === 'comeout') return 'Come-out roll — 7 or 11 wins';
    if (phase === 'point') return `Point is ${point} — roll it before a 7`;
    return lastWon > 0 ? `Pass line wins +${lastWon}!` : 'Seven out — you lose';
  };

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4 p-4">
      <div className="flex items-center justify-between text-sm">
        <span>
          Credits:{' '}
          <strong className="text-success" data-testid="craps-credits">
            {credits}
          </strong>
        </span>
        <span className="opacity-60">Stake: {STAKE}</span>
      </div>

      <p className="text-center text-xs opacity-60" data-testid="craps-status">
        {status()}
      </p>

      <div className="bg-base-200 flex items-center justify-center gap-4 rounded-xl py-6">
        <span className="text-5xl">{DICE_FACES[dice[0]]}</span>
        <span className="text-2xl opacity-30">+</span>
        <span className="text-5xl">{DICE_FACES[dice[1]]}</span>
      </div>
      <p className="text-center text-sm">
        Total: <strong data-testid="craps-total">{total}</strong>
      </p>

      {finished ? (
        <button
          type="button"
          onClick={nextRound}
          className="btn btn-secondary btn-sm w-full"
          data-testid="craps-next">
          Next Round
        </button>
      ) : (
        <button
          type="button"
          onClick={roll}
          disabled={credits < STAKE}
          className="btn btn-primary btn-sm w-full"
          data-testid="craps-roll">
          Roll
        </button>
      )}

      <p className="text-center text-xs opacity-40">
        Pass line · come-out 7/11 win, 2/3/12 craps · pay 2:1
      </p>
    </div>
  );
};
