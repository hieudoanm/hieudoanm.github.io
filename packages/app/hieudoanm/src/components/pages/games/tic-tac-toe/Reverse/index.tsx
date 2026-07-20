import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { FC, useState } from 'react';
import { Board, LoseResult, Move, Player, WIN } from './utils';

export const Reverse: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [board, setBoard] = useState<Board>(new Array(9).fill(null));
  const [current, setCurrent] = useState<Player>('X');
  const [moves, setMoves] = useState<Move[]>([]);
  const [loser, setLoser] = useState<LoseResult | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  const checkLoser = (b: Board): LoseResult | null => {
    for (const combo of WIN) {
      const [a, bb, cc] = combo;
      if (b[a] && b[a] === b[bb] && b[a] === b[cc]) {
        return { player: b[a] as Player, cells: combo };
      }
    }
    return null;
  };

  const isBoardFull = (b: Board): boolean => b.every((cell) => cell !== null);

  const handleClick = (i: number) => {
    if (board[i] || loser || isDraw) return;

    const newBoard = [...board];
    const newMoves = [...moves];

    newBoard[i] = current;
    newMoves.push({ player: current, idx: i });

    const l = checkLoser(newBoard);
    setBoard(newBoard);
    setMoves(newMoves);

    if (l) {
      setLoser(l);
    } else if (isBoardFull(newBoard)) {
      setIsDraw(true);
    } else {
      setCurrent(current === 'X' ? 'O' : 'X');
    }
  };

  const reset = () => {
    setBoard(new Array(9).fill(null));
    setMoves([]);
    setCurrent('X');
    setLoser(null);
    setIsDraw(false);
  };

  const undo = () => {
    if (moves.length === 0 || loser || isDraw) return;

    const newBoard = [...board];
    const newMoves = [...moves];

    const last = newMoves.pop()!;
    newBoard[last.idx] = null;

    setBoard(newBoard);
    setMoves(newMoves);
    setCurrent(last.player);
    setLoser(null);
    setIsDraw(false);
  };

  return (
    <FullScreen onClose={onClose} title="Reverse Tic-Tac-Toe">
      <div className="mx-auto w-full max-w-md">
        <p className="mb-4 text-xs opacity-70">
          Get <strong>3 in a row</strong> and you <em>lose</em>! Avoid making a
          line to win.
        </p>

        <div className="mb-4 grid grid-cols-3 gap-2">
          {board.map((v, i) => {
            const isLosingCell = loser?.cells.includes(i);
            const textColor =
              v === 'X' ? 'text-info' : v === 'O' ? 'text-error' : '';

            return (
              <div key={`${v}-${i}`} className="aspect-square w-full">
                <button
                  onClick={() => handleClick(i)}
                  className={`btn btn-square h-full w-full text-6xl ${isLosingCell ? 'btn-error' : 'btn-neutral'} ${textColor}`}>
                  {v}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            {loser ? (
              <div className="text-error font-normal">
                {loser.player} loses with 3 in a row!
              </div>
            ) : isDraw ? (
              <div className="text-warning font-normal">Draw! Nobody lost.</div>
            ) : (
              <div>
                Current:{' '}
                <span className="text-info font-normal">{current}</span>
              </div>
            )}
          </div>

          <div className="text-xs opacity-70">
            X moves:{' '}
            {moves
              .filter((m) => m.player === 'X')
              .map((m) => m.idx)
              .join(', ') || '—'}{' '}
            <br />O moves:{' '}
            {moves
              .filter((m) => m.player === 'O')
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
Reverse.displayName = 'Reverse';
