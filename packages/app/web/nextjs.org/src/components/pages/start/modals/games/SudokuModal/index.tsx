import { FC, useEffect, useReducer, useRef, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

import { Grid } from './types';
import {
  createEmptyGrid,
  generatePuzzle,
  isValid,
  solve,
  formatTime,
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
    default:
      const _exhaustive: never = action;
      return state;
  }
};

export const SudokuModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [size] = useState<3 | 4 | 5>(3);
  const [diff, setDiff] = useState(0.5);
  const [state, dispatch] = useReducer(gameReducer, size, createInitialState);
  const timerRef = useRef<number | null>(null);
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
          row.map((c, ci) =>
            c !== state.puzzle[ri][ci] && c === state.solution[ri][ci] ? 1 : 0
          )
        );
        if (flat.every(Boolean)) isWon = true;
      }
    }
    dispatch({ type: 'SET_CELL', grid: next, won: isWon });
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

  const note = (n: number) => {
    if (state.selected) {
      const [r, c] = state.selected;
      setCell(r, c, state.userGrid[r][c] === n ? 0 : n);
    }
  };

  return (
    <ModalWrapper onClose={onClose} title="Sudoku" size="max-w-sm">
      <div className="mb-2 flex items-center justify-between text-xs">
        <div className="flex gap-1">
          {['Easy', 'Medium', 'Hard'].map((l, i) => (
            <button
              key={l}
              onClick={() => setDiff(i * 0.25 + 0.25)}
              className={`btn btn-xs ${Math.abs(diff - (i * 0.25 + 0.25)) < 0.01 ? 'btn-primary' : 'btn-ghost'}`}>
              {l}
            </button>
          ))}
        </div>
        <div>
          <span className="opacity-50">Timer:</span> {formatTime(state.timer)}
        </div>
      </div>
      <div
        className={`mb-2 grid select-none`}
        style={{ gridTemplateColumns: `repeat(${N}, 1fr)`, gap: '0px' }}>
        {state.userGrid.flatMap((row, r) =>
          row.map((val, c) => {
            const isGiven = state.puzzle[r][c] !== 0;
            const isSelected =
              state.selected?.[0] === r && state.selected?.[1] === c;
            const isSameNum =
              state.selected &&
              val !== 0 &&
              val === state.userGrid[state.selected[0]]?.[state.selected[1]];
            const boxBorderR = (c + 1) % size === 0 && c !== N - 1;
            const boxBorderB = (r + 1) % size === 0 && r !== N - 1;
            return (
              <div
                key={`${r}-${c}`}
                onClick={() =>
                  !isGiven && dispatch({ type: 'SELECT', pos: [r, c] })
                }
                className={`flex aspect-square cursor-pointer items-center justify-center font-mono text-sm transition-colors ${isGiven ? 'font-bold' : ''} ${isSelected ? 'bg-primary/20' : isSameNum ? 'bg-primary/10' : (r + c) % 2 === 0 ? 'bg-base-200' : 'bg-base-100'} ${boxBorderR ? 'border-base-300 border-r-2' : ''} ${boxBorderB ? 'border-base-300 border-b-2' : ''} ${isGiven ? '' : 'hover:bg-primary/5'}`}>
                {val !== 0 ? val : ''}
              </div>
            );
          })
        )}
      </div>
      <div className="mb-2 flex flex-wrap justify-center gap-1">
        {Array.from({ length: N }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => note(n)}
            className="btn btn-square btn-ghost h-8 w-8 text-xs">
            {n}
          </button>
        ))}
        <button
          onClick={() => note(0)}
          className="btn btn-square btn-ghost h-8 w-8 text-xs">
          ✕
        </button>
      </div>
      <div className="flex justify-center gap-2">
        <button onClick={newGame} className="btn btn-primary btn-sm">
          New Game
        </button>
        <button onClick={hint} className="btn btn-ghost btn-sm">
          Hint
        </button>
      </div>
      {state.won && (
        <div className="alert alert-success mt-2 text-center text-sm">
          Solved in {formatTime(state.timer)}!
        </div>
      )}
    </ModalWrapper>
  );
};
