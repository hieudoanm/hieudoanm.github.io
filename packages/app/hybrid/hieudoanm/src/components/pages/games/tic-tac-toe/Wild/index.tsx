import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { FC, useState } from 'react';
import { Board, Move, Player, WIN, WinResult } from './utils';

export const Wild: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [board, setBoard] = useState<Board>(new Array(9).fill(null));
  const [current, setCurrent] = useState<1 | 2>(1);
  const [selectedMark, setSelectedMark] = useState<Player>('X');
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

    newBoard[i] = selectedMark;
    newMoves.push({ player: selectedMark, idx: i });

    const w = checkWinner(newBoard);
    setBoard(newBoard);
    setMoves(newMoves);
    setWinner(w);
    if (!w && !isBoardFull(newBoard)) setCurrent(current === 1 ? 2 : 1);
  };

  const reset = () => {
    setBoard(new Array(9).fill(null));
    setMoves([]);
    setCurrent(1);
    setSelectedMark('X');
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
    setCurrent(current === 1 ? 2 : 1);
    setWinner(null);
  };

  const isDraw = !winner && isBoardFull(board);

  return (
    <FullScreen onClose={onClose} title="Wild Tic-Tac-Toe">
      <div className="mx-auto w-full max-w-md">
        <p className="mb-4 text-xs opacity-70">
          Choose <strong>X</strong> or <strong>O</strong> each turn! Get 3 in a
          row to win.
        </p>

        <div className="mb-4 flex items-center justify-center gap-4">
          <span className="text-sm">Player {current}'s mark:</span>
          <button
            onClick={() => setSelectedMark('X')}
            className={`btn btn-sm ${selectedMark === 'X' ? 'btn-info' : 'btn-neutral'}`}>
            X
          </button>
          <button
            onClick={() => setSelectedMark('O')}
            className={`btn btn-sm ${selectedMark === 'O' ? 'btn-error' : 'btn-neutral'}`}>
            O
          </button>
        </div>

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
                Winner: Player{' '}
                {winner.player === 'X'
                  ? moves.find((m) => m.player === 'X')
                    ? '1'
                    : '2'
                  : moves.find((m) => m.player === 'O')
                    ? '1'
                    : '2'}{' '}
                ({winner.player})
              </div>
            ) : isDraw ? (
              <div className="text-warning font-normal">Draw!</div>
            ) : (
              <div>
                Player <span className="text-info font-normal">{current}</span>
                's turn
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
Wild.displayName = 'Wild';
