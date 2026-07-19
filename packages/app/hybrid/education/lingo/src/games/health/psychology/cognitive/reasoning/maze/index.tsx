'use client';

import type { CSSProperties, FC, KeyboardEvent } from 'react';
import { useEffect, useRef } from 'react';

import { CELL_SIZE, MAX_SIZE, MIN_SIZE, WALL_THICKNESS } from './constants';
import { useMaze } from './useMaze';

const ENDPOINT = 'bg-primary/60';

export const Maze: FC = () => {
  const {
    grid,
    size,
    start,
    end,
    path,
    revealed,
    solving,
    solved,
    newMaze,
    toggleSolve,
  } = useMaze();

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => containerRef.current?.focus(), []);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'r' || event.key === 'R') newMaze();
    if (event.key === 's' || event.key === 'S') toggleSolve();
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="flex flex-1 flex-col gap-3 outline-none">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="opacity-60">
          {size}×{size} · shortest path {Math.max(0, path.length - 1)} steps
        </span>
        <label className="flex items-center gap-2">
          <span>Size</span>
          <input
            type="range"
            min={MIN_SIZE}
            max={MAX_SIZE}
            value={size}
            onChange={(event) => newMaze(Number(event.target.value))}
            aria-label="Maze size"
            className="range range-primary range-xs w-28"
            disabled={solving}
          />
          <strong>{size}</strong>
        </label>
      </div>

      <div className="flex flex-1 items-center justify-center overflow-auto">
        <div
          role="grid"
          aria-label="Maze"
          className="grid select-none"
          style={{
            gridTemplateColumns: `repeat(${size}, ${CELL_SIZE}px)`,
            gap: '1px',
          }}>
          {grid.flatMap((row) =>
            row.map((cell) => {
              const isStart = cell.row === start.row && cell.col === start.col;
              const isEnd = cell.row === end.row && cell.col === end.col;
              const pathIndex = path.findIndex(
                (pos) => pos.row === cell.row && pos.col === cell.col
              );
              const lit = pathIndex >= 0 && pathIndex < revealed;
              const style: CSSProperties = lit
                ? {
                    background: 'var(--color-primary)',
                    opacity: 1 - pathIndex / revealed,
                  }
                : {};

              return (
                <div
                  key={`${cell.row}-${cell.col}`}
                  role="gridcell"
                  aria-label={`Row ${cell.row + 1} column ${cell.col + 1}${
                    isStart ? ', start' : isEnd ? ', end' : ''
                  }${lit ? ', on path' : ''}`}
                  className={`bg-base-200 relative ${
                    isStart || isEnd ? ENDPOINT : ''
                  }`}
                  style={{
                    ...style,
                    borderTopWidth: cell.walls.top ? WALL_THICKNESS : 0,
                    borderRightWidth: cell.walls.right ? WALL_THICKNESS : 0,
                    borderBottomWidth: cell.walls.bottom ? WALL_THICKNESS : 0,
                    borderLeftWidth: cell.walls.left ? WALL_THICKNESS : 0,
                    borderColor: 'currentColor',
                  }}
                />
              );
            })
          )}
        </div>
      </div>

      {solved && (
        <div className="alert alert-success justify-center py-2 text-sm">
          Shortest path found in {path.length - 1} steps.
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={toggleSolve}
          className="btn btn-ghost btn-sm">
          {solving ? 'Stop' : 'Show shortest path'}
        </button>
        <button
          type="button"
          onClick={() => newMaze()}
          disabled={solving}
          className="btn btn-primary btn-sm">
          New maze
        </button>
      </div>

      <p className="text-center text-xs opacity-50">R new maze · S show path</p>
    </div>
  );
};

Maze.displayName = 'Maze';
