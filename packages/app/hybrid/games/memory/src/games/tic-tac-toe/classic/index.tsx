'use client';

import { useClassic } from './useClassic';

const MARK_COLOR: Record<string, string> = {
  X: 'text-info',
  O: 'text-error',
};

export const Classic = () => {
  const { board, moves, current, winner, draw, play, undo, reset } =
    useClassic();
  const isDraw = draw && !winner;

  return (
    <div className="mx-auto w-full max-w-md">
      <p className="mb-4 text-xs opacity-70">
        Traditional tic-tac-toe. Get <strong>3 in a row</strong> to <em>win</em>
        !
      </p>

      <div className="mb-4 grid grid-cols-3 gap-2">
        {board.map((value, i) => (
          <button
            key={`classic-${i}`}
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

      <StatusLine current={current} winner={winner} isDraw={isDraw} />

      <MoveList moves={moves} />

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

const StatusLine = ({
  current,
  winner,
  isDraw,
}: {
  current: string;
  winner: { player: string } | null;
  isDraw: boolean;
}) => (
  <div
    className="mb-2 flex items-center justify-between text-sm"
    data-testid="status">
    {winner ? (
      <span className="text-warning font-normal">Winner: {winner.player}</span>
    ) : isDraw ? (
      <span className="text-warning font-normal">Draw!</span>
    ) : (
      <span>
        Current:{' '}
        <span
          className={
            current === 'X' ? 'text-info font-normal' : 'text-error font-normal'
          }>
          {current}
        </span>
      </span>
    )}
  </div>
);

const MoveList = ({ moves }: { moves: { player: string; idx: number }[] }) => (
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
);
