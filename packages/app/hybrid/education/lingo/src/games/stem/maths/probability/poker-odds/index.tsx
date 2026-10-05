'use client';

import type { FC } from 'react';
import { CardChip, CardPicker, MeterBar } from './components/CardPicker';
import { ITERATIONS, MAX_PLAYERS } from './constants';
import { usePokerOdds } from './usePokerOdds';

export const PokerOdds: FC = () => {
  const {
    hand,
    board,
    players,
    results,
    running,
    ready,
    setCard,
    setPlayers,
    run,
  } = usePokerOdds();

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col p-4">
      <CardPicker
        label="Your hand"
        cards={hand}
        onChange={(index, card) => setCard('hand', index, card)}
      />
      <CardPicker
        label="Board (flop required)"
        cards={board}
        onChange={(index, card) => setCard('board', index, card)}
      />

      <div className="mb-3 flex items-center gap-2 text-xs">
        <span className="opacity-50">Players:</span>
        {Array.from({ length: MAX_PLAYERS - 1 }, (_, index) => index + 2).map(
          (count) => (
            <button
              key={count}
              type="button"
              onClick={() => setPlayers(count)}
              data-testid={`poker-players-${count}`}
              className={`btn btn-xs ${players === count ? 'btn-primary' : 'btn-ghost'}`}>
              {count}
            </button>
          )
        )}
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        {hand.filter(Boolean).map((card, index) => (
          <CardChip key={`hand-${index}`} card={card!} />
        ))}
        {board.filter(Boolean).map((card, index) => (
          <CardChip key={`board-${index}`} card={card!} small />
        ))}
      </div>

      {!ready ? (
        <p className="mb-2 text-xs opacity-40">
          Select your hand and at least the flop (3 cards).
        </p>
      ) : null}

      <button
        type="button"
        onClick={run}
        disabled={!ready || running}
        className="btn btn-primary btn-sm mb-3 w-full"
        data-testid="poker-run">
        Calculate Equity
      </button>

      {results ? (
        <div className="flex flex-col gap-2" data-testid="poker-results">
          <div className="flex justify-between text-xs">
            <span className="opacity-50">Equity</span>
            <span className="font-normal">{results.equity.toFixed(1)}%</span>
          </div>
          <MeterBar pct={results.equity} />
          <div className="flex justify-between text-[10px] opacity-40">
            <span>
              Win: {results.win} (
              {((results.win / ITERATIONS) * 100).toFixed(1)}
              %)
            </span>
            <span>
              Tie: {results.tie} (
              {((results.tie / ITERATIONS) * 100).toFixed(1)}
              %)
            </span>
          </div>
        </div>
      ) : null}

      <p className="mt-3 text-center text-[10px] opacity-30">
        Monte Carlo simulation ({ITERATIONS.toLocaleString()} iterations)
      </p>
    </div>
  );
};
