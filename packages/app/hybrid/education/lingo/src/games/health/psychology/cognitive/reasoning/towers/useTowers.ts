import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';

import { AUTO_SOLVE_DELAY, DEFAULT_DISKS, SHAKE_DURATION } from './constants';
import {
  canDrop,
  createStacks,
  generateMoves,
  isSolved,
  moveDisk,
  optimalMoves,
  Tower,
} from './utils';

interface State {
  diskCount: number;
  towers: Tower[];
  selected: number | null;
  moves: number;
  history: Tower[][];
  future: Tower[][];
}

type Action =
  | { type: 'reset'; diskCount: number }
  | { type: 'select'; index: number }
  | { type: 'move'; from: number; to: number }
  | { type: 'undo' }
  | { type: 'redo' }
  | { type: 'apply'; from: number; to: number };

const initialState = (diskCount: number): State => ({
  diskCount,
  towers: createStacks(diskCount),
  selected: null,
  moves: 0,
  history: [],
  future: [],
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'reset':
      return initialState(action.diskCount);
    case 'select':
      return state.towers[action.index]?.length
        ? { ...state, selected: action.index }
        : state;
    case 'move':
      return canDrop(action.from, action.to, state.towers)
        ? {
            ...state,
            towers: moveDisk(state.towers, action.from, action.to),
            moves: state.moves + 1,
            selected: null,
            history: [...state.history, state.towers],
            future: [],
          }
        : state;
    case 'undo':
      return state.history.length
        ? {
            ...state,
            towers: state.history[state.history.length - 1],
            history: state.history.slice(0, -1),
            future: [state.towers, ...state.future],
            moves: Math.max(0, state.moves - 1),
          }
        : state;
    case 'redo':
      return state.future.length
        ? {
            ...state,
            towers: state.future[0],
            future: state.future.slice(1),
            history: [...state.history, state.towers],
            moves: state.moves + 1,
          }
        : state;
    case 'apply':
      return {
        ...state,
        towers: moveDisk(state.towers, action.from, action.to),
      };
    default:
      return state;
  }
};

export const useTowers = () => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_DISKS, initialState);
  const [autoPlaying, setAutoPlaying] = useState(false);
  const [shakeTower, setShakeTower] = useState<number | null>(null);
  const { diskCount, towers, selected, moves, history, future } = state;

  const solution = useMemo(() => generateMoves(diskCount), [diskCount]);
  const stepRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stopAutoSolve = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setAutoPlaying(false);
  }, []);

  useEffect(() => stopAutoSolve, [stopAutoSolve]);

  useEffect(() => {
    if (shakeTower === null) return;
    const timer = setTimeout(() => setShakeTower(null), SHAKE_DURATION);
    return () => clearTimeout(timer);
  }, [shakeTower]);

  const reset = useCallback(
    (count: number) => {
      stopAutoSolve();
      dispatch({ type: 'reset', diskCount: count });
    },
    [stopAutoSolve]
  );

  const select = useCallback(
    (index: number) => {
      if (selected === null) {
        if (towers[index].length) dispatch({ type: 'select', index });
        return;
      }
      if (!canDrop(selected, index, towers)) {
        setShakeTower(index);
        return;
      }
      dispatch({ type: 'move', from: selected, to: index });
    },
    [selected, towers]
  );

  const startAutoSolve = useCallback(() => {
    stopAutoSolve();
    stepRef.current = 0;
    setAutoPlaying(true);

    const play = () => {
      if (stepRef.current >= solution.length) {
        setAutoPlaying(false);
        return;
      }
      const [from, to] = solution[stepRef.current];
      dispatch({ type: 'apply', from, to });
      stepRef.current += 1;
      timerRef.current = setTimeout(play, AUTO_SOLVE_DELAY);
    };
    play();
  }, [solution, stopAutoSolve]);

  const undo = useCallback(() => dispatch({ type: 'undo' }), []);
  const redo = useCallback(() => dispatch({ type: 'redo' }), []);
  const isTarget = useCallback(
    (index: number) => selected !== null && canDrop(selected, index, towers),
    [selected, towers]
  );

  return {
    towers,
    selected,
    moves,
    par: optimalMoves(diskCount),
    won: isSolved(towers, diskCount),
    diskCount,
    shakeTower,
    autoPlaying,
    canUndo: history.length > 0,
    canRedo: future.length > 0,
    select,
    isTarget,
    reset,
    undo,
    redo,
    startAutoSolve,
    stopAutoSolve,
  };
};
