import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { FC, useState } from 'react';
import { Board, Move, Player, WIN, WinResult } from './utils';

type Phase = 'mark' | 'duck';

export const Duck: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [board, setBoard] = useState<Board>(new Array(9).fill(null));
  const [duck, setDuck] = useState<number | null>(null);
  const [current, setCurrent] = useState<Player>('X');
  const [phase, setPhase] = useState<Phase>('mark');
  const [pendingMark, setPendingMark] = useState<number | null>(null);
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

  const isEmpty = (i: number) => board[i] === null && duck !== i;

  const handleCellClick = (i: number) => {
    if (winner) return;

    if (phase === 'mark') {
      if (!isEmpty(i)) return;

      const newBoard = [...board];
      newBoard[i] = current;

      const w = checkWinner(newBoard);
      if (w) {
        setBoard(newBoard);
        setWinner(w);
        return;
      }

      setBoard(newBoard);
      setPendingMark(i);
      setPhase('duck');
    } else {
      if (i === pendingMark) return;
      if (board[i] !== null) return;
      if (duck === i) return;

      const move: Move = {
        player: current,
        markIdx: pendingMark!,
        duckFrom: duck,
        duckTo: i,
      };

      setDuck(i);
      setMoves([...moves, move]);
      setPendingMark(null);
      setPhase('mark');
      setCurrent(current === 'X' ? 'O' : 'X');
    }
  };

  const reset = () => {
    setBoard(new Array(9).fill(null));
    setDuck(null);
    setCurrent('X');
    setPhase('mark');
    setPendingMark(null);
    setMoves([]);
    setWinner(null);
  };

  const undo = () => {
    if (moves.length === 0 || winner) return;

    const newMoves = [...moves];
    const last = newMoves.pop()!;

    const newBoard = [...board];
    newBoard[last.markIdx] = null;

    setBoard(newBoard);
    setDuck(last.duckFrom);
    setMoves(newMoves);
    setCurrent(last.player);
    setPhase('mark');
    setPendingMark(null);
    setWinner(null);
  };

  const isDraw = !winner && isBoardFull(board);

  const getCellClass = (i: number) => {
    if (duck === i) return 'bg-warning text-2xl';
    if (pendingMark === i) return 'btn-info opacity-50';
    return 'btn-neutral';
  };

  return (
    <FullScreen onClose={onClose} title="Duck Tic-Tac-Toe">
      <div className="mx-auto w-full max-w-md">
        <p className="mb-4 text-xs opacity-70">
          Place your mark, then move the <strong>🦆 Duck</strong> to block your
          opponent!
        </p>

        <div className="mb-4 grid grid-cols-3 gap-2">
          {board.map((v, i) => {
            const isDuck = duck === i;
            const isPending = pendingMark === i;
            const isWin = winner?.cells.includes(i);
            const textColor =
              v === 'X'
                ? 'text-info'
                : v === 'O'
                  ? 'text-error'
                  : isDuck
                    ? 'text-warning'
                    : '';

            return (
              <div key={`${v}-${i}-${isDuck}`} className="aspect-square w-full">
                <button
                  onClick={() => handleCellClick(i)}
                  className={`btn btn-square h-full w-full text-6xl ${isWin ? 'btn-warning' : getCellClass(i)} ${isPending ? 'opacity-50' : ''} ${textColor}`}>
                  {isDuck && !v ? '🦆' : v}
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
                <span
                  className={
                    current === 'X'
                      ? 'text-info font-normal'
                      : 'text-error font-normal'
                  }>
                  {current}
                </span>
                {phase === 'mark'
                  ? "'s turn — place mark"
                  : "'s turn — move duck"}
              </div>
            )}
          </div>

          <div className="text-xs opacity-70">
            X moves:{' '}
            {moves
              .filter((m) => m.player === 'X')
              .map((m) => m.markIdx)
              .join(', ') || '—'}{' '}
            <br />O moves:{' '}
            {moves
              .filter((m) => m.player === 'O')
              .map((m) => m.markIdx)
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
Duck.displayName = 'Duck';
