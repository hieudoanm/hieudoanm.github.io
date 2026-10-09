import { useEffect, useReducer, useRef, useState } from 'react';
import { Grid } from './types';
import {
  createEmptyGrid,
  generatePuzzle,
  isValid,
  solve,
} from './utils/sudoku';

interface GameState {
  puzzle: Grid;
  solution: Grid;
  userGrid: Grid;
  selected: [number, number] | null;
  timer: number;
  won: boolean;
}

type GameAction =
  | { type: 'NEW_GAME'; puzzle: Grid; solution: Grid }
  | { type: 'SET_CELL'; grid: Grid; won: boolean }
  | { type: 'SELECT'; pos: [number, number] | null }
  | { type: 'TICK' };

const createInitialState = (size: 3 | 4 | 5): GameState => {
  const e = createEmptyGrid(size);
  return {
    puzzle: e,
    solution: e,
    userGrid: e,
    selected: null,
    timer: 0,
    won: false,
  };
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'NEW_GAME':
      return {
        puzzle: action.puzzle,
        solution: action.solution,
        userGrid: action.puzzle.map((r) => [...r]),
        selected: null,
        timer: 0,
        won: false,
      };
    case 'SET_CELL':
      return {
        ...state,
        userGrid: action.grid,
        selected: null,
        won: action.won,
      };
    case 'SELECT':
      return { ...state, selected: action.pos };
    case 'TICK':
      return { ...state, timer: state.timer + 1 };
    default: {
      const _exhaustive: never = action;
      return state;
    }
  }
};

export const useSudoku = (size: 3 | 4 | 5, diff: number) => {
  const [state, dispatch] = useReducer(gameReducer, size, createInitialState);
  const timerRef = useRef<number | null>(null);
  const historyRef = useRef<Grid[]>([]);
  const N = size * size;

  useEffect(() => {
    newGame();
    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current);
    };
  }, [size]);

  useEffect(() => {
    if (state.won && timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [state.won]);

  const newGame = () => {
    if (timerRef.current !== null) clearInterval(timerRef.current);
    historyRef.current = [];
    const { puzzle: p, solution: s } = generatePuzzle(size, diff);
    dispatch({ type: 'NEW_GAME', puzzle: p, solution: s });
    timerRef.current = window.setInterval(
      () => dispatch({ type: 'TICK' }),
      1000
    );
  };

  const setCell = (r: number, c: number, val: number) => {
    if (state.puzzle[r][c] !== 0 || state.won) return;
    const next = state.userGrid.map((row) => [...row]);
    next[r][c] = val;
    if (val > 0 && !isValid(next, r, c, val, size)) return;
    let isWon = false;
    if (val > 0) {
      const test = next.map((row) => [...row]);
      if (solve(test, size)) {
        const flat = test.flatMap((row, ri) =>
          row.map((col, ci) =>
            col !== state.puzzle[ri][ci] && col === state.solution[ri][ci]
              ? 1
              : 0
          )
        );
        if (flat.every(Boolean)) isWon = true;
      }
    }
    historyRef.current.push(state.userGrid.map((r) => [...r]));
    dispatch({ type: 'SET_CELL', grid: next, won: isWon });
  };

  const undo = () => {
    if (historyRef.current.length === 0) return;
    const prev = historyRef.current.pop()!;
    dispatch({ type: 'SET_CELL', grid: prev, won: false });
  };

  const hint = () => {
    for (let r = 0; r < N; r++)
      for (let c = 0; c < N; c++) {
        if (state.userGrid[r][c] === 0 && state.puzzle[r][c] === 0) {
          setCell(r, c, state.solution[r][c]);
          return;
        }
      }
  };

  const selectCell = (r: number, c: number) => {
    dispatch({ type: 'SELECT', pos: [r, c] });
  };

  const note = (n: number) => {
    if (state.selected) {
      const [r, c] = state.selected;
      setCell(r, c, state.userGrid[r][c] === n ? 0 : n);
    }
  };

  return {
    userGrid: state.userGrid,
    puzzle: state.puzzle,
    selected: state.selected,
    won: state.won,
    timer: state.timer,
    size,
    N,
    newGame,
    setCell,
    undo,
    hint,
    selectCell,
    note,
  };
};
