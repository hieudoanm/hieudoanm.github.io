import { FC, useState } from 'react';
import type { GameState } from '@chess/ts';
import { createGame, toFen } from '@chess/ts';
import { Chessboard } from '../../organisms/chess/ChessBoard';
import { isCheckmate, legalMoveFor } from '../utils/endgame';
import { bestMoveFrom } from '../utils/tactics';
import {
  applyHordeMove,
  HORDE_FEN,
  hordeMoveFor,
} from '../utils/variants';

export const HordeTab: FC = () => {
  const [game, setGame] = useState<GameState>(() => createGame(HORDE_FEN));
  const [thinking, setThinking] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const engineReply = (state: GameState) => {
    setThinking(true);
    window.setTimeout(() => {
      const best = bestMoveFrom(state, 8);
      if (best) {
        const move = legalMoveFor(state, best.from, best.to);
        if (move) {
          const next = applyHordeMove(state, move);
          setGame(next);
          if (isCheckmate(next)) setWinner('Black');
        }
      }
      setThinking(false);
    }, 60);
  };

  const handleDrop = (sourceSquare: string, targetSquare: string | null): boolean => {
    if (!targetSquare) return false;
    if (game.turn !== 'w' || thinking || winner) return false;
    const move = hordeMoveFor(game, sourceSquare, targetSquare);
    if (!move) return false;
    const next = applyHordeMove(game, move);
    setGame(next);
    engineReply(next);
    return true;
  };

  const reset = () => {
    setGame(createGame(HORDE_FEN));
    setThinking(false);
    setWinner(null);
  };

  return (
    <div className="card bg-base-200 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold">Pawn Horde</h3>
        <button onClick={reset} className="btn btn-ghost btn-xs">
          Reset
        </button>
      </div>
      <Chessboard
        position={toFen(game)}
        allowDragging={game.turn === 'w' && !winner}
        onPieceDrop={({ sourceSquare, targetSquare }) =>
          handleDrop(sourceSquare, targetSquare)
        }
      />
      <div className="mt-3 flex items-center gap-2 text-sm">
        {winner && <span className="badge badge-success">{winner} wins!</span>}
        {thinking && <span className="loading loading-spinner loading-xs" />}
        {!winner && !thinking && (
          <span className="opacity-70">
            Command the pawn horde against the lone black army. You are White.
          </span>
        )}
      </div>
    </div>
  );
};
HordeTab.displayName = 'HordeTab';
