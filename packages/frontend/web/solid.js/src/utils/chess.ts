import { Chess } from 'chess.js';

export const getMovesFromPGN = (pgn: string): string[] => {
  const chess = new Chess();
  chess.loadPgn(pgn);
  const moves = chess.history();
  return moves;
};
