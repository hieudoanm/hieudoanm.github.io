import { Chess } from 'chess.js';

export const getMoves = (pgn: string): string[] => {
  const chess = new Chess();
  chess.loadPgn(pgn);
  const moves = chess.history();
  return moves;
};

export const getHeaders = (pgn: string): Record<string, string> => {
  const chess = new Chess();
  chess.loadPgn(pgn);
  const headers = chess.getHeaders();
  return headers;
};
