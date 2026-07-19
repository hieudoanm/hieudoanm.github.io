'use client';

import { FC } from 'react';

import { COL_OPTIONS, ROW_OPTIONS } from './constants';
import { EMOJI_CATEGORIES, formatTime } from './utils';
import { useMemoryMatch } from './useMemoryMatch';

export const MemoryMatch: FC = () => {
  const {
    cards,
    rows,
    cols,
    movesCount,
    matchedPairs,
    totalPairs,
    timer,
    won,
    category,
    handleCardClick,
    handleRowChange,
    handleColChange,
    handleCategoryChange,
    newGame,
  } = useMemoryMatch();

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex gap-3">
          <span>
            Moves: <strong>{movesCount}</strong>
          </span>
          <span>
            Timer: <strong>{formatTime(timer)}</strong>
          </span>
          <span>
            Pairs:{' '}
            <strong>
              {matchedPairs}/{totalPairs}
            </strong>
          </span>
        </div>
        <button className="btn btn-primary btn-xs" onClick={newGame}>
          New
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span>Category:</span>
        {EMOJI_CATEGORIES.map((name) => (
          <button
            key={name}
            onClick={() => handleCategoryChange(name)}
            className={`btn btn-xs ${name === category ? 'btn-primary' : 'btn-ghost'}`}>
            {name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 text-xs">
        <span>Grid:</span>
        <label className="flex items-center gap-1">
          <span className="opacity-60">Rows</span>
          <select
            value={rows}
            onChange={(event) => handleRowChange(Number(event.target.value))}
            className="select select-bordered select-xs w-16">
            {ROW_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-1">
          <span className="opacity-60">Cols</span>
          <select
            value={cols}
            onChange={(event) => handleColChange(Number(event.target.value))}
            className="select select-bordered select-xs w-16">
            {COL_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div
          className="grid w-full max-w-[320px] gap-1.5 select-none"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {cards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => handleCardClick(card.id)}
              className={[
                'flex aspect-square cursor-pointer items-center justify-center rounded-lg text-2xl',
                'transition-all duration-200',
                card.matched
                  ? 'bg-success/20 opacity-60'
                  : card.flipped
                    ? 'bg-base-200 scale-100'
                    : 'bg-primary/20 hover:bg-primary/30 active:scale-95',
              ].join(' ')}>
              {card.flipped || card.matched ? card.emoji : ''}
            </button>
          ))}
        </div>
      </div>

      {won && (
        <div className="alert alert-success justify-center py-2 text-sm">
          Solved in {movesCount} moves ({formatTime(timer)})!
        </div>
      )}
    </div>
  );
};

MemoryMatch.displayName = 'MemoryMatch';
