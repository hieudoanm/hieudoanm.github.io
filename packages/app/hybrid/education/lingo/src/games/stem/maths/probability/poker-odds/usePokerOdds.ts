'use client';

import { useCallback, useMemo, useState } from 'react';
import type { Card, EquityResult } from './types';
import { ITERATIONS } from './constants';
import { runSimulation } from './utils';

export interface UsePokerOddsResult {
  hand: (Card | null)[];
  board: (Card | null)[];
  players: number;
  results: EquityResult | null;
  running: boolean;
  ready: boolean;
  setCard: (zone: 'hand' | 'board', index: number, card: Card) => void;
  setPlayers: (players: number) => void;
  run: () => void;
}

export const usePokerOdds = (): UsePokerOddsResult => {
  const [hand, setHand] = useState<(Card | null)[]>([null, null]);
  const [board, setBoard] = useState<(Card | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [players, setPlayers] = useState(2);
  const [results, setResults] = useState<EquityResult | null>(null);
  const [running, setRunning] = useState(false);

  const setCard = useCallback(
    (zone: 'hand' | 'board', index: number, card: Card): void => {
      const update = (cards: (Card | null)[]): (Card | null)[] =>
        cards.map((existing, position) =>
          position === index ? card : existing
        );
      if (zone === 'hand') setHand(update);
      else setBoard(update);
      setResults(null);
    },
    []
  );

  const ready = useMemo(
    () => hand.every(Boolean) && board.slice(0, 3).every(Boolean),
    [board, hand]
  );

  const run = useCallback((): void => {
    if (!ready || running) return;
    setRunning(true);
    const { hero, tie } = runSimulation(
      hand as Card[],
      board.filter((card): card is Card => card !== null),
      players,
      ITERATIONS
    );
    setResults({
      equity: ((hero + tie / 2) / ITERATIONS) * 100,
      win: hero,
      tie,
    });
    setRunning(false);
  }, [board, hand, players, ready, running]);

  return useMemo(
    () => ({
      hand,
      board,
      players,
      results,
      running,
      ready,
      setCard,
      setPlayers,
      run,
    }),
    [board, hand, players, ready, results, run, running, setCard]
  );
};
