import { FC, useState } from 'react';
import type { GameState, Move } from '@chess/ts';
import { createGame, makeMove, toFen } from '@chess/ts';
import { Chessboard } from '../../organisms/chess/ChessBoard';
import {
  applyUserMove,
  isCheckmate,
  legalMoveFor,
} from '../utils/endgame';
import { bestMoveFrom } from '../utils/tactics';
import {
  THREE_CHECK_FEN,
  THREE_CHECK_WIN,
  threeCheckWinner,
  updateThreeCheck,
  type CheckCounts,
} from '../utils/variants';

export const ThreeCheckTab: FC = () => {
  const [game, setGame] = useState<GameState>(() => createGame(THREE_CHECK_FEN));
  const [counts, setCounts] = useState<CheckCounts>({ w: 0, b: 0 });
  const [thinking, setThinking] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const applyAndTrack = (state: GameState, move: Move) => {
    const next = makeMove(state, move);
    const nextCounts = updateThreeCheck(state, move, counts);
    setCounts(nextCounts);
    setGame(next);
    const w = threeCheckWinner(nextCounts);
    if (w) {
      setWinner(w === 'w' ? 'White' : 'Black');
    } else if (isCheckmate(next)) {
      setWinner(next.turn === 'b' ? 'White' : 'Black');
    }
    return next;
  };

  const engineReply = (state: GameState) => {
    setThinking(true);
    window.setTimeout(() => {
      const best = bestMoveFrom(state, 8);
      if (best) {
        const move = legalMoveFor(state, best.from, best.to);
        if (move) applyAndTrack(state, move);
      }
      setThinking(false);
    }, 60);
  };

  const handleDrop = (sourceSquare: string, targetSquare: string | null): boolean => {
    if (!targetSquare) return false;
    if (game.turn !== 'w' || thinking || winner) return false;
    const next = applyUserMove(game, sourceSquare, targetSquare);
    if (next === game) return false;
    setGame(next);
    const w = threeCheckWinner(counts);
    if (w) setWinner(w === 'w' ? 'White' : 'Black');
    else if (isCheckmate(next)) setWinner('White');
    else engineReply(next);
    return true;
  };

  const reset = () => {
    setGame(createGame(THREE_CHECK_FEN));
    setCounts({ w: 0, b: 0 });
    setThinking(false);
    setWinner(null);
  };

  return (
    <div className="card bg-base-200 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold">Three-check</h3>
        <div className="flex items-center gap-3 text-sm">
          <span>
            White: <span className="badge badge-primary">{counts.w}</span>
          </span>
          <span>
            Black: <span className="badge badge-primary">{counts.b}</span>
          </span>
          <button onClick={reset} className="btn btn-ghost btn-xs">
            Reset
          </button>
        </div>
      </div>
      <Chessboard
        position={toFen(game)}
        allowDragging={game.turn === 'w' && !winner}
        onPieceDrop={({ sourceSquare, targetSquare }) =>
          handleDrop(sourceSquare, targetSquare)
        }
      />
      <div className="mt-3 flex items-center gap-2 text-sm">
        {winner && <span className="badge badge-success">{winner} wins ({THREE_CHECK_WIN} checks)</span>}
        {thinking && <span className="loading loading-spinner loading-xs" />}
        {!winner && !thinking && (
          <span className="opacity-70">
            First to land {THREE_CHECK_WIN} checks wins. You are White.
          </span>
        )}
      </div>
    </div>
  );
};
ThreeCheckTab.displayName = 'ThreeCheckTab';
