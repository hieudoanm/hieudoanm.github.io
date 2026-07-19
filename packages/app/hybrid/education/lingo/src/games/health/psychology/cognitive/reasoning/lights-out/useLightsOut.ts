import { useCallback, useEffect, useRef, useState } from 'react';

import { AUTO_SOLVE_DELAY, initialDifficulty } from './constants';
import {
  Board,
  countLit,
  createBoard,
  generatePuzzle,
  isSolved,
  Pos,
  toggleCell,
} from './utils';

export const useLightsOut = () => {
  const [size, setSize] = useState(initialDifficulty.size);
  const [board, setBoard] = useState<Board>(() =>
    createBoard(initialDifficulty.size)
  );
  const [solution, setSolution] = useState<Pos[]>([]);
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);
  const [autoSolving, setAutoSolving] = useState(false);
  const [par, setPar] = useState(initialDifficulty.moves);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stopAutoSolve = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setAutoSolving(false);
  }, []);

  useEffect(() => stopAutoSolve, [stopAutoSolve]);

  const newGame = useCallback(
    (nextSize = size, nextPar = par) => {
      stopAutoSolve();
      const { board: fresh, solution: path } = generatePuzzle(
        nextSize,
        nextPar
      );
      setSize(nextSize);
      setPar(nextPar);
      setBoard(fresh);
      setSolution(path);
      setMoves(0);
      setSolved(false);
    },
    [par, size, stopAutoSolve]
  );

  useEffect(() => {
    newGame(initialDifficulty.size, initialDifficulty.moves);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = useCallback(
    (row: number, col: number) => {
      if (solved || autoSolving) return;
      const next = toggleCell(board, row, col);
      setBoard(next);
      setMoves((previous) => previous + 1);
      if (isSolved(next)) setSolved(true);
    },
    [autoSolving, board, solved]
  );

  const toggleAutoSolve = useCallback(() => {
    if (autoSolving) {
      stopAutoSolve();
      return;
    }
    if (solution.length === 0) return;

    setAutoSolving(true);
    let index = solution.length - 1;
    const play = () => {
      if (index < 0) {
        setAutoSolving(false);
        return;
      }
      timerRef.current = setTimeout(() => {
        const [row, col] = solution[index];
        setBoard((previous) => {
          const next = toggleCell(previous, row, col);
          if (isSolved(next)) setSolved(true);
          return next;
        });
        index -= 1;
        play();
      }, AUTO_SOLVE_DELAY);
    };
    play();
  }, [autoSolving, solution, stopAutoSolve]);

  return {
    board,
    moves,
    par,
    lit: countLit(board),
    size,
    solved,
    autoSolving,
    handleClick,
    toggleAutoSolve,
    newGame,
  };
};
