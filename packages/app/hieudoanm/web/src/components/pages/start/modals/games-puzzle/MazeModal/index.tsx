import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

import {
  DEFAULT_SIZE,
  MIN_SIZE,
  MAX_SIZE,
  CELL_SIZE,
  WALL_THICKNESS,
} from './constants';
import { Cell } from './types';
import { generateMaze, solveMaze } from './maze';

export const MazeModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [grid, setGrid] = useState<Cell[][]>(() => generateMaze(size, size));
  const [path, setPath] = useState<{ row: number; col: number }[] | null>(null);
  const [solving, setSolving] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const pathSet = new Set(path?.map((p) => `${p.row},${p.col}`));

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * CELL_SIZE + WALL_THICKNESS / 2;
        const y = r * CELL_SIZE + WALL_THICKNESS / 2;

        if (pathSet.has(`${r},${c}`)) {
          ctx.fillStyle = '#22c55e';
          ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        } else if (r === 0 && c === 0) {
          ctx.fillStyle = '#3b82f6';
          ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        } else if (r === rows - 1 && c === cols - 1) {
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        } else {
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        }

        const cell = grid[r]?.[c];
        if (!cell) continue;
        ctx.strokeStyle = '#475569';
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
        onClose();
        return;
      }
      if (e.key === 'r') {
        regenerate();
      }
      if (e.key === 's' && !solving) {
        startSolve();
      }
    },
    [onClose, regenerate, startSolve, solving]
  );

  return (
    <ModalWrapper onClose={onClose} title="Maze" size="max-w-sm">
      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex flex-col gap-3 outline-none">
        <div className="flex items-center justify-between text-sm">
          <span className="opacity-50">
            Size: {size}×{size}
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

        <div className="flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            className="rounded-lg"
          />
        </div>

        <div className="flex justify-center gap-2">
          <button onClick={regenerate} className="btn btn-primary btn-sm">
            New Maze
          </button>
          <button
            onClick={startSolve}
            disabled={solving}
            className="btn btn-secondary btn-sm">
            {solving ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              'Solve'
            )}
          </button>
        </div>

        <p className="text-center text-xs opacity-40">
          R new · S solve · Esc close
        </p>
      </div>
    </ModalWrapper>
  );
};
MazeModal.displayName = 'MazeModal';
