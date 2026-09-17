'use client';

import type { FC } from 'react';
import { useEffect, useRef } from 'react';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';
import { useDinoRun } from './useDinoRun';

export const DinoRun: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { canvasRef, phase, score, best, load, hop, start, onKeyDown } =
    useDinoRun();

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

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
        </div>
        <span>
          Attention load: <strong>{load}</strong>
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onClick={hop}
          className="border-base-content/20 w-full max-w-[320px] cursor-pointer rounded-lg border"
        />
      </div>

      {phase === 'idle' && (
        <p className="text-center text-xs opacity-60">
          Press space or tap the field to start. Hold attention as long as you
          can, then notice how the errors arrive.
        </p>
      )}

      {phase === 'over' && (
        <div className="alert alert-warning justify-center py-2 text-sm">
          Crashed at {score}. Vigilance decays with time on task — the errors
          arrive late, not early.
        </div>
      )}

      <div className="flex justify-center">
        <button
          type="button"
          onClick={phase === 'over' ? start : hop}
          className="btn btn-primary btn-sm">
          {phase === 'over' ? 'Run again' : 'Jump'}
        </button>
      </div>

      <p className="text-center text-xs opacity-50">
        Space / up to jump · R to restart
      </p>
    </div>
  );
};

DinoRun.displayName = 'DinoRun';
