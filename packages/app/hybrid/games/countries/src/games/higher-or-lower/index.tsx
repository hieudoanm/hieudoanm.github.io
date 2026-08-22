'use client';

import type { FC, ReactElement } from 'react';
import { useHigherOrLower } from './useHigherOrLower';
import { formatNum } from './utils';
import type { HLSide } from './types';

interface CardProps {
  name: string;
  flag: string;
  pop: number;
  side: HLSide;
}

const CARD_CLASS = (
  state: 'idle' | 'correct' | 'wrong' | 'revealed'
): string => {
  if (state === 'correct') return 'border-success bg-success/10';
  if (state === 'wrong') return 'border-error bg-error/10 opacity-50';
  if (state === 'revealed') return 'border-base-300';
  return 'border-base-300 hover:border-primary cursor-pointer';
};

export const HigherOrLower: FC = () => {
  const {
    pair,
    stats,
    games,
    message,
    revealed,
    leftPop,
    rightPop,
    guess,
    next,
  } = useHigherOrLower();

  const renderCard = ({ name, flag, pop, side }: CardProps): ReactElement => {
    const isCorrect =
      revealed &&
      ((side === 'left' && leftPop >= rightPop) ||
        (side === 'right' && rightPop >= leftPop));
    const state: 'idle' | 'correct' | 'wrong' | 'revealed' = !revealed
      ? 'idle'
      : isCorrect
        ? 'correct'
        : 'wrong';
    return (
      <button
        type="button"
        onClick={() => guess(side)}
        disabled={revealed}
        data-testid={`hl-card-${side}`}
        className={`flex flex-1 flex-col items-center gap-2 rounded-xl border p-4 transition-colors ${CARD_CLASS(state)}`}>
        <span className="text-4xl">{flag}</span>
        <span className="text-sm font-medium">{name}</span>
        {revealed ? (
          <span className="text-lg font-bold" data-testid={`hl-pop-${side}`}>
            {formatNum(pop)}
          </span>
        ) : null}
      </button>
    );
  };

  return (
    <div className="mx-auto flex w-80 flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between text-sm">
        <span>
          Score:{' '}
          <strong>
            {stats.score} / {games}
          </strong>
          {games > 0 ? (
            <span className="ml-1 opacity-40">
              ({Math.round((stats.score / games) * 100)}%)
            </span>
          ) : null}
        </span>
        <span className="opacity-60">
          Streak: <strong>{stats.streak}</strong> / Best:{' '}
          <strong>{stats.bestStreak}</strong>
        </span>
      </div>

      <p className="text-center text-xs opacity-60">
        Which country has a larger population?
      </p>

      <div className="flex gap-3">
        {renderCard({
          name: pair.left.name,
          flag: pair.left.flag,
          pop: leftPop,
          side: 'left',
        })}
        <div className="flex items-center">
          <span className="text-sm font-bold opacity-20">VS</span>
        </div>
        {renderCard({
          name: pair.right.name,
          flag: pair.right.flag,
          pop: rightPop,
          side: 'right',
        })}
      </div>

      {message ? (
        <div className="flex flex-col items-center gap-2">
          <div
            className={`text-sm font-bold ${message.correct ? 'text-success' : 'text-error'}`}
            role="status"
            data-testid="hl-message">
            {message.text}
          </div>
          <button
            type="button"
            onClick={next}
            className="btn btn-primary btn-sm w-full"
            data-testid="hl-next">
            Next Pair
          </button>
        </div>
      ) : null}
    </div>
  );
};
