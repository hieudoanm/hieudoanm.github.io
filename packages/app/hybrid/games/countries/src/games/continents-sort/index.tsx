'use client';

import type { DragEvent, FC } from 'react';
import { useContinentsSort } from './useContinentsSort';
import { REGIONS } from './utils';

const REGION_COLORS: Record<
  string,
  { border: string; bg: string; text: string }
> = {
  Africa: {
    border: 'border-amber-500',
    bg: 'bg-amber-500/10',
    text: 'text-amber-600',
  },
  Europe: {
    border: 'border-blue-500',
    bg: 'bg-blue-500/10',
    text: 'text-blue-600',
  },
  Asia: { border: 'border-red-500', bg: 'bg-red-500/10', text: 'text-red-600' },
  Oceania: {
    border: 'border-teal-500',
    bg: 'bg-teal-500/10',
    text: 'text-teal-600',
  },
  Americas: {
    border: 'border-green-500',
    bg: 'bg-green-500/10',
    text: 'text-green-600',
  },
};

export const ContinentsSort: FC = () => {
  const {
    cards,
    buckets,
    dragging,
    message,
    score,
    mistakes,
    gameOver,
    unplaced,
    placedCount,
    startDrag,
    endDrag,
    drop,
    reset,
  } = useContinentsSort();

  const onBucketDrop =
    (region: string) => (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      drop(region as never);
    };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3 p-4">
      <div className="flex items-center justify-between text-sm">
        <span>
          Placed:{' '}
          <strong>
            {placedCount} / {cards.length}
          </strong>
        </span>
        <span className="opacity-60">
          Score: <strong>{score}</strong> · Mistakes:{' '}
          <strong>{mistakes}</strong>
        </span>
      </div>

      {message ? (
        <div
          className={`text-center text-xs font-bold ${message.correct ? 'text-success' : 'text-error'}`}
          role="status"
          data-testid="sort-message">
          {message.text}
        </div>
      ) : null}

      <div className="grid grid-cols-5 gap-2" data-testid="sort-buckets">
        {REGIONS.map((region) => {
          const color = REGION_COLORS[region];
          return (
            <div
              key={region}
              onDragOver={(event) => event.preventDefault()}
              onDrop={onBucketDrop(region)}
              onClick={() => drop(region)}
              data-testid={`sort-bucket-${region}`}
              className={`flex min-h-[120px] cursor-pointer flex-col rounded-xl border-2 border-dashed p-2 transition-colors ${color.border} ${color.bg}`}>
              <span
                className={`mb-1 text-center text-[10px] font-bold tracking-wider uppercase ${color.text}`}>
                {region}
              </span>
              <div className="flex flex-1 flex-col gap-1">
                {buckets[region].map((name) => {
                  const card = cards.find(
                    (candidate) => candidate.name === name
                  );
                  const isWrong = card && card.correctRegion !== region;
                  return (
                    <div
                      key={name}
                      className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] ${isWrong ? 'bg-error/20 line-through' : 'bg-success/20'}`}>
                      <span>{card?.flag}</span>
                      <span className="truncate">{name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {gameOver ? (
        <div
          className="flex flex-col items-center gap-2"
          data-testid="sort-over">
          <p
            className={`text-sm font-bold ${mistakes === 0 ? 'text-success' : 'text-error'}`}>
            {mistakes === 0
              ? 'Perfect! All correct!'
              : `Done — ${score}/${cards.length} correct`}
          </p>
          <button
            type="button"
            onClick={reset}
            className="btn btn-accent btn-sm w-full"
            data-testid="sort-reset">
            New Game
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5" data-testid="sort-pool">
          {unplaced.map((card) => (
            <button
              key={card.name}
              type="button"
              draggable
              onDragStart={() => startDrag(card.name)}
              onDragEnd={endDrag}
              onClick={() =>
                dragging === card.name ? endDrag() : startDrag(card.name)
              }
              data-testid={`sort-card-${card.name}`}
              className={`btn btn-outline btn-sm cursor-grab gap-1.5 text-xs active:cursor-grabbing ${
                dragging === card.name ? 'opacity-40' : ''
              }`}>
              <span>{card.flag}</span>
              <span>{card.name}</span>
            </button>
          ))}
        </div>
      )}

      <p className="text-center text-xs opacity-40">
        Tap a country then its continent · or drag &amp; drop
      </p>
    </div>
  );
};
