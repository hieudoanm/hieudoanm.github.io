import type { Color, GameState } from '@chess/ts';
import {
  chess960,
  createGame,
  toFen,
  toInitialFen,
  toPgnFromState,
} from '@chess/ts';
import { useStockfish } from '@frontend/react';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useReducer, useRef } from 'react';
import type { BoardMode, BoardTheme, Odds, Side } from '../types';
import type { PieceSetKey } from '../pieceSets';
import { applyOdds } from '../utils/fen';
import { recordsFromPgn } from '../utils/pgn';
import { boardReducer, initialState } from './boardReducer';
import { useAnalysisLines } from './useAnalysisLines';
import { useBoardHandlers } from './useBoardHandlers';
import { useEngineIntegration } from './useEngineIntegration';
import { useEvalHistory } from './useEvalHistory';
import { useExport } from './useExport';
import { useKeyboardNav } from './useKeyboardNav';
import { useSetup } from './useSetup';
import { useShare } from './useShare';

export const useChessBoard = () => {
  const [state, dispatch] = useReducer(boardReducer, initialState);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<GameState>(createGame(initialState.fen));
  const stockfish = useStockfish();
  const humanSide: Color = state.side === 'white' ? 'w' : 'b';

  const syncGame = useCallback((newGame: GameState) => {
    gameRef.current = newGame;
    dispatch({
      type: 'SYNC_GAME',
      fen: toFen(newGame),
      pgn: toPgnFromState(newGame),
    });
  }, []);

  const commitMove = useCallback((newGame: GameState, san: string) => {
    gameRef.current = newGame;
    dispatch({ type: 'ADD_MOVE', move: { san, fen: toFen(newGame) } });
    dispatch({ type: 'SET_PGN', pgn: toPgnFromState(newGame) });
  }, []);

  const onEngineMove = useCallback(
    (newGame: GameState, san: string) => {
      commitMove(newGame, san);
    },
    [commitMove]
  );

  const { whiteEval, evalPercent, evalLabel, statusLabel } =
    useEngineIntegration({
      boardMode: state.boardMode,
      fen: state.fen,
      thinking: state.thinking,
      depth: state.depth,
      humanSide,
      gameRef,
      dispatch,
      analyze: stockfish.analyze,
      bestMove: stockfish.bestMove,
      evaluation: stockfish.evaluation,
      onEngineMove,
    });

  const { exportPNG, exportGIF } = useExport({
    pgn: state.pgn,
    boardRef,
    gameRef,
    dispatch,
  });

  const syncToStart = useCallback(
    (id: number, odds: Odds) => {
      const pos = chess960.at(id) ?? '';
      syncGame(createGame(applyOdds(toInitialFen(pos), odds)));
    },
    [syncGame]
  );

  const switchBoardMode = useCallback(
    (next: BoardMode) => {
      if (next === 'play' && state.side === 'random') {
        dispatch({
          type: 'SET_SIDE',
          side: Math.random() < 0.5 ? 'white' : 'black',
        });
      }
      dispatch({ type: 'SET_BOARD_MODE', boardMode: next });
      syncToStart(state.positionId, state.odds);
    },
    [state.side, state.positionId, state.odds, syncToStart]
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

  const handlePGNChange = useCallback((value: string) => {
    dispatch({ type: 'SET_PGN', pgn: value });
    const records = recordsFromPgn(value);
    if (!records) return;
    const last = records.at(-1);
    const game = last ? createGame(last.fen) : createGame();
    gameRef.current = game;
    dispatch({
      type: 'LOAD_GAME',
      fen: toFen(game),
      pgn: value,
      moves: records,
    });
  }, []);

  const handle960IdChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const id = Number.parseInt(e.target.value, 10);
      dispatch({ type: 'SET_POSITION_ID', positionId: id });
      syncToStart(id, state.odds);
    },
    [state.odds, syncToStart]
  );

  const randomize960 = useCallback(() => {
    const id = Math.floor(Math.random() * 960);
    dispatch({ type: 'SET_POSITION_ID', positionId: id });
    syncToStart(id, state.odds);
  }, [state.odds, syncToStart]);

  const resetToStart = useCallback(() => {
    dispatch({ type: 'SET_POSITION_ID', positionId: 518 });
    syncToStart(518, state.odds);
  }, [state.odds, syncToStart]);

  const handleOddsChange = useCallback(
    (odds: Odds) => {
      dispatch({ type: 'SET_ODDS', odds });
      syncToStart(state.positionId, odds);
    },
    [state.positionId, syncToStart]
  );

  const handleSideChange = useCallback(
    (side: Side) => {
      dispatch({ type: 'SET_SIDE', side });
      if (state.boardMode === 'play') syncToStart(state.positionId, state.odds);
    },
    [state.boardMode, state.positionId, state.odds, syncToStart]
  );

  const navigateTo = useCallback(
    (index: number) => {
      const clamp = Math.max(-1, Math.min(state.moves.length - 1, index));
      const record = clamp === -1 ? undefined : state.moves[clamp];
      const fen = record?.fen ?? state.startFen;
      gameRef.current = createGame(fen);
      dispatch({ type: 'JUMP_TO', cursor: clamp });
      dispatch({ type: 'SET_PGN', pgn: toPgnFromState(gameRef.current) });
    },
    [state.moves, state.startFen]
  );

  const undo = useCallback(
    () => navigateTo(state.cursor - 1),
    [state.cursor, navigateTo]
  );

  const redo = useCallback(
    () => navigateTo(state.cursor + 1),
    [state.cursor, navigateTo]
  );

  const jumpTo = useCallback(
    (index: number) => navigateTo(index),
    [navigateTo]
  );

  const handlers = useBoardHandlers({
    boardMode: state.boardMode,
    panel: state.panel,
    selectedSquare: state.selectedSquare,
    legalTargets: state.legalTargets,
    setupMode: state.setupMode,
    setupPalette: state.setupPalette,
    humanSide,
    gameRef,
    commitMove,
    dispatch,
  });

  const keyboardEnabled = state.panel !== 'openings' && !state.setupMode;
  const { buffer: keyboardBuffer } = useKeyboardNav({
    enabled: keyboardEnabled,
    onSan: handlers.playSan,
    onUndo: undo,
    onRedo: redo,
  });

  const applySetupGame = useCallback(
    (game: GameState) => syncGame(game),
    [syncGame]
  );

  const setup = useSetup({
    setupFen: state.setupFen,
    dispatch,
    onApplied: applySetupGame,
  });

  const getGame = useCallback(() => gameRef.current, []);
  const linesHook = useAnalysisLines({
    getGame,
    depth: Math.max(3, Math.min(10, state.depth - 4)),
  });
  const graphHook = useEvalHistory({
    startFen: state.startFen,
    moves: state.moves,
    depth: Math.max(3, Math.min(8, state.depth - 6)),
  });

  useEffect(() => {
    if (state.panel !== 'openings') {
      dispatch({ type: 'SET_FEN', fen: toFen(gameRef.current) });
      dispatch({ type: 'SET_PGN', pgn: toPgnFromState(gameRef.current) });
    }
  }, [state.panel]);

  const setFlipped = useCallback(
    (flipped: boolean) => dispatch({ type: 'SET_FLIPPED', flipped }),
    []
  );

  const toggleNotation = useCallback(
    () => dispatch({ type: 'SET_NOTATION', showNotation: !state.showNotation }),
    [state.showNotation]
  );

  const handleThemeChange = useCallback(
    (theme: BoardTheme) => dispatch({ type: 'SET_THEME', theme }),
    []
  );

  const handlePieceSetChange = useCallback(
    (pieceSet: PieceSetKey) => dispatch({ type: 'SET_PIECE_SET', pieceSet }),
    []
  );

  const handleDepthChange = useCallback(
    (depth: number) => dispatch({ type: 'SET_DEPTH', depth }),
    []
  );

  const copyShareLink = useShare({
    fen: state.fen,
    pgn: state.pgn,
    onLoad: ({ fen, pgn }) => {
      if (pgn) handlePGNChange(pgn);
      else if (fen) handleFENChange(fen);
    },
  }).copyShareLink;

  return {
    fen: state.fen,
    startFen: state.startFen,
    boardMode: state.boardMode,
    thinking: state.thinking,
    positionId: state.positionId,
    panel: state.panel,
    pgn: state.pgn,
    gifLoading: state.gifLoading,
    flipped: state.flipped,
    selectedSquare: state.selectedSquare,
    legalTargets: state.legalTargets,
    moves: state.moves,
    cursor: state.cursor,
    depth: state.depth,
    theme: state.theme,
    pieceSet: state.pieceSet,
    showNotation: state.showNotation,
    side: state.side,
    odds: state.odds,
    setupMode: state.setupMode,
    setupFen: state.setupFen,
    setupPalette: state.setupPalette,
    keyboardBuffer,
    boardRef,
    whiteEval,
    evalPercent,
    evalLabel,
    statusLabel,
    dispatch,
    handleFENChange,
    handlePGNChange,
    handle960IdChange,
    randomize960,
    resetToStart,
    switchBoardMode,
    handleOddsChange,
    handleSideChange,
    handleDepthChange,
    setFlipped,
    toggleNotation,
    handleThemeChange,
    handlePieceSetChange,
    undo,
    redo,
    jumpTo,
    onPieceDrop: handlers.onPieceDrop,
    canDragPiece: handlers.canDragPiece,
    onSquareClick: handlers.onSquareClick,
    exportPNG,
    exportGIF,
    copyShareLink,
    setup,
    lines: linesHook.lines,
    linesBusy: linesHook.busy,
    analyzeLines: linesHook.analyze,
    graphPoints: graphHook.points,
    graphBusy: graphHook.busy,
    computeGraph: graphHook.compute,
  };
};
