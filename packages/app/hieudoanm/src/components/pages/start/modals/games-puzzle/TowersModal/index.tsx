import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import {
  FC,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

import { DISK_GRADIENTS, DISK_TEXT, MAX_DISKS, MIN_DISKS } from './constants';
import { Tower } from './types';
import { generateMoves } from './utils/towers';

interface GameState {
  diskCount: number;
  towers: Tower[];
  selectedTower: number | null;
  moves: number;
  history: Tower[][];
  future: Tower[][];
}

const createInitialState = (diskCount = 3): GameState => ({
  diskCount,
  towers: [Array.from({ length: diskCount }, (_, i) => diskCount - i), [], []],
  selectedTower: null,
  moves: 0,
  history: [],
  future: [],
});

type GameAction =
  | { type: 'RESET'; diskCount: number }
  | { type: 'SELECT_TOWER'; index: number }
  | { type: 'MOVE_DISK'; from: number; to: number; capture: boolean }
  | { type: 'UNDO'; towers: Tower[] }
  | { type: 'REDO'; futureTowers: Tower[]; nextFuture: Tower[][] }
  | { type: 'APPLY_MOVE'; from: number; to: number };

const canDrop = (from: number, to: number, towers: Tower[]) => {
  if (from === to) return false;
  const fromDisk = towers[from]?.at(-1);
  const toDisk = towers[to]?.at(-1);
  return fromDisk && (!toDisk || fromDisk < toDisk);
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'RESET':
      return createInitialState(action.diskCount);
    case 'SELECT_TOWER':
      if (!state.towers[action.index]?.length) return state;
      return { ...state, selectedTower: action.index };
    case 'MOVE_DISK': {
      const { from, to, capture } = action;
      if (!canDrop(from, to, state.towers)) return state;
      const nextTowers = state.towers.map((t) => [...t]);
      const disk = nextTowers[from].pop()!;
      nextTowers[to].push(disk);
      return {
        ...state,
        towers: nextTowers,
        moves: state.moves + 1,
        selectedTower: null,
        history: capture
          ? [...state.history, state.towers.map((t) => [...t])]
          : state.history,
        future: capture ? [] : state.future,
      };
    }
    case 'UNDO': {
      return {
        ...state,
        towers: action.towers,
        history: state.history.slice(0, -1),
        moves: Math.max(0, state.moves - 1),
      };
    }
    case 'REDO': {
      return {
        ...state,
        towers: action.futureTowers,
        future: action.nextFuture,
        history: [...state.history, state.towers],
        moves: state.moves + 1,
      };
    }
    case 'APPLY_MOVE': {
      const next = state.towers.map((t) => [...t]);
      const disk = next[action.from].pop();
      if (!disk) return state;
      next[action.to].push(disk);
      return { ...state, towers: next };
    }
    default:
      const _exhaustive: never = action;
      return state;
  }
};

