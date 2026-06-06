import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

const SIZE = 4;

type Grid = number[][];
type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const empty = (): Grid =>
  Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

const clone = (g: Grid): Grid => g.map((r) => [...r]);

const randomEmpty = (g: Grid): [number, number] | null => {
  const cells: [number, number][] = [];
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) if (g[r][c] === 0) cells.push([r, c]);
  if (cells.length === 0) return null;
  return cells[Math.floor(Math.random() * cells.length)];
};

const spawn = (g: Grid): Grid => {
  const cell = randomEmpty(g);
  if (!cell) return g;
  const [r, c] = cell;
  const next = clone(g);
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
};

const init = (): Grid => spawn(spawn(empty()));

const slideRow = (row: number[]): { row: number[]; score: number } => {
  const filtered = row.filter((v) => v !== 0);
  const result: number[] = [];
  let score = 0;
  let i = 0;
  while (i < filtered.length) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      result.push(filtered[i] * 2);
      score += filtered[i] * 2;
      i += 2;
    } else {
      result.push(filtered[i]);
      i++;
    }
  }
  while (result.length < SIZE) result.push(0);
  return { row: result, score };
};

const move = (
  g: Grid,
  dir: Dir
): { grid: Grid; score: number; moved: boolean } => {
  const rotated = dir === 'UP' || dir === 'DOWN';
  const reverse = dir === 'DOWN' || dir === 'RIGHT';

  const rows: number[][] = [];
  for (let i = 0; i < SIZE; i++) {
    let row: number[];
    if (rotated) {
      row = [];
      for (let j = 0; j < SIZE; j++) row.push(g[j][i]);
    } else {
      row = [...g[i]];
    }
    if (reverse) row.reverse();
    rows.push(row);
  }

  let totalScore = 0;
  const slid = rows.map((r) => {
    const { row, score } = slideRow(r);
    totalScore += score;
    return reverse ? row.reverse() : row;
  });

  const result = clone(g);
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (rotated) result[j][i] = slid[i][j];
      else result[i][j] = slid[i][j];
    }
  }

  const moved = JSON.stringify(result) !== JSON.stringify(g);
  return { grid: result, score: totalScore, moved };
};

const canMove = (g: Grid): boolean => {
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) {
      if (g[r][c] === 0) return true;
      if (c + 1 < SIZE && g[r][c] === g[r][c + 1]) return true;
      if (r + 1 < SIZE && g[r][c] === g[r + 1][c]) return true;
    }
  return false;
};

const TILE_COLORS: Record<number, string> = {
  0: 'bg-base-200/30',
  2: 'bg-amber-50 text-amber-900',
  4: 'bg-amber-100 text-amber-900',
  8: 'bg-orange-400 text-white',
  16: 'bg-orange-500 text-white',
  32: 'bg-orange-600 text-white',
  64: 'bg-red-500 text-white',
  128: 'bg-yellow-300 text-yellow-900',
  256: 'bg-yellow-400 text-yellow-900',
  512: 'bg-yellow-500 text-white',
  1024: 'bg-yellow-600 text-white',
  2048: 'bg-yellow-700 text-white',
};

const TILE_FONT: Record<number, string> = {
  0: '',
  2: 'text-lg',
  4: 'text-lg',
  8: 'text-lg',
  16: 'text-base',
  32: 'text-base',
  64: 'text-base',
  128: 'text-sm',
  256: 'text-sm',
  512: 'text-sm',
  1024: 'text-xs',
  2048: 'text-xs',
};

export const Game2048Modal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [grid, setGrid] = useState<Grid>(init);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (dir: Dir) => {
      if (gameOver || won) return;
      setGrid((prev) => {
        const { grid: next, score: add, moved } = move(prev, dir);
        if (!moved) return prev;
        const withTile = spawn(next);
        setScore((s) => {
          const ns = s + add;
          setBest((b) => Math.max(b, ns));
          return ns;
        });
        if (withTile.flat().includes(2048)) setWon(true);
        if (!canMove(withTile)) setGameOver(true);
        return withTile;
      });
    },
    [gameOver, won]
  );

  const reset = useCallback(() => {
    setGrid(init());
    setScore(0);
    setGameOver(false);
    setWon(false);
    containerRef.current?.focus();
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'r') {
        reset();
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleMove('UP');
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleMove('DOWN');
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleMove('LEFT');
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleMove('RIGHT');
      }
    },
    [onClose, handleMove, reset]
  );

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <ModalWrapper onClose={onClose} title="2048" size="max-w-sm" fullHeight>
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 outline-none">
        {/* Score */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex gap-4">
            <span>
              Score: <strong>{score}</strong>
            </span>
            <span className="opacity-60">
              Best: <strong>{best}</strong>
            </span>
          </div>
          <button onClick={reset} className="btn btn-primary btn-xs">
            New
          </button>
        </div>

        {/* Grid */}
        <div className="flex flex-1 items-center justify-center">
          <div
            className="bg-base-300 grid gap-1.5 rounded-lg p-1.5 select-none"
            style={{
              gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))`,
              width: '100%',
              maxWidth: '300px',
              aspectRatio: '1',
            }}>
            {grid.flat().map((val, i) => (
              <div
                key={i}
                className={`flex items-center justify-center rounded-md font-black transition-all ${
                  TILE_COLORS[val] || 'bg-amber-800 text-white'
                } ${TILE_FONT[val] || 'text-xs'}`}
                style={{ aspectRatio: '1' }}>
                {val !== 0 ? val : ''}
              </div>
            ))}
          </div>
        </div>

        {won && (
          <div className="alert alert-success justify-center py-2 text-sm">
            You reached 2048! Keep going or start a new game.
          </div>
        )}

        {gameOver && (
          <div className="alert alert-error justify-center py-2 text-sm">
            Game Over — Score: {score}
          </div>
        )}

        {/* D-pad for mobile */}
        <div className="grid grid-cols-3 gap-1 self-center">
          <div />
          <button
            onClick={() => handleMove('UP')}
            className="btn btn-outline btn-sm"
            disabled={gameOver || won}>
            ▲
          </button>
          <div />
          <button
            onClick={() => handleMove('LEFT')}
            className="btn btn-outline btn-sm"
            disabled={gameOver || won}>
            ◀
          </button>
          <button
            onClick={() => handleMove('DOWN')}
            className="btn btn-outline btn-sm"
            disabled={gameOver || won}>
            ▼
          </button>
          <button
            onClick={() => handleMove('RIGHT')}
            className="btn btn-outline btn-sm"
            disabled={gameOver || won}>
            ▶
          </button>
        </div>

        <p className="text-center text-xs opacity-40">
          Arrow keys move · R reset · Esc close
        </p>
      </div>
    </ModalWrapper>
  );
};
