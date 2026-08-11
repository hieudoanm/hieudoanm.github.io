import { createGame, findBestMove } from '@chess/ts';
import { useCallback, useState } from 'react';
import type { MoveRecord } from '../types';

export interface EvalPoint {
  moveNumber: number;
  san: string;
  evalCp: number;
}

export const useEvalHistory = (opts: {
  startFen: string;
  moves: MoveRecord[];
  depth: number;
}) => {
  const [points, setPoints] = useState<EvalPoint[] | null>(null);
  const [busy, setBusy] = useState(false);

  const compute = useCallback(() => {
    setBusy(true);
    const fens = [opts.startFen, ...opts.moves.map((m) => m.fen)];
    const next: EvalPoint[] = fens.map((fen, i) => {
      const game = createGame(fen);
      const result = findBestMove(
        game.board,
        game.turn,
        game.castlingRights,
        game.enPassant,
        { depth: opts.depth }
      );
      const cp = game.turn === 'w' ? result.score : -result.score;
      return {
        moveNumber: i,
        san: i === 0 ? 'Start' : (opts.moves[i - 1]?.san ?? ''),
        evalCp: cp,
      };
    });
    setPoints(next);
    setBusy(false);
  }, [opts.startFen, opts.moves, opts.depth]);

  return { points, busy, compute };
};
