'use client';

import { useCallback, useMemo, useState } from 'react';
import { puzzleForDate, PUZZLES } from './puzzles';
import type { GameStatus, SolvedGroup, Tile } from './types';
import {
  createTiles,
  GROUP_COLORS,
  MAX_MISTAKES,
  submitSelection,
} from './utils';

const today = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate()
  ).padStart(2, '0')}`;
};

export interface UseConnectionsResult {
  puzzleId: number;
  tiles: Tile[];
  solved: SolvedGroup[];
  selected: string[];
  mistakesLeft: number;
  status: GameStatus;
  message: string | null;
  toggle: (country: string) => void;
  shuffle: () => void;
  deselectAll: () => void;
  submit: () => void;
  nextPuzzle: () => void;
}

export const useConnections = (dateKey?: string): UseConnectionsResult => {
  const [puzzleIndex, setPuzzleIndex] = useState<number>(() =>
    PUZZLES.findIndex(
      (candidate) => candidate.id === puzzleForDate(dateKey ?? today()).id
    )
  );
  const [tiles, setTiles] = useState<Tile[]>(() =>
    createTiles(PUZZLES[puzzleIndex], 42)
  );
  const [solved, setSolved] = useState<SolvedGroup[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [mistakesLeft, setMistakesLeft] = useState(MAX_MISTAKES);
  const [status, setStatus] = useState<GameStatus>('playing');
  const [message, setMessage] = useState<string | null>(null);

  const toggle = useCallback(
    (country: string): void => {
      if (status !== 'playing') return;
      setMessage(null);
      setSelected((current) => {
        if (current.includes(country)) {
          return current.filter((item) => item !== country);
        }
        return current.length < 4 ? [...current, country] : current;
      });
    },
    [status]
  );

  const shuffle = useCallback((): void => {
    setTiles((current) => {
      const result = [...current];
      for (let index = result.length - 1; index > 0; index -= 1) {
        const swap = Math.floor(Math.random() * (index + 1));
        [result[index], result[swap]] = [result[swap], result[index]];
      }
      return result;
    });
  }, []);

  const deselectAll = useCallback((): void => {
    setSelected([]);
  }, []);

  const submit = useCallback((): void => {
    if (status !== 'playing') return;
    const outcome = submitSelection(
      PUZZLES[puzzleIndex],
      solved.map((group) => group.label),
      selected,
      mistakesLeft
    );
    if (outcome.solved.length > 0) {
      setSolved((current) => [...current, ...outcome.solved]);
      setTiles((current) =>
        current.filter(
          (tile) =>
            !outcome.solved.some((group) =>
              group.members.includes(tile.country)
            )
        )
      );
    }
    if (outcome.status === 'lost') {
      setSolved(
        PUZZLES[puzzleIndex].groups.map((group, index) => ({
          ...group,
          color: GROUP_COLORS[index % GROUP_COLORS.length],
        }))
      );
      setTiles([]);
    }
    setSelected(outcome.selected);
    setMistakesLeft(outcome.mistakesLeft);
    setStatus(outcome.status);
    setMessage(outcome.message);
  }, [mistakesLeft, puzzleIndex, selected, solved, status]);

  const nextPuzzle = useCallback((): void => {
    const nextIndex = (puzzleIndex + 1) % PUZZLES.length;
    setPuzzleIndex(nextIndex);
    setTiles(createTiles(PUZZLES[nextIndex], Date.now() % 100_000));
    setSolved([]);
    setSelected([]);
    setMistakesLeft(MAX_MISTAKES);
    setStatus('playing');
    setMessage(null);
  }, [puzzleIndex]);

  return useMemo(
    () => ({
      puzzleId: PUZZLES[puzzleIndex].id,
      tiles,
      solved,
      selected,
      mistakesLeft,
      status,
      message,
      toggle,
      shuffle,
      deselectAll,
      submit,
      nextPuzzle,
    }),
    [
      deselectAll,
      message,
      mistakesLeft,
      nextPuzzle,
      puzzleIndex,
      selected,
      shuffle,
      solved,
      status,
      submit,
      tiles,
      toggle,
    ]
  );
};
