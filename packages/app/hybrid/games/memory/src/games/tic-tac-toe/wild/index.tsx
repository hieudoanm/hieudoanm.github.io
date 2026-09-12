'use client';

import { useWild } from './useWild';

const MARK_COLOR: Record<string, string> = {
  X: 'text-info',
  O: 'text-error',
};

export const Wild = () => {
  const {
    board,
    moves,
    current,
    selectedMark,
    winner,
    draw,
    play,
    chooseMark,
    undo,
    reset,
  } = useWild();
  const isDraw = draw && !winner;

  const firstPlayerOf = (mark: string): string =>
    moves.some((m) => m.player === mark) ? '1' : '2';

  return (
    <div className="mx-auto w-full max-w-md">
      <p className="mb-4 text-xs opacity-70">
        Choose <strong>X</strong> or <strong>O</strong> each turn! Get 3 in a
        row to win.
      </p>

      <div className="mb-4 flex items-center gap-2">
        <span className="text-xs opacity-70">Your mark:</span>
        <button
          type="button"
          data-testid="pick-x"
          onClick={() => chooseMark('X')}
          className={`btn btn-sm ${selectedMark === 'X' ? 'btn-info' : 'btn-neutral'}`}>
          X
        </button>
        <button
          type="button"
          data-testid="pick-o"
          onClick={() => chooseMark('O')}
          className={`btn btn-sm ${selectedMark === 'O' ? 'btn-error' : 'btn-neutral'}`}>
          O
        </button>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2">
        {board.map((value, i) => (
          <button
            key={`wild-${i}`}
            type="button"
            data-testid={`cell-${i}`}
            onClick={() => play(i)}
            className={`btn btn-square h-full w-full text-6xl ${
              winner?.cells.includes(i) ? 'btn-warning' : 'btn-neutral'
            } ${value ? MARK_COLOR[value] : ''}`}>
            {value}
          </button>
        ))}
      </div>

      <div
        className="mb-2 flex items-center justify-between text-sm"
        data-testid="status">
        {winner ? (
          <span className="text-warning font-normal">
            Winner: Player {firstPlayerOf(winner.player)} ({winner.player})
          </span>
        ) : isDraw ? (
          <span className="text-warning font-normal">Draw!</span>
        ) : (
          <span>
            Player <span className="text-info font-normal">{current}</span>
            &apos;s turn
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
