'use client';

import { useReverse } from './useReverse';

const MARK_COLOR: Record<string, string> = {
  X: 'text-info',
  O: 'text-error',
};

export const Reverse = () => {
  const { board, moves, current, loser, draw, play, undo, reset } =
    useReverse();
  const isDraw = draw && !loser;

  return (
    <div className="mx-auto w-full max-w-md">
      <p className="mb-4 text-xs opacity-70">
        Misere tic-tac-toe. Complete a row of <strong>3</strong> and you{' '}
        <em>lose</em>!
      </p>

      <div className="mb-4 grid grid-cols-3 gap-2">
        {board.map((value, i) => (
          <button
            key={`reverse-${i}`}
            type="button"
            data-testid={`cell-${i}`}
            onClick={() => play(i)}
            className={`btn btn-square h-full w-full text-6xl ${
              loser?.cells.includes(i) ? 'btn-error' : 'btn-neutral'
            } ${value ? MARK_COLOR[value] : ''}`}>
            {value}
          </button>
        ))}
      </div>

      <div
        className="mb-2 flex items-center justify-between text-sm"
        data-testid="status">
        {loser ? (
          <span className="text-error font-normal">
            {loser.player} loses with 3 in a row!
          </span>
        ) : isDraw ? (
          <span className="text-warning font-normal">Draw! Nobody lost.</span>
        ) : (
          <span>
            Current: <span className="text-info font-normal">{current}</span>
          </span>
        )}
      </div>

      <div className="mb-2 text-xs opacity-70" data-testid="moves">
        X moves:{' '}
        {moves
          .filter((m) => m.player === 'X')
          .map((m) => m.idx)
          .join(', ') || '—'}
        <br />O moves:{' '}
        {moves
          .filter((m) => m.player === 'O')
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
