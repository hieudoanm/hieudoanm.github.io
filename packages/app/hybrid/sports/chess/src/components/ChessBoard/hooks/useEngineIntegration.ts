import { useEffect } from 'react';
import type { MutableRefObject } from 'react';
import type { Color, GameState } from '@chess/ts';
import {
  getLegalMoves,
  makeMove,
  toFen,
  toSan,
  toSquareFromName,
} from '@chess/ts';
import type { BoardAction, BoardState } from './boardReducer';

interface EngineDeps {
  boardMode: BoardState['boardMode'];
  fen: BoardState['fen'];
  thinking: BoardState['thinking'];
  depth: number;
  humanSide: Color;
  gameRef: MutableRefObject<GameState>;
  dispatch: React.Dispatch<BoardAction>;
  analyze: (fen: string, depth: number) => void;
  bestMove: string | null;
  evaluation: number | null;
  onEngineMove: (game: GameState, san: string) => void;
}

export const useEngineIntegration = ({
  boardMode,
  fen,
  thinking,
  depth,
  humanSide,
  gameRef,
  dispatch,
  analyze,
  bestMove,
  evaluation,
  onEngineMove,
}: EngineDeps) => {
  const engineSide: Color = humanSide === 'w' ? 'b' : 'w';

  useEffect(() => {
    if (boardMode !== 'play') return;
    const game = gameRef.current;
    if (game.turn === engineSide && game.status === 'playing') {
      analyze(toFen(game), depth);
    }
  }, [fen, boardMode, depth, engineSide, analyze, gameRef]);

  useEffect(() => {
    if (!bestMove || boardMode !== 'play') return;
    const game = gameRef.current;
    if (game.turn !== engineSide) return;

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

    const san = toSan(
      game.board,
      found,
      game.turn,
      game.castlingRights,
      game.enPassant
    );
    onEngineMove(makeMove(game, found), san);
    dispatch({ type: 'SET_THINKING', thinking: false });
  }, [bestMove, boardMode, engineSide, gameRef, dispatch, onEngineMove]);

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
    return game.turn === humanSide ? 'Your turn' : null;
  })();

  return { whiteEval, evalPercent, evalLabel, statusLabel };
};
