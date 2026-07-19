import type { GameState, Move } from '@chess/ts';
import {
  createGame,
  getLegalMoves,
  makeMove,
  toFen,
  toPgnFromState,
  toSquareFromName,
} from '@chess/ts';
import { useStockfish } from '@frontend/react';
import { INITIAL_FEN } from '../constants';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useReducer, useRef } from 'react';
import type { DraggingPieceDataType, PieceDataType } from 'react-chessboard';
import type { BoardMode } from '../types';
import { replayPGN } from '../utils/eco';
import { boardReducer, build960, initialState } from './boardReducer';
import { useEngineIntegration } from './useEngineIntegration';
import { useExport } from './useExport';

export const useChessBoard = () => {
  const [state, dispatch] = useReducer(boardReducer, initialState);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<GameState>(createGame(INITIAL_FEN));
  const stockfish = useStockfish();

  const { whiteEval, evalPercent, evalLabel, statusLabel } =
    useEngineIntegration({
      boardMode: state.boardMode,
      fen: state.fen,
      thinking: state.thinking,
      gameRef,
      dispatch,
      analyze: stockfish.analyze,
      bestMove: stockfish.bestMove,
      evaluation: stockfish.evaluation,
    });

  const { exportPNG, exportGIF } = useExport({
    pgn: state.pgn,
    boardRef,
    gameRef,
    dispatch,
  });

  const syncGame = useCallback((newGame: GameState) => {
    gameRef.current = newGame;
    dispatch({
      type: 'SYNC_GAME',
      fen: toFen(newGame),
      pgn: toPgnFromState(newGame),
    });
  }, []);

  const switchBoardMode = useCallback(
    (next: BoardMode) => {
      syncGame(build960(state.positionId));
      dispatch({ type: 'SET_BOARD_MODE', boardMode: next });
    },
    [state.positionId, syncGame]
  );

  const handleFENChange = useCallback(
    (value: string) => {
      try {
        syncGame(createGame(value));
      } catch {
        // invalid FEN string
      }
    },
    [syncGame]
  );

  const handle960IdChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const id = Number.parseInt(e.target.value, 10);
      dispatch({ type: 'SET_POSITION_ID', positionId: id });
      syncGame(build960(id));
    },
    [syncGame]
  );

  const randomize960 = useCallback(() => {
    const id = Math.floor(Math.random() * 960);
    dispatch({ type: 'SET_POSITION_ID', positionId: id });
    syncGame(build960(id));
  }, [syncGame]);

  const resetToStart = useCallback(() => {
    syncGame(createGame(INITIAL_FEN));
    dispatch({ type: 'SET_POSITION_ID', positionId: 518 });
  }, [syncGame]);

  const onPieceDrop = useCallback(
    ({
      sourceSquare,
      targetSquare,
    }: {
      piece?: DraggingPieceDataType;
      sourceSquare: string;
      targetSquare: string | null;
    }): boolean => {
      if (state.panel === 'openings') return false;
      const game = gameRef.current;
      if (state.boardMode === 'play' && game.turn !== 'w') return false;
      const from = toSquareFromName(sourceSquare);
      const to = targetSquare ? toSquareFromName(targetSquare) : null;
      if (from === null || to === null) return false;
      const legal = getLegalMoves(
        game.board,
        game.turn,
        game.castlingRights,
        game.enPassant
      );
      const found = legal.find((m) => m.from === from && m.to === to);
      if (!found) return false;
      const move: Move = {
        ...found,
        promotion: found.promotion ?? (found.promotion === null ? null : 'q'),
      };
      const newGame = makeMove(game, found.promotion !== null ? found : move);
      dispatch({ type: 'SET_FEN', fen: toFen(newGame) });
      dispatch({ type: 'SET_PGN', pgn: toPgnFromState(newGame) });
      gameRef.current = newGame;
      if (state.boardMode === 'play') {
        dispatch({ type: 'SET_THINKING', thinking: true });
      }
      return true;
    },
    [state.panel, state.boardMode]
  );

  const canDragPiece = useCallback(
    ({
      piece,
    }: {
      isSparePiece: boolean;
      piece: PieceDataType;
      square: string | null;
    }): boolean => {
      if (state.panel === 'openings') return false;
      if (state.boardMode === 'play') return piece.pieceType.startsWith('w');
      return true;
    },
    [state.panel, state.boardMode]
  );

  useEffect(() => {
    if (state.panel !== 'openings') {
      syncGame(gameRef.current);
    }
  }, [state.panel, syncGame]);

  const handlePGNChange = useCallback((value: string) => {
    dispatch({ type: 'SET_PGN', pgn: value });
    const result = replayPGN(value);
    if (result) {
      gameRef.current = result;
      dispatch({ type: 'SET_FEN', fen: toFen(result) });
    }
  }, []);

  return {
    fen: state.fen,
    boardMode: state.boardMode,
    thinking: state.thinking,
    positionId: state.positionId,
    panel: state.panel,
    pgn: state.pgn,
    gifLoading: state.gifLoading,
    boardRef,
    whiteEval,
    evalPercent,
    evalLabel,
    statusLabel,
    dispatch,
    handleFENChange,
    handle960IdChange,
    randomize960,
    resetToStart,
    onPieceDrop,
    canDragPiece,
    switchBoardMode,
    handlePGNChange,
    exportPNG,
    exportGIF,
  };
};
