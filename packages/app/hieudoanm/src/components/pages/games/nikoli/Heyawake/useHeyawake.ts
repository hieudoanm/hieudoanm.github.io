import { useCallback, useEffect, useRef, useState } from 'react';
import { Grid, Room } from './types';
import { SIZE, generatePuzzle, checkWin } from './utils';

export const useHeyawake = () => {
  const [solution, setSolution] = useState<Grid>([]);
  const [grid, setGrid] = useState<Grid>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [won, setWon] = useState(false);
  const [autoSolving, setAutoSolving] = useState(false);
  const historyRef = useRef<Grid[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const init = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const { grid: s, rooms: r } = generatePuzzle();
    setSolution(s);
    setRooms(r);
    setGrid(s.map((row) => row.map((cell) => ({ ...cell, shaded: false }))));
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
      historyRef.current.push(
        grid.map((row) => row.map((cell) => ({ ...cell })))
      );
      const next = grid.map((row) => row.map((cell) => ({ ...cell })));
      next[r][c].shaded = !next[r][c].shaded;
      setGrid(next);
      if (checkWin(next, rooms)) setWon(true);
    },
    [grid, rooms, won, autoSolving]
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
        if (grid[r][c].shaded !== solution[r][c].shaded) diffCells.push([r, c]);

    if (diffCells.length === 0) return;

    setAutoSolving(true);
    historyRef.current.push(
      grid.map((row) => row.map((cell) => ({ ...cell })))
    );
    let idx = 0;

    const play = () => {
      if (idx >= diffCells.length) {
        setAutoSolving(false);
        return;
      }
      timerRef.current = setTimeout(() => {
        const [r, c] = diffCells[idx];
        const next = grid.map((row) => row.map((cell) => ({ ...cell })));
        next[r][c].shaded = solution[r][c].shaded;
        setGrid(next);
        if (checkWin(next, rooms)) setWon(true);
        idx++;
        play();
      }, 150);
    };

    play();
  }, [autoSolving, won, grid, solution, rooms, stopAutoSolve]);

  return {
    grid,
    rooms,
    won,
    size: SIZE,
    autoSolving,
    toggle,
    undo,
    autoSolve,
    newGame: init,
  };
};
