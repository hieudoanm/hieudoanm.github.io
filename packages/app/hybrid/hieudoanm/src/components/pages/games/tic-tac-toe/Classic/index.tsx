import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { FC, useState } from 'react';
import { Board, Move, Player, WIN, WinResult } from './utils';

export const Classic: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [board, setBoard] = useState<Board>(new Array(9).fill(null));
  const [current, setCurrent] = useState<Player>('X');
  const [moves, setMoves] = useState<Move[]>([]);
  const [winner, setWinner] = useState<WinResult | null>(null);

  const checkWinner = (b: Board): WinResult | null => {
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
    if (board[i] || winner) return;

    const newBoard = [...board];
    const newMoves = [...moves];

    newBoard[i] = current;
    newMoves.push({ player: current, idx: i });

    const w = checkWinner(newBoard);
    setBoard(newBoard);
    setMoves(newMoves);
    setWinner(w);
    if (!w && !isBoardFull(newBoard)) setCurrent(current === 'X' ? 'O' : 'X');
  };

  const reset = () => {
    setBoard(new Array(9).fill(null));
    setMoves([]);
    setCurrent('X');
    setWinner(null);
  };

  const undo = () => {
    if (moves.length === 0 || winner) return;

    const newBoard = [...board];
    const newMoves = [...moves];

    const last = newMoves.pop()!;
    newBoard[last.idx] = null;

    setBoard(newBoard);
    setMoves(newMoves);
    setCurrent(last.player);
    setWinner(null);
  };

  const isDraw = !winner && isBoardFull(board);

  return (
    <FullScreen onClose={onClose} title="Classic Tic-Tac-Toe">
      <div className="mx-auto w-full max-w-md">
        <p className="mb-4 text-xs opacity-70">
          Traditional tic-tac-toe. Get <strong>3 in a row</strong> to{' '}
          <em>win</em>!
        </p>

        <div className="mb-4 grid grid-cols-3 gap-2">
          {board.map((v, i) => {
            const isWin = winner?.cells.includes(i);
            const textColor =
              v === 'X' ? 'text-info' : v === 'O' ? 'text-error' : '';

            return (
              <div key={`${v}-${i}`} className="aspect-square w-full">
                <button
                  onClick={() => handleClick(i)}
                  className={`btn btn-square h-full w-full text-6xl ${isWin ? 'btn-warning' : 'btn-neutral'} ${textColor}`}>
                  {v}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            {winner ? (
              <div className="text-warning font-normal">
                Winner: {winner.player}
              </div>
            ) : isDraw ? (
              <div className="text-warning font-normal">Draw!</div>
            ) : (
              <div>
                Current:{' '}
                <span
                  className={
                    current === 'X'
                      ? 'text-info font-normal'
                      : 'text-error font-normal'
                  }>
                  {current}
                </span>
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
Classic.displayName = 'Classic';
