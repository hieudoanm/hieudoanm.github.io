'use client';

import type { FC, KeyboardEvent } from 'react';
import { useEffect, useRef } from 'react';

import {
  DISK_GRADIENTS,
  DISK_HEIGHT,
  DISK_TEXT,
  DISK_WIDTH_PER_UNIT,
  MAX_DISKS,
  MIN_DISKS,
  TOWER_HEIGHT,
} from './constants';
import { useTowers } from './useTowers';

export const Towers: FC = () => {
  const {
    towers,
    selected,
    moves,
    par,
    won,
    diskCount,
    shakeTower,
    autoPlaying,
    canUndo,
    canRedo,
    select,
    isTarget,
    reset,
    undo,
    redo,
    startAutoSolve,
    stopAutoSolve,
  } = useTowers();

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => containerRef.current?.focus(), []);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key >= '1' && event.key <= '3') select(Number(event.key) - 1);
    if (event.key === 'u') undo();
    if (event.key === 'r') redo();
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="flex flex-1 flex-col outline-none">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex gap-4">
          <span>
            Moves: <strong>{moves}</strong>
          </span>
          <span>
            Optimal: <strong>{par}</strong>
          </span>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <span>Disks</span>
          <input
            type="range"
            min={MIN_DISKS}
            max={MAX_DISKS}
            value={diskCount}
            onChange={(event) => reset(Number(event.target.value))}
            aria-label="Disk count"
            className="range range-primary range-xs w-28"
            disabled={autoPlaying}
          />
          <strong>{diskCount}</strong>
        </label>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {towers.map((tower, index) => {
          const top = tower.at(-1);
          return (
            <button
              key={index}
              type="button"
              onClick={() => select(index)}
              aria-label={`Peg ${index + 1}, ${tower.length} disks`}
              className={`flex flex-col-reverse items-center justify-end rounded-lg p-1 transition-all ${
                shakeTower === index ? 'animate-pulse' : ''
              }`}
              style={{ height: TOWER_HEIGHT }}>
              {tower.map((disk) => (
                <span
                  key={disk}
                  className={`rounded-box relative mb-1.5 bg-gradient-to-r ${DISK_GRADIENTS[disk]} transition-transform ${
                    selected === index && disk === top
                      ? 'z-10 -translate-y-1 scale-105 shadow-xl'
                      : ''
                  }`}
                  style={{
                    width: disk * DISK_WIDTH_PER_UNIT,
                    height: DISK_HEIGHT,
                  }}>
                  <span
                    className={`absolute inset-0 flex items-center justify-center text-xs font-extrabold ${DISK_TEXT[disk]}`}>
                    {disk}
                  </span>
                </span>
              ))}
              <span
                className={`absolute w-2 rounded transition-all ${
                  selected === index
                    ? 'bg-primary shadow-[0_0_12px_theme(colors.primary)]'
                    : isTarget(index)
                      ? 'bg-success/70 shadow-[0_0_12px_theme(colors.success)]'
                      : 'bg-base-300'
                }`}
                style={{ height: TOWER_HEIGHT - 16 }}
              />
            </button>
          );
        })}
      </div>

      {won && (
        <div className="alert alert-success my-3 justify-center py-2 text-sm">
          Solved in {moves} moves against an optimum of {par}.
        </div>
      )}

      <div className="mt-3 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={undo}
          disabled={autoPlaying || !canUndo}
          className="btn btn-sm">
          Undo
        </button>
        <button
          type="button"
          onClick={redo}
          disabled={autoPlaying || !canRedo}
          className="btn btn-sm">
          Redo
        </button>
        <button
          type="button"
          onClick={autoPlaying ? stopAutoSolve : startAutoSolve}
          disabled={!autoPlaying && won}
          className="btn btn-secondary btn-sm">
          {autoPlaying ? 'Stop' : 'Show solution'}
        </button>
        <button
          type="button"
          onClick={() => reset(diskCount)}
          disabled={autoPlaying}
          className="btn btn-primary btn-sm">
          Reset
        </button>
      </div>

      <p className="mt-3 text-center text-xs opacity-50">
        1 / 2 / 3 select peg · U undo · R redo
      </p>
    </div>
  );
};

Towers.displayName = 'Towers';
