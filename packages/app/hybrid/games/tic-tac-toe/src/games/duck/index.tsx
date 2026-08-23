'use client';

import { useDuck } from './useDuck';

const MARK_COLOR: Record<string, string> = {
  X: 'text-info',
  O: 'text-error',
};

export const Duck = () => {
  const {
    board,
    duck,
    current,
    phase,
    pendingMark,
    moves,
    winner,
    draw,
    play,
    undo,
    reset,
  } = useDuck();

  return (
    <div className="mx-auto w-full max-w-md">
      <p className="mb-4 text-xs opacity-70">
        Place your mark, then move the <strong>Duck</strong> to block your
        opponent!
      </p>

      <div className="mb-4 grid grid-cols-3 gap-2">
        {board.map((value, i) => {
          const isDuck = duck === i;
          const isPending = pendingMark === i;
          return (
            <button
              key={`duck-${i}`}
              type="button"
              data-testid={`cell-${i}`}
              onClick={() => play(i)}
              className={`btn btn-square h-full w-full text-6xl ${
                winner?.cells.includes(i)
                  ? 'btn-warning'
                  : isDuck
                    ? 'bg-warning text-2xl'
                    : ''
              } ${isPending ? 'btn-info opacity-50' : ''} ${
                value && !isDuck
                  ? MARK_COLOR[value]
                  : isDuck
                    ? 'text-warning'
                    : ''
              }`}>
              {isDuck && !value ? '\u{1F986}' : value}
            </button>
          );
        })}
      </div>

      <div
        className="mb-2 flex items-center justify-between text-sm"
        data-testid="status">
        {winner ? (
          <span className="text-warning font-normal">
            Winner: {winner.player}
          </span>
        ) : draw ? (
          <span className="text-warning font-normal">Draw!</span>
        ) : (
          <span>
            <span
              className={
                current === 'X'
                  ? 'text-info font-normal'
                  : 'text-error font-normal'
              }>
              {current}
            </span>
            {phase === 'mark' ? "'s turn — place mark" : "'s turn — move duck"}
          </span>
        )}
      </div>

      <div className="mb-2 text-xs opacity-70" data-testid="moves">
        X moves:{' '}
        {moves
          .filter((m) => m.player === 'X')
          .map((m) => m.markIdx)
          .join(', ') || '—'}
        <br />O moves:{' '}
        {moves
          .filter((m) => m.player === 'O')
          .map((m) => m.markIdx)
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
