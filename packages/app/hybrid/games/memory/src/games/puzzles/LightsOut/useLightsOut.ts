import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Board,
  createBoard,
  isSolved,
  toggleCell,
  generatePuzzle,
} from './utils';

const GRID_SIZE = 5;

export const useLightsOut = () => {
  const [board, setBoard] = useState<Board>(createBoard(GRID_SIZE));
  const [solution, setSolution] = useState<[number, number][]>([]);
  const [movesCount, setMovesCount] = useState(0);
  const [solved, setSolved] = useState(false);
  const [autoSolving, setAutoSolving] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stopAutoSolve = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setAutoSolving(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const newGame = useCallback(() => {
    stopAutoSolve();
    const { board: b, solution: s } = generatePuzzle(GRID_SIZE);
    setBoard(b);
    setSolution(s);
    setMovesCount(0);
    setSolved(false);
  }, [stopAutoSolve]);

  useEffect(() => {
    newGame();
  }, [newGame]);

  const handleClick = useCallback(
    (row: number, col: number) => {
      if (solved || autoSolving) return;
      const next = toggleCell(board, row, col);
      setBoard(next);
      setMovesCount((prev) => prev + 1);
      if (isSolved(next)) setSolved(true);
    },
    [board, solved, autoSolving]
  );

  const startAutoSolve = useCallback(() => {
    if (autoSolving) {
      stopAutoSolve();
      return;
    }
    if (solution.length === 0) return;

    setAutoSolving(true);
    let idx = solution.length - 1;

    const play = () => {
      if (idx < 0) {
        setAutoSolving(false);
        return;
      }
      timerRef.current = setTimeout(() => {
        const [r, c] = solution[idx];
        setBoard((prev) => toggleCell(prev, r, c));
        idx--;
        play();
      }, 200);
    };

    play();
  }, [autoSolving, solution, stopAutoSolve]);

  return {
    board,
    movesCount,
    solved,
    autoSolving,
    gridSize: GRID_SIZE,
    handleClick,
    startAutoSolve,
    newGame,
  };
};
