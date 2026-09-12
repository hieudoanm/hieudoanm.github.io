'use client';

import { useT3 } from './useT3';
import { aboutToDisappear } from './utils';

const MARK_COLOR: Record<string, string> = {
  X: 'text-info',
  O: 'text-error',
};

export const T3 = () => {
  const { board, moves, history, current, winner, play, undo, reset } = useT3();
  const fading = aboutToDisappear(history, current);

  return (
    <div className="mx-auto w-full max-w-md">
      <p className="mb-4 text-xs opacity-70">
        Each player may have max <strong>3</strong> active marks. When placing
        the 4th, the <em>oldest</em> one disappears.
      </p>

      <div className="mb-4 grid grid-cols-3 gap-2">
        {board.map((value, i) => (
          <button
            key={`t3-${i}`}
            type="button"
            data-testid={`cell-${i}`}
            onClick={() => play(i)}
            className={`btn btn-square h-full w-full text-6xl ${
              winner?.cells.includes(i) ? 'btn-warning' : 'btn-neutral'
            } ${i === fading && !winner ? 'opacity-50' : ''} ${value ? MARK_COLOR[value] : ''}`}>
            {value}
          </button>
        ))}
      </div>

      <div
        className="mb-2 flex items-center justify-between text-sm"
        data-testid="status">
        {winner ? (
          <span className="text-warning font-normal">
            Winner: {winner.player}
          </span>
        ) : (
          <span>
            Current:{' '}
            <span
              className={
                current === 'X'
                  ? 'text-info font-normal'
                  : 'text-error font-normal'
              }>
              {current}
            </span>
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
