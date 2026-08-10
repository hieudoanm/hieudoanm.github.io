import { useCallback } from 'react';
import type { MutableRefObject, RefObject } from 'react';
import type { GameState } from '@chess/ts';
import { createGame, fromPgn, fromSan, makeMove, toFen } from '@chess/ts';
import { download } from '@hieudoanm.github.io/utils/canvas';
import html2canvas from 'html2canvas-pro';
import type { BoardAction, BoardState } from './boardReducer';
import { downloadGIF } from '../utils/eco';

interface ExportDeps {
  pgn: BoardState['pgn'];
  boardRef: RefObject<HTMLDivElement | null>;
  gameRef: MutableRefObject<GameState>;
  dispatch: React.Dispatch<BoardAction>;
}

export const useExport = ({ pgn, boardRef, gameRef, dispatch }: ExportDeps) => {
  const exportPNG = useCallback(() => {
    download({ ref: boardRef, output: 'chess-position' });
  }, [boardRef]);

  const exportGIF = useCallback(async () => {
    if (!pgn) return;
    dispatch({ type: 'SET_GIF_LOADING', gifLoading: true });

    const games = fromPgn(pgn);
    const sanMoves = games[0]?.moves ?? [];
    let gameState = createGame();
    const base64s: string[] = [];

    for (const sanMove of sanMoves) {
      const move = fromSan(
        sanMove.san,
        gameState.board,
        gameState.turn,
        gameState.castlingRights,
        gameState.enPassant
      );
      if (!move) break;
      gameState = makeMove(gameState, move);
      gameRef.current = gameState;
      dispatch({ type: 'SET_FEN', fen: toFen(gameState) });
      if (boardRef.current) {
        const canvas = await html2canvas(boardRef.current);
        base64s.push(canvas.toDataURL('image/png'));
      }
    }

    await downloadGIF({ base64s, pgn });
    dispatch({ type: 'SET_GIF_LOADING', gifLoading: false });
  }, [pgn, boardRef, gameRef, dispatch]);

  return { exportPNG, exportGIF };
};
