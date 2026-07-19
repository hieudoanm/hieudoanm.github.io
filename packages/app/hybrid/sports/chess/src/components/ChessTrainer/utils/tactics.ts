import type { GameState } from '@chess/ts';
import { createGame, findBestMove, toSan } from '@chess/ts';

export interface BestMove {
  san: string;
  from: number | string;
  to: number | string;
  score: number;
  mate: boolean;
}

export const bestMoveFrom = (state: GameState, depth = 12): BestMove | null => {
  const result = findBestMove(
    state.board,
    state.turn,
    state.castlingRights,
    state.enPassant,
    { depth }
  );
  if (!result.move) return null;
  return {
    san: toSan(
      state.board,
      result.move,
      state.turn,
      state.castlingRights,
      state.enPassant
    ),
    from: result.move.from,
    to: result.move.to,
    score: result.score,
    mate: result.score > 20000 || result.score < -20000,
  };
};

export const isBestMove = (
  state: GameState,
  from: string,
  to: string,
  depth = 12
): boolean => {
  const best = bestMoveFrom(state, depth);
  if (!best) return false;
  return String(best.from) === from && String(best.to) === to;
};

export const isClearTactic = (fen: string, depth = 12): boolean => {
  const best = bestMoveFrom(createGame(fen), depth);
  if (!best) return false;
  return best.score > 150 || best.mate;
};

export const moveSanFor = (
  state: GameState,
  from: string,
  to: string
): string | null => {
  const best = bestMoveFrom(state, 12);
  if (!best) return null;
  if (String(best.from) === from && String(best.to) === to) return best.san;
  return null;
};
