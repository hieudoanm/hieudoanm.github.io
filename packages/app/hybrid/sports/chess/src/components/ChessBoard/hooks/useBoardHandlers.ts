import type { Color, GameState } from '@chess/ts';
import {
  fromSan,
  getLegalMoves,
  makeMove,
  toSan,
  toSquareFromName,
  toSquareName,
} from '@chess/ts';
import { useCallback } from 'react';
import type { DraggingPieceDataType, PieceDataType } from 'react-chessboard';
import type { BoardAction, BoardState } from './boardReducer';

interface HandlersDeps {
  boardMode: BoardState['boardMode'];
  panel: BoardState['panel'];
  selectedSquare: BoardState['selectedSquare'];
  legalTargets: BoardState['legalTargets'];
  setupMode: BoardState['setupMode'];
  setupPalette: BoardState['setupPalette'];
  humanSide: Color;
  gameRef: { current: GameState };
  commitMove: (game: GameState, san: string) => void;
  dispatch: (action: BoardAction) => void;
}

export const useBoardHandlers = ({
  boardMode,
  panel,
  selectedSquare,
  legalTargets,
  setupMode,
  setupPalette,
  humanSide,
  gameRef,
  commitMove,
  dispatch,
}: HandlersDeps) => {
  const startThinking = useCallback(() => {
    if (boardMode === 'play')
      dispatch({ type: 'SET_THINKING', thinking: true });
  }, [boardMode, dispatch]);

  const tryPlay = useCallback(
    (fromSq: string, toSq: string): boolean => {
      if (panel === 'openings') return false;
      const game = gameRef.current;
      if (boardMode === 'play' && game.turn !== humanSide) return false;
      const from = toSquareFromName(fromSq);
      const to = toSquareFromName(toSq);
      if (from === null || to === null) return false;
      const legal = getLegalMoves(
        game.board,
        game.turn,
        game.castlingRights,
        game.enPassant
      );
      const found = legal.find((m) => m.from === from && m.to === to);
      if (!found) return false;
      const san = toSan(
        game.board,
        found,
        game.turn,
        game.castlingRights,
        game.enPassant
      );
      commitMove(makeMove(game, found), san);
      startThinking();
      return true;
    },
    [panel, boardMode, humanSide, gameRef, commitMove, startThinking]
  );

  const onPieceDrop = useCallback(
    ({
      sourceSquare,
      targetSquare,
    }: {
      piece?: DraggingPieceDataType;
      sourceSquare: string;
      targetSquare: string | null;
    }): boolean => {
      if (targetSquare === null) return false;
      return tryPlay(sourceSquare, targetSquare);
    },
    [tryPlay]
  );

  const canDragPiece = useCallback(
    ({
      piece,
    }: {
      isSparePiece: boolean;
      piece: PieceDataType;
      square: string | null;
    }): boolean => {
      if (panel === 'openings') return false;
      if (boardMode === 'play')
        return piece.pieceType.startsWith(humanSide === 'w' ? 'w' : 'b');
      return true;
    },
    [panel, boardMode, humanSide]
  );

  const onSquareClick = useCallback(
    ({ square }: { piece?: unknown; square: string }) => {
      if (setupMode) {
        dispatch({ type: 'SET_SETUP_SQUARE', square, piece: setupPalette });
        return;
      }
      if (panel === 'openings') return;
      if (selectedSquare === square) {
        dispatch({ type: 'CLEAR_SELECTION' });
        return;
      }
      if (selectedSquare && legalTargets.includes(square)) {
        tryPlay(selectedSquare, square);
        dispatch({ type: 'CLEAR_SELECTION' });
        return;
      }
      const from = toSquareFromName(square);
      if (from === null) return;
      const game = gameRef.current;
      const pieceAt = game.board[from];
      if (!pieceAt) {
        dispatch({ type: 'CLEAR_SELECTION' });
        return;
      }
      if (boardMode === 'play' && pieceAt.color !== humanSide) {
        dispatch({ type: 'CLEAR_SELECTION' });
        return;
      }
      const legal = getLegalMoves(
        game.board,
        game.turn,
        game.castlingRights,
        game.enPassant
      );
      const targets = legal
        .filter((m) => m.from === from)
        .map((m) => toSquareName(m.to));
      if (targets.length === 0) {
        dispatch({ type: 'CLEAR_SELECTION' });
        return;
      }
      dispatch({ type: 'SET_SELECTED', square, targets });
    },
    [
      setupMode,
      setupPalette,
      panel,
      selectedSquare,
      legalTargets,
      boardMode,
      humanSide,
      gameRef,
      tryPlay,
      dispatch,
    ]
  );

  const playSan = useCallback(
    (sanInput: string): boolean => {
      const game = gameRef.current;
      const move =
        fromSan(
          sanInput,
          game.board,
          game.turn,
          game.castlingRights,
          game.enPassant
        ) ??
        fromSan(
          sanInput.replaceAll('o', 'O'),
          game.board,
          game.turn,
          game.castlingRights,
          game.enPassant
        );
      if (!move) return false;
      commitMove(makeMove(game, move), sanInput);
      startThinking();
      return true;
    },
    [gameRef, commitMove, startThinking]
  );

  return { tryPlay, onPieceDrop, canDragPiece, onSquareClick, playSan };
};
