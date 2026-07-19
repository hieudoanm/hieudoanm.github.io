import { useCallback, useEffect, useRef, useState } from 'react';
import { Grid, Pearl } from './types';
import { SIZE, generatePuzzle, checkWin } from './utils';

export const useMasyu = () => {
  const [pearls, setPearls] = useState<Pearl[]>([]);
  const [solution, setSolution] = useState<Grid>([]);
  const [grid, setGrid] = useState<Grid>(() =>
    Array.from({ length: SIZE }, () => Array(SIZE).fill(false))
  );
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
    const { pearls: p, solution: s } = generatePuzzle();
    setPearls(p);
    setSolution(s);
    const empty = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));
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
      historyRef.current.push(grid.map((row) => [...row]));
      const next = grid.map((row) => [...row]);
      next[r][c] = !next[r][c];
      setGrid(next);
      if (checkWin(next, pearls)) setWon(true);
    },
    [grid, pearls, won, autoSolving]
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
        const current = gridRef.current;
        const next = current.map((row) => [...row]);
        next[r][c] = solution[r][c];
        setGrid(next);
        if (checkWin(next, pearls)) setWon(true);
        idx++;
        play();
      }, 150);
    };

    play();
  }, [autoSolving, won, grid, solution, pearls, stopAutoSolve]);

  return {
    pearls,
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
