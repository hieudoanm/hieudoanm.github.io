import { FC, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';

import { Card } from './types';
import { ITERATIONS, MAX_PLAYERS } from './constants';
import { runSimulation } from './utils/poker';
import { CardChip } from './components/CardChip';
import { MeterBar } from './components/MeterBar';
import { CardPicker } from './components/CardPicker';

export const Poker: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [hand, setHand] = useState<(Card | null)[]>([null, null]);
  const [board, setBoard] = useState<(Card | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [players, setPlayers] = useState(4);
  const [results, setResults] = useState<{
    equity: number;
    win: number;
    tie: number;
  } | null>(null);
  const [running, setRunning] = useState(false);

  const ready =
    hand.every(Boolean) && !board.slice(0, 3).some((c) => c === null);
  const run = async () => {
    if (!ready || running) return;
    setRunning(true);
    await new Promise((r) => setTimeout(r, 50));
    const { hero, tie } = runSimulation(
      hand as Card[],
      board.filter(Boolean) as Card[],
      players,
      ITERATIONS
    );
    setResults({
      equity: ((hero + tie / 2) / ITERATIONS) * 100,
      win: hero,
      tie,
    });
    setRunning(false);
  };

  return (
    <FullScreen onClose={onClose} title="Poker Equity Calculator">
      <CardPicker
        label="Your hand"
        cards={hand}
        onChange={(i, c) => {
          setHand(hand.map((h, j) => (j === i ? c : h)));
          setResults(null);
        }}
      />
      <CardPicker
        label="Board (flop required)"
        cards={board}
        onChange={(i, c) => {
          setBoard(board.map((b, j) => (j === i ? c : b)));
          setResults(null);
        }}
        max={5}
      />
      <div className="mb-3 flex items-center gap-2 text-xs">
        <span className="opacity-50">Players:</span>
        {[2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button
            key={n}
            onClick={() => setPlayers(n)}
            className={`btn btn-xs ${players === n ? 'btn-primary' : 'btn-ghost'}`}>
            {n}
          </button>
        ))}
      </div>
      <div className="mb-3 flex items-center gap-2">
        {hand.filter(Boolean).map((c, i) => (
          <CardChip key={i} card={c!} />
        ))}
        {board.filter(Boolean).map((c, i) => (
          <CardChip key={i} card={c!} small />
        ))}
      </div>
      {!ready && (
        <p className="mb-2 text-xs opacity-40">
          Select your hand and at least the flop (3 cards).
        </p>
      )}
      <button
        onClick={run}
        disabled={!ready || running}
        className="btn btn-primary btn-sm mb-3 w-full">
        {running ? (
          <span className="loading loading-spinner loading-xs" />
        ) : (
          'Calculate Equity'
        )}
      </button>
      {results && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="opacity-50">Equity</span>
            <span
              className="font-normal"
              style={{
                color:
                  results.equity > 50
                    ? '#22c55e'
                    : results.equity > 25
                      ? '#f59e0b'
                      : '#ef4444',
              }}>
              {results.equity.toFixed(1)}%
            </span>
          </div>
          <MeterBar pct={results.equity} />
          <div className="flex justify-between text-[10px] opacity-40">
            <span>
              Win: {results.win} (
              {((results.win / ITERATIONS) * 100).toFixed(1)}%)
            </span>
            <span>
              Tie: {results.tie} (
              {((results.tie / ITERATIONS) * 100).toFixed(1)}%)
            </span>
          </div>
        </div>
      )}
      <p className="mt-3 text-center text-[10px] opacity-30">
        Monte Carlo simulation ({ITERATIONS.toLocaleString()} iterations)
      </p>
    </FullScreen>
  );
};
Poker.displayName = 'Poker';