export const TowersModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const diskRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const prevPositions = useRef<Map<number, DOMRect>>(new Map());
  const autoTimer = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const towerRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  const [state, dispatch] = useReducer(gameReducer, 3, createInitialState);
  const [shakeTower, setShakeTower] = useState<number | null>(null);
  const [autoPlaying, setAutoPlaying] = useState(false);
  const { diskCount, towers, selectedTower, moves, history, future } = state;

  const optimalMoves = Math.pow(2, diskCount) - 1;
  const isWin = towers[2].length === diskCount;

  useEffect(() => {
    containerRef.current?.focus();
  }, []);
  useEffect(() => {
    if (shakeTower === null) return;
    const el = towerRefs.current[shakeTower];
    if (!el) return;
    el.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-6px)' },
        { transform: 'translateX(6px)' },
        { transform: 'translateX(0)' },
      ],
      { duration: 400, easing: 'ease' }
    );
  }, [shakeTower]);

  useLayoutEffect(() => {
    diskRefs.current.forEach((el, disk) => {
      const prev = prevPositions.current.get(disk);
      if (!prev) return;
      const next = el.getBoundingClientRect();
      const dx = prev.left - next.left;
      const dy = prev.top - next.top;
      if (dx || dy)
        el.animate(
          [
            { transform: `translate(${dx}px, ${dy}px)` },
            { transform: 'translate(0, 0)' },
          ],
          { duration: 300, easing: 'cubic-bezier(0.4,0,0.2,1)' }
        );
    });
    prevPositions.current.clear();
  }, [towers]);

  const capturePositions = () => {
    prevPositions.current.clear();
    diskRefs.current.forEach((el, disk) => {
      prevPositions.current.set(disk, el.getBoundingClientRect());
    });
  };

  const stopAutoSolve = () => {
    if (autoTimer.current) clearTimeout(autoTimer.current);
    autoTimer.current = null;
    setAutoPlaying(false);
  };

  const resetGame = (count = diskCount) => {
    stopAutoSolve();
    dispatch({ type: 'RESET', diskCount: count });
  };

  const handleTowerClick = (index: number) => {
    if (autoPlaying) return;
    if (selectedTower === null) {
      if (towers[index].length) dispatch({ type: 'SELECT_TOWER', index });
    } else {
      if (!canDrop(selectedTower, index, towers)) {
        setShakeTower(index);
        setTimeout(() => setShakeTower(null), 400);
        return;
      }
      capturePositions();
      dispatch({
        type: 'MOVE_DISK',
        from: selectedTower,
        to: index,
        capture: true,
      });
    }
  };

  const undo = () => {
    if (!history.length) return;
    capturePositions();
    dispatch({ type: 'UNDO', towers: history.at(-1)! });
  };

  const redo = () => {
    if (!future.length) return;
    capturePositions();
    dispatch({
      type: 'REDO',
      futureTowers: future[0],
      nextFuture: future.slice(1),
    });
  };

  const applyMove = (from: number, to: number) => {
    dispatch({ type: 'APPLY_MOVE', from, to });
  };

  const startAutoSolve = () => {
    stopAutoSolve();
    const solution = generateMoves(diskCount, 0, 2, 1);
    setAutoPlaying(true);
    const play = (i: number) => {
      if (i >= solution.length) {
        setAutoPlaying(false);
        return;
      }
      autoTimer.current = setTimeout(() => {
        const [from, to] = solution[i];
        applyMove(from, to);
        play(i + 1);
      }, 500);
    };
    play(0);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (autoPlaying) return;
    if (e.key >= '1' && e.key <= '3') handleTowerClick(Number(e.key) - 1);
    if (e.key === 'u') undo();
    if (e.key === 'r') redo();
    if (e.key === 'a') startAutoSolve();
  };

  const isValidTarget = (i: number) =>
    selectedTower !== null && canDrop(selectedTower, i, towers);
  return (
    <ModalWrapper onClose={onClose} title="Towers of Hanoi" size="max-w-2xl">
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="outline-none">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-4 text-sm">
            <span>
              Moves: <strong>{moves}</strong>
            </span>
            <span>
              Optimal: <strong>{optimalMoves}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>Disks</span>
            <input
              type="range"
              min={MIN_DISKS}
              max={MAX_DISKS}
              value={diskCount}
              onChange={(e) => resetGame(Number(e.target.value))}
              className="range range-primary range-xs w-28"
              disabled={autoPlaying}
            />
            <span className="font-normal">{diskCount}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {towers.map((tower, i) => (
            <div
              key={i}
              ref={(el) => {
                towerRefs.current[i] = el;
              }}
              onClick={() => handleTowerClick(i)}
              className="relative flex h-48 cursor-pointer flex-col-reverse items-center transition-all">
              <div
                className={`absolute bottom-2 h-full w-2 rounded transition-all ${selectedTower === i ? 'bg-primary shadow-[0_0_12px_theme(colors.primary)]' : isValidTarget(i) ? 'bg-success/70 shadow-[0_0_12px_theme(colors.success)]' : 'bg-base-300'}`}
              />
              {tower.map((disk) => {
                const lifted = selectedTower === i && disk === tower.at(-1);
                return (
                  <div
                    key={disk}
                    ref={(el) => {
                      if (!el) diskRefs.current.delete(disk);
                      else diskRefs.current.set(disk, el);
                    }}
                    className={`rounded-box relative mb-1.5 h-7 bg-gradient-to-r ${DISK_GRADIENTS[disk]} transition-transform ${lifted ? 'z-10 -translate-y-5 scale-105 shadow-xl' : ''}`}
                    style={{ width: `${disk * 36}px` }}>
                    <span
                      className={`absolute inset-0 flex items-center justify-center text-xs font-extrabold ${DISK_TEXT[disk]}`}>
                      {disk}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {isWin && (
          <div className="alert alert-success my-3 justify-center py-2 text-sm">
            Solved in {moves} moves!
          </div>
        )}
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <button
            className="btn btn-sm"
            onClick={undo}
            disabled={autoPlaying || !history.length}>
            Undo
          </button>
          <button
            className="btn btn-sm"
            onClick={redo}
            disabled={autoPlaying || !future.length}>
            Redo
          </button>
          <button
            className="btn btn-sm btn-secondary"
            onClick={startAutoSolve}
            disabled={autoPlaying || isWin}>
            Auto Solve
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => resetGame()}
            disabled={autoPlaying}>
            Reset
          </button>
        </div>
        <p className="mt-3 text-center text-xs opacity-40">
          1 / 2 / 3 select tower · U undo · R redo · A auto solve · Esc close
        </p>
      </div>
    </ModalWrapper>
  );
};
TowersModal.displayName = 'TowersModal';
