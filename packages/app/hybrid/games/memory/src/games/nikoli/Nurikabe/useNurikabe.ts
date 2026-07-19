import { useCallback, useEffect, useRef, useState } from 'react';
import { Grid } from './types';
import { SIZE, generatePuzzle, checkWin } from './utils';

export const useNurikabe = () => {
  const [solution, setSolution] = useState<Grid>([]);
  const [grid, setGrid] = useState<Grid>([]);
  const [won, setWon] = useState(false);
  const [autoSolving, setAutoSolving] = useState(false);
  const historyRef = useRef<Grid[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const gridRef = useRef(grid);

  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  const init = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const s = generatePuzzle();
    setSolution(s);
    const empty = s.map((row) =>
      row.map((cell) => ({ ...cell, state: 'empty' as const }))
    );
    setGrid(empty);
    gridRef.current = empty;
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
      const cell = grid[r][c];
      if (cell.state === 'numbered') return;
      historyRef.current.push(
        grid.map((row) => row.map((cell) => ({ ...cell })))
      );
      const next = grid.map((row) => row.map((cell) => ({ ...cell })));
      next[r][c].state = cell.state === 'shaded' ? 'empty' : 'shaded';
      setGrid(next);
      if (checkWin(next)) setWon(true);
    },
    [grid, won, autoSolving]
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

    const diffs: [number, number, 'numbered' | 'shaded'][] = [];
    for (let r = 0; r < SIZE; r++)
      for (let c = 0; c < SIZE; c++) {
        const sol = solution[r][c];
        const target: 'numbered' | 'shaded' =
          sol.islandId >= 0 ? 'numbered' : 'shaded';
        if (grid[r][c].state !== target) diffs.push([r, c, target]);
      }

    if (diffs.length === 0) return;

    setAutoSolving(true);
    historyRef.current.push(
      grid.map((row) => row.map((cell) => ({ ...cell })))
    );
    let idx = 0;

    const play = () => {
      if (idx >= diffs.length) {
        setAutoSolving(false);
        return;
      }
      timerRef.current = setTimeout(() => {
        const [r, c, target] = diffs[idx];
        const current = gridRef.current;
        const next = current.map((row) => row.map((cell) => ({ ...cell })));
        next[r][c].state = target;
        setGrid(next);
        if (checkWin(next)) setWon(true);
        idx++;
        play();
      }, 150);
    };

    play();
  }, [autoSolving, won, grid, solution, stopAutoSolve]);

  return {
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
