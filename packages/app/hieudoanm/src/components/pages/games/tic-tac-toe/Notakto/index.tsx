import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { FC, useState } from 'react';
import { Board, Cell, LoseResult, Move, WIN } from './utils';

const createBoard = (): Board => new Array(9).fill(null);

const checkLoser = (b: Board): LoseResult | null => {
  for (const combo of WIN) {
    const [a, bb, cc] = combo;
    if (b[a] && b[a] === b[bb] && b[a] === b[cc]) {
      return { cells: combo };
    }
  }
  return null;
};

const isBoardFull = (b: Board): boolean => b.every((cell) => cell !== null);

export const Notakto: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [board, setBoard] = useState<Board>(createBoard());
  const [current, setCurrent] = useState<1 | 2>(1);
  const [moves, setMoves] = useState<Move[]>([]);
  const [loser, setLoser] = useState<LoseResult | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  const isGameEnd = loser || isDraw;

  const handleCellClick = (cellIdx: number) => {
    if (isGameEnd) return;
    if (board[cellIdx] !== null) return;

    const newBoard = [...board];
    newBoard[cellIdx] = 'X';

    const l = checkLoser(newBoard);
    const newMoves = [...moves, { idx: cellIdx }];

    setBoard(newBoard);
    setMoves(newMoves);

    if (l) {
      setLoser(l);
    } else if (isBoardFull(newBoard)) {
      setIsDraw(true);
    } else {
      setCurrent(current === 1 ? 2 : 1);
    }
  };

  const reset = () => {
    setBoard(createBoard());
    setCurrent(1);
    setMoves([]);
    setLoser(null);
    setIsDraw(false);
  };

  const undo = () => {
    if (moves.length === 0 || isGameEnd) return;

    const newMoves = [...moves];
    const last = newMoves.pop()!;
    const newBoard = [...board];
    newBoard[last.idx] = null;

    setBoard(newBoard);
    setMoves(newMoves);
    setCurrent(current === 1 ? 2 : 1);
    setLoser(null);
    setIsDraw(false);
  };

  return (
    <FullScreen onClose={onClose} title="Notakto">
      <div className="mx-auto w-full max-w-md">
        <p className="mb-4 text-xs opacity-70">
          Players alternate placing <strong>X</strong> marks. Complete a row of
          3 and you <em>lose</em>!
        </p>

        <div className="mb-4 grid grid-cols-3 gap-2">
          {board.map((cell, i) => {
            const isLosingCell = loser?.cells.includes(i);
            const move = moves.find((m) => m.idx === i);
            const playerIdx = move
              ? moves.filter((m) => m.idx <= move.idx).length
              : 0;
            const player = playerIdx % 2 === 1 ? 1 : 2;
            const textColor =
              cell === 'X' ? (player === 1 ? 'text-info' : 'text-error') : '';

            return (
              <div key={`${cell}-${i}`} className="aspect-square w-full">
                <button
                  onClick={() => handleCellClick(i)}
                  className={`btn btn-square h-full w-full text-6xl ${isLosingCell ? 'btn-error' : 'btn-neutral'} ${textColor}`}>
                  {cell}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            {loser ? (
              <div className="text-error font-normal">
                Player {current} loses!
              </div>
            ) : isDraw ? (
              <div className="text-warning font-normal">
                Draw! All boards full.
              </div>
            ) : (
              <div>
                Player{' '}
                <span
                  className={
                    current === 1
                      ? 'text-info font-normal'
                      : 'text-error font-normal'
                  }>
                  {current}
                </span>
                's turn
              </div>
            )}
          </div>

          <div className="text-xs opacity-70">
            Player 1:{' '}
            {moves
              .filter((_, i) => i % 2 === 0)
              .map((m) => m.idx)
              .join(', ') || '—'}{' '}
            <br />
            Player 2:{' '}
            {moves
              .filter((_, i) => i % 2 === 1)
              .map((m) => m.idx)
              .join(', ') || '—'}
          </div>

          <div className="flex gap-2">
            <button onClick={reset} className="btn btn-primary btn-sm">
              Reset
            </button>
            <button onClick={undo} className="btn btn-secondary btn-sm">
              Undo
            </button>
          </div>
        </div>
      </div>
    </FullScreen>
  );
};
Notakto.displayName = 'Notakto';
