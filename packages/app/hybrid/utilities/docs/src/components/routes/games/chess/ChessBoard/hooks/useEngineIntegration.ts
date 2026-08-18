import { useEffect } from 'react';
import type { MutableRefObject } from 'react';
import type { GameState } from '@chess/ts';
import {
  getLegalMoves,
  makeMove,
  toFen,
  toPgnFromState,
  toSquareFromName,
} from '@chess/ts';
import type { BoardAction, BoardState } from './boardReducer';

interface EngineDeps {
  boardMode: BoardState['boardMode'];
  fen: BoardState['fen'];
  thinking: BoardState['thinking'];
  gameRef: MutableRefObject<GameState>;
  dispatch: React.Dispatch<BoardAction>;
  analyze: (fen: string, depth: number) => void;
  bestMove: string | null;
  evaluation: number | null;
}

export const useEngineIntegration = ({
  boardMode,
  fen,
  thinking,
  gameRef,
  dispatch,
  analyze,
  bestMove,
  evaluation,
}: EngineDeps) => {
  useEffect(() => {
    if (boardMode !== 'play') return;
    const game = gameRef.current;
    if (game.turn === 'b' && game.status === 'playing') {
      analyze(toFen(game), 15);
    }
  }, [fen, boardMode, analyze, gameRef]);

  useEffect(() => {
    if (!bestMove || boardMode !== 'play') return;
    const game = gameRef.current;
    if (game.turn !== 'b') return;

    const from = toSquareFromName(bestMove.slice(0, 2));
    const to = toSquareFromName(bestMove.slice(2, 4));
    if (from === null || to === null) return;

    const legal = getLegalMoves(
      game.board,
      game.turn,
      game.castlingRights,
      game.enPassant
    );
    const found = legal.find((m) => m.from === from && m.to === to);
    if (!found) return;

    const newGame = makeMove(game, found);
    dispatch({ type: 'SET_FEN', fen: toFen(newGame) });
    dispatch({ type: 'SET_PGN', pgn: toPgnFromState(newGame) });
    gameRef.current = newGame;
    dispatch({ type: 'SET_THINKING', thinking: false });
  }, [bestMove, boardMode, gameRef, dispatch]);

  const whiteEval =
    evaluation !== null && boardMode === 'play' ? evaluation : null;

  const evalPercent =
    whiteEval === null
      ? 50
      : 50 + Math.max(-1000, Math.min(1000, whiteEval)) / 20;

  const evalLabel = whiteEval === null ? '0.0' : (whiteEval / 100).toFixed(1);

  const statusLabel = (() => {
    const game = gameRef.current;
    if (boardMode !== 'play') return null;
    if (game.status === 'checkmate') return 'Checkmate!';
    if (game.status === 'draw' || game.status === 'stalemate') return 'Draw';
    if (game.inCheck) return 'Check!';
    if (thinking) return 'Stockfish thinking…';
    return game.turn === 'w' ? 'Your turn (White)' : null;
  })();

  return { whiteEval, evalPercent, evalLabel, statusLabel };
};
