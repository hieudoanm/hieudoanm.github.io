'use client';

import type { FC } from 'react';
import { isRedSuit, type Card } from '../_shared/cards';
import { STAKE, type Bet } from './types';
import { handValue } from './utils';
import { useBaccarat } from './useBaccarat';

const BETS: { id: Bet; label: string; payout: string }[] = [
  { id: 'player', label: 'Player', payout: '2:1' },
  { id: 'banker', label: 'Banker', payout: '1.95:1' },
  { id: 'tie', label: 'Tie', payout: '8:1' },
];

const HandRow: FC<{ label: string; hand: Card[] }> = ({ label, hand }) => (
  <div>
    <span className="text-xs opacity-50">{label}</span>
    <div className="flex items-center gap-1">
      {hand.map((card, index) => (
        <span
          key={`${card.rank}${card.suit}-${index}`}
          className={`bg-base-300 inline-flex h-8 w-7 items-center justify-center rounded text-xs font-normal ${isRedSuit(card.suit) ? 'text-error' : 'text-base-content'}`}
          data-testid={`baccarat-card-${label.toLowerCase()}-${index}`}>
          {card.rank}
          {card.suit}
        </span>
      ))}
      <span
        className="ml-2 text-sm font-normal"
        data-testid={`baccarat-value-${label.toLowerCase()}`}>
        {handValue(hand)}
      </span>
    </div>
  </div>
);

export const Baccarat: FC = () => {
  const {
    phase,
    credits,
    bet,
    playerHand,
    bankerHand,
    result,
    lastWon,
    selectBet,
    deal,
    nextRound,
  } = useBaccarat();

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3 p-4">
      <div className="flex items-center justify-between text-sm">
        <span>
          Credits:{' '}
          <strong className="text-success" data-testid="baccarat-credits">
            {credits}
          </strong>
        </span>
        <span className="opacity-60">Stake: {STAKE}</span>
      </div>

      {phase === 'bet' ? (
        <div className="flex flex-col gap-2">
          <p className="text-xs opacity-50">Place your bet:</p>
          <div className="flex gap-2">
            {BETS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => selectBet(option.id)}
                data-testid={`baccarat-bet-${option.id}`}
                className={`btn btn-sm flex-1 flex-col ${bet === option.id ? 'btn-primary' : 'btn-ghost'}`}>
                <span>{option.label}</span>
                <span className="text-[10px] opacity-60">{option.payout}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={deal}
            disabled={!bet || credits < STAKE}
            className="btn btn-primary btn-sm mt-2"
            data-testid="baccarat-deal">
            Deal
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <HandRow label="Player" hand={playerHand} />
          <HandRow label="Banker" hand={bankerHand} />
          <div
            className="text-center text-sm font-normal"
            data-testid="baccarat-result">
            {result === 'tie' ? 'Tie!' : `${result} wins!`}
            {lastWon > 0 ? (
              <span className="text-success ml-2">+{lastWon}</span>
            ) : null}
          </div>
          <button
            type="button"
            onClick={nextRound}
            className="btn btn-secondary btn-sm w-full"
            data-testid="baccarat-next">
            Next Round
          </button>
        </div>
      )}
    </div>
  );
};
