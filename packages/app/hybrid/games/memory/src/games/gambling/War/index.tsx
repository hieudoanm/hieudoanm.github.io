'use client';

import type { FC } from 'react';
import { isRedSuit } from '../_shared/cards';
import { STAKE } from './types';
import { useWar } from './useWar';

const CardFace: FC<{ label: string; card: { rank: string; suit: string } }> = ({
  label,
  card,
}) => (
  <div className="flex flex-col items-center gap-1">
    <span className="text-xs opacity-50">{label}</span>
    <span
      className={`bg-base-300 inline-flex h-16 w-12 items-center justify-center rounded-lg text-xl font-normal ${isRedSuit(card.suit as never) ? 'text-error' : 'text-base-content'}`}
      data-testid={`war-card-${label.toLowerCase()}`}>
      {card.rank}
      {card.suit}
    </span>
  </div>
);

export const War: FC = () => {
  const { credits, round, streak, play } = useWar();

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4 p-4">
      <div className="flex items-center justify-between text-sm">
        <span>
          Credits:{' '}
          <strong className="text-success" data-testid="war-credits">
            {credits}
          </strong>
        </span>
        <span className="opacity-60">
          Stake: {STAKE} · Streak: {streak}
        </span>
      </div>

      {round ? (
        <>
          <div className="bg-base-200 flex items-center justify-center gap-8 rounded-xl py-6">
            <CardFace label="You" card={round.playerCard} />
            <span className="text-sm font-bold opacity-30">VS</span>
            <CardFace label="Dealer" card={round.dealerCard} />
          </div>
          <div
            className={`text-center text-sm font-normal ${round.result === 'player' ? 'text-success' : 'opacity-50'}`}
            data-testid="war-message">
            {round.result === 'player'
              ? `You win +${STAKE * round.multiplier}!`
              : 'Dealer wins'}
            {round.wars > 0 ? (
              <span className="ml-1">({round.wars}× war)</span>
            ) : null}
          </div>
        </>
      ) : (
        <p className="text-center text-xs opacity-50">
          Higher card wins the stake. Ties trigger a war — the pot doubles.
        </p>
      )}

      <button
        type="button"
        onClick={play}
        disabled={credits < STAKE}
        className="btn btn-primary btn-sm w-full"
        data-testid="war-play">
        Flip Cards
      </button>

      <p className="text-center text-xs opacity-40">
        Aces high · win pays 2:1 · each war doubles the payout
      </p>
    </div>
  );
};
