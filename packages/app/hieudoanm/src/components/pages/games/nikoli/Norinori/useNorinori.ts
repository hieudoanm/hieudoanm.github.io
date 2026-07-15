import { useCallback, useEffect, useRef, useState } from 'react';
import { ClueCounts, Grid } from './types';
import { SIZE, generatePuzzle, validate } from './utils';

const createEmpty = (): Grid =>
  Array.from({ length: SIZE }, () => Array(SIZE).fill(false));

export const useNorinori = () => {
  const [solution, setSolution] = useState<Grid>([]);
  const [clues, setClues] = useState<ClueCounts>({ rows: [], cols: [] });
  const [grid, setGrid] = useState<Grid>(createEmpty());
  const [won, setWon] = useState(false);
  const [autoSolving, setAutoSolving] = useState(false);
  const historyRef = useRef<Grid[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const init = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const { solution: s, clues: c } = generatePuzzle();
    setSolution(s);
    setClues(c);
    setGrid(createEmpty());
    setWon(false);
    setAutoSolving(false);
    historyRef.current = [];
  }, []);

  useEffect(() => {
    init();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [init]);

  const toggle = useCallback(
    (r: number, c: number) => {
      if (won || autoSolving) return;
      historyRef.current.push(grid.map((row) => [...row]));
      const next = grid.map((row) => [...row]);
      next[r][c] = !next[r][c];
      setGrid(next);
      if (validate(next, clues)) setWon(true);
    },
    [grid, clues, won, autoSolving]
  );

  const undo = useCallback(() => {
    if (historyRef.current.length === 0 || autoSolving) return;
    const prev = historyRef.current.pop()!;
    setGrid(prev);
  }, [autoSolving]);

  const stopAutoSolve = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setAutoSolving(false);
  }, []);

  const autoSolve = useCallback(() => {
    if (autoSolving) {
      stopAutoSolve();
      return;
    }
    if (won) return;

    const diffCells: [number, number][] = [];
    for (let r = 0; r < SIZE; r++)
      for (let c = 0; c < SIZE; c++)
        if (grid[r][c] !== solution[r][c]) diffCells.push([r, c]);

    if (diffCells.length === 0) return;

    setAutoSolving(true);
    historyRef.current.push(grid.map((row) => [...row]));
    let idx = 0;

    const play = () => {
      if (idx >= diffCells.length) {
        setAutoSolving(false);
        return;
      }
      timerRef.current = setTimeout(() => {
        const [r, c] = diffCells[idx];
        const next = grid.map((row) => [...row]);
        next[r][c] = solution[r][c];
        setGrid(next);
        if (validate(next, clues)) setWon(true);
        idx++;
        play();
      }, 150);
    };

    play();
  }, [autoSolving, won, grid, solution, clues, stopAutoSolve]);

  return {
    clues,
    grid,
    won,
    size: SIZE,
    autoSolving,
    toggle,
    undo,
    autoSolve,
    newGame: init,
  };
};
