import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GameInstructions } from '../_shared/GameInstructions';
import { GAME_DATA } from '../_shared/gameData';
import {
  DEFAULT_SIZE,
  MIN_SIZE,
  MAX_SIZE,
  CELL_SIZE,
  WALL_THICKNESS,
} from './constants';
import { Cell } from './types';
import { generateMaze, solveMaze } from './maze';

export const Maze: FC = () => {
  const router = useRouter();
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [grid, setGrid] = useState<Cell[][]>(() => generateMaze(size, size));
  const [path, setPath] = useState<{ row: number; col: number }[] | null>(null);
  const [solving, setSolving] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const data = GAME_DATA.maze;

  const rows = size;
  const cols = size;

  const canvasWidth = cols * CELL_SIZE + WALL_THICKNESS;
  const canvasHeight = rows * CELL_SIZE + WALL_THICKNESS;

  const regenerate = useCallback(() => {
    setGrid(generateMaze(size, size));
    setPath(null);
    setSolving(false);
  }, [size]);

  const startSolve = useCallback(() => {
    setSolving(true);
    const found = solveMaze(
      grid,
      { row: 0, col: 0 },
      { row: rows - 1, col: cols - 1 }
    );
    if (found) {
      const delay = 600 / size;
      found.forEach((pos, i) => {
        setTimeout(() => {
          setPath((prev) => [...(prev || []), pos]);
        }, i * delay);
      });
      setTimeout(() => setSolving(false), found.length * delay);
    }
  }, [grid, rows, cols, size]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const pathSet = new Set(path?.map((p) => `${p.row},${p.col}`));

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * CELL_SIZE + WALL_THICKNESS / 2;
        const y = r * CELL_SIZE + WALL_THICKNESS / 2;

        if (pathSet.has(`${r},${c}`)) {
          ctx.fillStyle = '#f5f5f5';
          ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        } else if (r === 0 && c === 0) {
          ctx.fillStyle = '#ff0030';
          ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        } else if (r === rows - 1 && c === cols - 1) {
          ctx.fillStyle = '#ff0030';
          ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        } else {
          ctx.fillStyle = '#0a0a0a';
          ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        }

        const cell = grid[r]?.[c];
        if (!cell) continue;
        ctx.strokeStyle = '#f5f5f5';
        ctx.lineWidth = WALL_THICKNESS;

        if (cell.walls.top) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + CELL_SIZE, y);
          ctx.stroke();
        }
        if (cell.walls.right) {
          ctx.beginPath();
          ctx.moveTo(x + CELL_SIZE, y);
          ctx.lineTo(x + CELL_SIZE, y + CELL_SIZE);
          ctx.stroke();
        }
        if (cell.walls.bottom) {
          ctx.beginPath();
          ctx.moveTo(x, y + CELL_SIZE);
          ctx.lineTo(x + CELL_SIZE, y + CELL_SIZE);
          ctx.stroke();
        }
        if (cell.walls.left) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + CELL_SIZE);
          ctx.stroke();
        }
      }
    }
  }, [grid, path, rows, cols, canvasWidth, canvasHeight]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.push('/');
        return;
      }
      if (e.key === 'r') {
        regenerate();
      }
      if (e.key === 's' && !solving) {
        startSolve();
      }
    },
    [router, regenerate, startSolve, solving]
  );

  return (
    <>
      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex flex-1 flex-col gap-3 overflow-y-auto p-4 outline-none">
        <div className="flex items-center justify-between text-[8px]">
          <span className="text-base-content/40">
            SIZE: {size}x{size}
          </span>
          <input
            type="range"
            min={MIN_SIZE}
            max={MAX_SIZE}
            value={size}
            onChange={(e) => {
              setSize(Number(e.target.value));
              setPath(null);
            }}
            className="range range-primary range-xs w-28"
          />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            className="border-base-content/20 border"
          />
        </div>

        <div className="flex justify-center gap-2">
          <button
            onClick={regenerate}
            className="bg-primary text-primary-content hover:bg-primary/80 px-3 py-1 text-[8px] font-bold transition-colors">
            NEW MAZE
          </button>
          <button
            onClick={startSolve}
            disabled={solving}
            className="border-base-content/30 text-base-content hover:bg-base-content/10 border px-3 py-1 text-[8px] font-bold transition-colors disabled:opacity-40">
            {solving ? '...' : 'SOLVE'}
          </button>
          <button
            className="text-base-content/40 hover:text-primary px-3 py-1 text-[8px] transition-colors"
            onClick={() => setHelpOpen(true)}>
            HELP
          </button>
        </div>

        <p className="text-base-content/30 text-center text-[8px]">
          R NEW / S SOLVE / ESC BACK
        </p>
      </div>

      <GameInstructions
        isOpen={helpOpen}
        onClose={() => setHelpOpen(false)}
        title={data.title}
        subtitle={data.subtitle}
        instructions={data.instructions}
        visualization={data.visualization}
      />
    </>
  );
};
Maze.displayName = 'Maze';
