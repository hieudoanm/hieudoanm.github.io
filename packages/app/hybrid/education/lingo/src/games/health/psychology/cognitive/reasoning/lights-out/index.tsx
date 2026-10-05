'use client';

import type { FC } from 'react';

import { DIFFICULTY_STEPS } from './constants';
import { useLightsOut } from './useLightsOut';

export const LightsOut: FC = () => {
  const {
    board,
    moves,
    par,
    lit,
    size,
    solved,
    autoSolving,
    handleClick,
    toggleAutoSolve,
    newGame,
  } = useLightsOut();

  const onDifficultyChange = (next: (typeof DIFFICULTY_STEPS)[number]) =>
    newGame(next.size, next.moves);

  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex gap-3">
          <span>
            Moves: <strong>{moves}</strong>
          </span>
          <span>
            Par: <strong>{par}</strong>
          </span>
          <span>
            Lit: <strong>{lit}</strong>
          </span>
        </div>
        <div className="join">
          {DIFFICULTY_STEPS.map((step) => (
            <button
              key={step.size}
              type="button"
              onClick={() => onDifficultyChange(step)}
              disabled={autoSolving}
              aria-pressed={step.size === size}
              className={`btn join-item btn-xs ${
                step.size === size ? 'btn-primary' : 'btn-ghost'
              }`}>
              {step.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div
          role="grid"
          aria-label="Lights Out board"
          className="bg-base-300 grid w-full max-w-[300px] gap-2 rounded-lg p-2 select-none"
          style={{
            aspectRatio: '1',
            gridTemplateColumns: `repeat(${size}, 1fr)`,
          }}>
          {board.flatMap((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                type="button"
                role="gridcell"
                aria-label={`Row ${r + 1} column ${c + 1}, ${cell ? 'lit' : 'dark'}`}
                onClick={() => handleClick(r, c)}
                className={`aspect-square cursor-pointer rounded-lg transition-all duration-150 ${
                  cell
                    ? 'shadow-[0_0_12px_theme(colors.warning)] bg-warning'
                    : 'bg-base-100 hover:bg-base-200'
                } ${autoSolving ? 'pointer-events-none' : 'active:scale-95'}`}
              />
            ))
          )}
        </div>
      </div>

      {solved && (
        <div className="alert alert-success justify-center py-2 text-sm">
          {moves <= par
            ? `Solved in ${moves} moves — at or under par.`
            : `Solved in ${moves} moves against par ${par}.`}
        </div>
      )}

      {!solved && !autoSolving && (
        <p className="text-center text-xs opacity-60">
          Each press flips that cell and its orthogonal neighbours. Plan the
          order rather than exploring.
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={toggleAutoSolve}
          disabled={solved}
          className="btn btn-ghost btn-sm">
          {autoSolving ? 'Stop' : 'Show solution'}
        </button>
        <button
          type="button"
          onClick={() => newGame()}
          disabled={autoSolving}
          className="btn btn-primary btn-sm">
          New puzzle
        </button>
      </div>
    </div>
  );
};

LightsOut.displayName = 'LightsOut';
