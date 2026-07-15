import { useCallback, useEffect, useRef, useState } from 'react';
import { Grid } from './types';
import { SIZE, generatePuzzle, isComplete } from './utils';

export const useFillomino = () => {
  const [solution, setSolution] = useState<Grid>([]);
  const [puzzle, setPuzzle] = useState<Grid>([]);
  const [grid, setGrid] = useState<Grid>([]);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [won, setWon] = useState(false);
  const [autoSolving, setAutoSolving] = useState(false);
  const historyRef = useRef<Grid[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const init = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const { solution: s, puzzle: p } = generatePuzzle();
    setSolution(s);
    setPuzzle(p);
    setGrid(p.map((row) => [...row]));
    setSelected(null);
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

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (won || autoSolving) return;
      if (puzzle[row][col] !== null) return;
      setSelected([row, col]);
    },
    [puzzle, won, autoSolving]
  );

  const setCell = useCallback(
    (val: number) => {
      if (!selected || won || autoSolving) return;
      const [r, c] = selected;
      if (puzzle[r][c] !== null) return;
      historyRef.current.push(grid.map((row) => [...row]));
      const next = grid.map((row) => [...row]);
      next[r][c] = val;
      setGrid(next);
      if (isComplete(next)) setWon(true);
    },
    [selected, puzzle, grid, won, autoSolving]
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

    const emptyCells: [number, number][] = [];
    for (let r = 0; r < SIZE; r++)
      for (let c = 0; c < SIZE; c++)
        if (puzzle[r][c] === null && grid[r][c] === null)
          emptyCells.push([r, c]);

    if (emptyCells.length === 0) return;

    setAutoSolving(true);
    historyRef.current.push(grid.map((row) => [...row]));
    let idx = 0;

    const play = () => {
      if (idx >= emptyCells.length) {
        setAutoSolving(false);
        return;
      }
      timerRef.current = setTimeout(() => {
        const [r, c] = emptyCells[idx];
        const next = grid.map((row) => [...row]);
        next[r][c] = solution[r][c];
        setGrid(next);
        if (isComplete(next)) setWon(true);
        idx++;
        play();
      }, 150);
    };

    play();
  }, [autoSolving, won, puzzle, grid, solution, stopAutoSolve]);

  const emptyCount = grid.flat().filter((v) => v === null).length;

  return {
    puzzle,
    grid,
    selected,
    won,
    size: SIZE,
    autoSolving,
    emptyCount,
    handleCellClick,
    setCell,
    undo,
    autoSolve,
    newGame: init,
  };
};
