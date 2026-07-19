'use client';

import type { FC } from 'react';
import type { Bet } from './types';
import { BET_AMOUNT, DICE_FACES } from './utils';
import { useOverUnderSeven } from './useOverUnderSeven';

const BET_OPTIONS: { id: Bet; label: string; payout: string }[] = [
  { id: 'under', label: 'Under 7', payout: '2:1' },
  { id: 'seven', label: '7', payout: '5:1' },
  { id: 'over', label: 'Over 7', payout: '2:1' },
];

export const OverUnderSeven: FC = () => {
  const {
    phase,
    credits,
    dice,
    bet,
    lastWon,
    result,
    selectBet,
    rollDice,
    nextRound,
  } = useOverUnderSeven();

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4 p-4">
      <div className="flex items-center justify-between text-sm">
        <span>
          Credits:{' '}
          <strong className="text-success" data-testid="dice-credits">
            {credits}
          </strong>
        </span>
        <span className="opacity-60">Bet: {BET_AMOUNT}</span>
      </div>

      {phase === 'bet' ? (
        <div className="flex flex-col gap-2">
          <p className="text-xs opacity-50">Place your bet:</p>
          <div className="flex gap-2">
            {BET_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => selectBet(option.id)}
                data-testid={`dice-bet-${option.id}`}
                className={`btn btn-sm flex-1 flex-col ${bet === option.id ? 'btn-primary' : 'btn-ghost'}`}>
                <span>{option.label}</span>
                <span className="text-[10px] opacity-60">{option.payout}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={rollDice}
            disabled={!bet || credits < BET_AMOUNT}
            className="btn btn-primary btn-sm mt-2"
            data-testid="dice-roll">
            Roll Dice
          </button>
        </div>
      ) : (
        <div
          className="flex flex-col items-center gap-3"
          data-testid="dice-result-panel">
          <div className="bg-base-200 flex items-center justify-center gap-4 rounded-xl py-6">
            <span className="text-5xl">{DICE_FACES[dice[0]]}</span>
            <span className="text-2xl opacity-30">+</span>
            <span className="text-5xl">{DICE_FACES[dice[1]]}</span>
          </div>
          <div className="text-center text-sm font-normal">
            Total: <strong data-testid="dice-total">{dice[0] + dice[1]}</strong>
          </div>
          <div
            className={`text-center text-sm font-normal ${lastWon > 0 ? 'text-success' : 'opacity-50'}`}
            data-testid="dice-message">
            {result === 'win' ? 'You win!' : 'You lose'}
            {lastWon > 0 ? <span className="ml-2">+{lastWon}</span> : null}
          </div>
          <button
            type="button"
            onClick={nextRound}
            className="btn btn-secondary btn-sm w-full"
            data-testid="dice-next">
            Next Round
          </button>
        </div>
      )}

      <p className="text-center text-xs opacity-40">
        Two dice · Bet on under 7, exactly 7, or over 7
      </p>
    </div>
  );
};
