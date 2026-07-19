import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { DEFAULT_SIZE, SOLVE_STEP_DELAY } from './constants';
import { Cell, Pos } from './types';
import { generateMaze, pathToMoves, solveMaze } from './maze';

export const useMaze = () => {
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [grid, setGrid] = useState<Cell[][]>(() =>
    generateMaze(DEFAULT_SIZE, DEFAULT_SIZE)
  );
  const [path, setPath] = useState<Pos[]>([]);
  const [revealed, setRevealed] = useState(0);
  const [solving, setSolving] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = useMemo(() => ({ row: 0, col: 0 }), []);
  const end = useMemo(() => ({ row: size - 1, col: size - 1 }), [size]);

  const stopSolve = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setSolving(false);
  }, []);

  useEffect(() => stopSolve, [stopSolve]);

  const newMaze = useCallback(
    (nextSize = size) => {
      stopSolve();
      setSize(nextSize);
      setGrid(generateMaze(nextSize, nextSize));
      setPath([]);
      setRevealed(0);
    },
    [size, stopSolve]
  );

  const solve = useCallback(() => {
    if (solving) {
      stopSolve();
      return;
    }
    const solution = solveMaze(grid, start, end);
    if (!solution) return;

    setPath(solution);
    setRevealed(1);
    setSolving(true);
    const moves = pathToMoves(solution);

    const step = (index: number) => {
      if (index >= moves.length) {
        setSolving(false);
        return;
      }
      timerRef.current = setTimeout(() => {
        setRevealed(index + 2);
        step(index + 1);
      }, SOLVE_STEP_DELAY);
    };
    step(0);
  }, [end, grid, solving, start, stopSolve]);

  return {
    grid,
    size,
    start,
    end,
    path,
    revealed,
    solving,
    solved: path.length > 0 && revealed >= path.length,
    newMaze,
    toggleSolve: solve,
  };
};
