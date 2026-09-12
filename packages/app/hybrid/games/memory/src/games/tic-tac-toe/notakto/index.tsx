'use client';

import { useNotakto } from './useNotakto';

export const Notakto = () => {
  const { board, moves, current, loserCells, draw, play, undo, reset } =
    useNotakto();
  const isDraw = draw && !loserCells;

  return (
    <div className="mx-auto w-full max-w-md">
      <p className="mb-4 text-xs opacity-70">
        Players alternate placing <strong>X</strong> marks. Complete a row of 3
        and you <em>lose</em>!
      </p>

      <div className="mb-4 grid grid-cols-3 gap-2">
        {board.map((cell, i) => {
          const isLosingCell = loserCells?.includes(i);
          const owner = moves.findIndex((m) => m.idx === i);
          const textColor =
            cell === 'X' ? (owner % 2 === 0 ? 'text-info' : 'text-error') : '';
          return (
            <button
              key={`notakto-${i}`}
              type="button"
              data-testid={`cell-${i}`}
              onClick={() => play(i)}
              className={`btn btn-square h-full w-full text-6xl ${
                isLosingCell ? 'btn-error' : 'btn-neutral'
              } ${textColor}`}>
              {cell}
            </button>
          );
        })}
      </div>

      <div
        className="mb-2 flex items-center justify-between text-sm"
        data-testid="status">
        {loserCells ? (
          <span className="text-error font-normal">
            Player {current} loses!
          </span>
        ) : isDraw ? (
          <span className="text-warning font-normal">
            Draw! All boards full.
          </span>
        ) : (
          <span>
            Player{' '}
            <span
              className={
                current === 1
                  ? 'text-info font-normal'
                  : 'text-error font-normal'
              }>
              {current}
            </span>{' '}
            &apos;s turn
          </span>
        )}
      </div>

      <div className="mb-2 text-xs opacity-70" data-testid="moves">
        Player 1:{' '}
        {moves
          .filter((_, i) => i % 2 === 0)
          .map((m) => m.idx)
          .join(', ') || '—'}
        <br />
        Player 2:{' '}
        {moves
          .filter((_, i) => i % 2 === 1)
          .map((m) => m.idx)
          .join(', ') || '—'}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={reset}
          className="btn btn-primary btn-sm"
          data-testid="reset">
          Reset
        </button>
        <button
          type="button"
          onClick={undo}
          disabled={moves.length === 0}
          className="btn btn-secondary btn-sm"
          data-testid="undo">
          Undo
        </button>
      </div>
    </div>
  );
};
