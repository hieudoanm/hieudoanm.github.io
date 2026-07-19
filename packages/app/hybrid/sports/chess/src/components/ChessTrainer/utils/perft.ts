import type { GameState } from '@chess/ts';
import { createGame, divide, perft } from '@chess/ts';

export interface PerftResult {
  nodes: number;
  depth: number;
  fen: string;
}

export const runPerft = (fen: string, depth: number): PerftResult => {
  const state: GameState = createGame(fen);
  const capped = Math.min(Math.max(1, depth), 4);
  const nodes = perft(state, capped);
  return { nodes, depth: capped, fen };
};

export const runDivide = (
  fen: string,
  depth: number
): Record<string, number> => {
  const state: GameState = createGame(fen);
  const capped = Math.min(Math.max(1, depth), 4);
  return divide(state, capped);
};

export const DEFAULT_PERFT_FENS = [
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  'r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1',
  '8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1',
];
