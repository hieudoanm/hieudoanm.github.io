import { createGame, fromPgn, fromSan, makeMove, toFen } from '@chess/ts';
import type { GameState } from '@chess/ts';
import type { MoveRecord } from '../types';

export const recordsFromPgn = (pgn: string): MoveRecord[] | null => {
  const game = fromPgn(pgn)[0];
  if (!game) return null;
  let state: GameState = createGame();
  const records: MoveRecord[] = [];
  for (const sanMove of game.moves) {
    const move = fromSan(
      sanMove.san,
      state.board,
      state.turn,
      state.castlingRights,
      state.enPassant
    );
    if (!move) return null;
    state = makeMove(state, move);
    records.push({ san: sanMove.san, fen: toFen(state) });
  }
  return records;
};
