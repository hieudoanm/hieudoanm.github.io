import { findBestMove, getLegalMoves, makeMove, toSan } from '@chess/ts';
import type { GameState, Move } from '@chess/ts';
import { useCallback, useState } from 'react';

export interface AnalysisLine {
  san: string;
  move: Move;
  scoreCp: number;
  mate: number | null;
}

const MATE = 100_000;
const MATE_WINDOW = 200;

export const useAnalysisLines = (opts: {
  getGame: () => GameState;
  depth: number;
}) => {
  const [lines, setLines] = useState<AnalysisLine[] | null>(null);
  const [busy, setBusy] = useState(false);

  const analyze = useCallback(() => {
    const game = opts.getGame();
    setBusy(true);
    const legal = getLegalMoves(
      game.board,
      game.turn,
      game.castlingRights,
      game.enPassant
    );
    const computed = legal
      .map((move) => {
        const next = makeMove(game, move);
        const result = findBestMove(
          next.board,
          next.turn,
          next.castlingRights,
          next.enPassant,
          { depth: opts.depth }
        );
        const san = toSan(
          game.board,
          move,
          game.turn,
          game.castlingRights,
          game.enPassant
        );
        const raw = game.turn === 'w' ? result.score : -result.score;
        if (Math.abs(result.score) >= MATE - MATE_WINDOW) {
          const plies = MATE - Math.abs(result.score);
          const mate =
            result.score > 0
              ? Math.max(1, Math.ceil(plies / 2))
              : -Math.max(1, Math.ceil(plies / 2));
          return { san, move, scoreCp: raw, mate };
        }
        return { san, move, scoreCp: raw, mate: null };
      })
      .sort((a, b) => b.scoreCp - a.scoreCp)
      .slice(0, 3);
    setLines(computed);
    setBusy(false);
  }, [opts.getGame, opts.depth]);

  return { lines, busy, analyze };
};
