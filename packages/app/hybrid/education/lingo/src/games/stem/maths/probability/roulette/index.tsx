'use client';

import type { FC } from 'react';
import type { RouletteBet } from './types';
import { BET_AMOUNT, BET_DEFS, isRed } from './utils';
import { useRoulette } from './useRoulette';

export const Roulette: FC = () => {
  const { phase, credits, bet, landed, lastWon, selectBet, spin, nextRound } =
    useRoulette();

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4 p-4">
      <div className="flex items-center justify-between text-sm">
        <span>
          Credits:{' '}
          <strong className="text-success" data-testid="roulette-credits">
            {credits}
          </strong>
        </span>
        <span className="opacity-60">Bet: {BET_AMOUNT}</span>
      </div>

      {phase === 'bet' ? (
        <div className="flex flex-col gap-3" data-testid="roulette-bets">
          <p className="text-xs opacity-50">Place your bet:</p>
          <div className="grid grid-cols-3 gap-2">
            {BET_DEFS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => selectBet(option.id)}
                data-testid={`roulette-bet-${option.id}`}
                className={`btn btn-sm ${bet === option.id ? 'btn-primary' : 'btn-ghost'}`}>
                <span>{option.label}</span>
                <span className="ml-1 text-[10px] opacity-60">
                  {option.payout}:1
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={spin}
            disabled={!bet || credits < BET_AMOUNT}
            className="btn btn-primary btn-sm"
            data-testid="roulette-spin">
            Spin
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="bg-base-200 flex h-24 w-24 items-center justify-center rounded-full text-4xl font-bold">
            <span
              data-testid="roulette-number"
              className={
                landed === 0
                  ? ''
                  : isRed(landed!)
                    ? 'text-error'
                    : 'text-base-content'
              }>
              {landed}
            </span>
          </div>
          <div
            className={`text-center text-sm font-normal ${lastWon > 0 ? 'text-success' : 'opacity-50'}`}
            data-testid="roulette-message">
            {lastWon > 0 ? `You win +${lastWon}!` : 'No win this time'}
          </div>
          <button
            type="button"
            onClick={nextRound}
            className="btn btn-secondary btn-sm w-full"
            data-testid="roulette-next">
            Next Round
          </button>
        </div>
      )}

      <p className="text-center text-xs opacity-40">
        Single-zero wheel · outside bets pay 2:1 · zero pays 36:1
      </p>
    </div>
  );
};
