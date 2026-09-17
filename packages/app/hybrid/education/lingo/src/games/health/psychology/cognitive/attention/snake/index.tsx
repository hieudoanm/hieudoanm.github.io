'use client';

import type { FC } from 'react';
import { useEffect } from 'react';

import { GRID } from './constants';
import { useSnake } from './useSnake';

const CELL_STYLE: Record<string, string> = {
  empty: 'bg-base-200',
  snake: 'bg-base-content/60',
  head: 'bg-primary',
  food: 'bg-error',
};

export const Snake: FC = () => {
  const {
    containerRef,
    board,
    score,
    best,
    status,
    paused,
    speed,
    label,
    start,
    togglePause,
    handleSpeed,
    onKeyDown,
    speeds,
  } = useSnake();

  useEffect(() => {
    containerRef.current?.focus();
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="flex flex-1 flex-col gap-3 outline-none">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex gap-3">
          <span>
            Score: <strong>{score}</strong>
          </span>
          <span>
            Best: <strong>{best}</strong>
          </span>
          <span>
            Load: <strong>{label}</strong>
          </span>
        </div>
        <span className="opacity-60">
          {board.filled}/{GRID * GRID} filled
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div
          role="grid"
          aria-label="Snake board"
          className="grid w-full max-w-[340px] gap-px select-none"
          style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)` }}>
          {board.cells.flat().map((cell, index) => (
            <div
              key={index}
              role="gridcell"
              aria-label={cell}
              className={`aspect-square rounded-sm ${CELL_STYLE[cell]}`}
            />
          ))}
        </div>
      </div>

      {status === 'over' && (
        <div className="alert alert-warning justify-center py-2 text-sm">
          Hit the wall or yourself at {score} — inhibition failed under load.
        </div>
      )}

      {status === 'won' && (
        <div className="alert alert-success justify-center py-2 text-sm">
          Board filled at {score}. Clean sustained attention.
        </div>
      )}

      {status === 'running' && paused && (
        <p className="text-center text-xs opacity-60">
          Ready. Start and hold the line as the speed climbs.
        </p>
      )}

      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="opacity-60">Speed</span>
        <input
          type="range"
          min={1}
          max={5}
          value={speed}
          onChange={(event) => handleSpeed(Number(event.target.value))}
          aria-label="Speed"
          className="range range-primary range-xs w-28"
        />
        <div className="join">
          {speeds.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => handleSpeed(level)}
              className={`btn join-item btn-xs ${
                level === speed ? 'btn-primary' : 'btn-ghost'
              }`}>
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={togglePause}
          disabled={status !== 'running'}
          className="btn btn-primary btn-sm">
          {paused ? 'Start' : 'Pause'}
        </button>
        <button type="button" onClick={start} className="btn btn-ghost btn-sm">
          New game
        </button>
      </div>

      <p className="text-center text-xs opacity-50">
        Arrows or WASD to turn · Space to pause · R to restart
      </p>
    </div>
  );
};

Snake.displayName = 'Snake';
