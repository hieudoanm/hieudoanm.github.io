import type {
  Board,
  CastlingRights,
  Color,
  Move,
  Square,
} from '../types/types';
import { getFile } from '../utils/utils';

const nextU32 = (state: number): [number, number] => {
  let s = state | 0;
  s = (s + 0x7f4a7c15) | 0;
  let z = s;
  z = (z ^ (z >>> 16)) | 0;
  z = (z * 0xbf5847) | 0;
  z = (z ^ (z >>> 16)) | 0;
  return [z, s];
};

interface ZobristKeys {
  pieceKeys: number[][][];
  sideKey: number;
  castlingKeys: number[];
  epKeys: number[];
}

const initZobrist = (): ZobristKeys => {
  let state = 123456789;
  const next = (): number => {
    const [v, ns] = nextU32(state);
    state = ns;
    return v >>> 0;
  };

  const pieceKeys: number[][][] = [];
  for (let pt = 0; pt < 6; pt++) {
    pieceKeys[pt] = [];
    for (let c = 0; c < 2; c++) {
      pieceKeys[pt]![c] = [];
      for (let sq = 0; sq < 64; sq++) {
        pieceKeys[pt]![c]![sq] = next();
      }
    }
  }

  const sideKey = next();
  const castlingKeys = [next(), next(), next(), next()];
  const epKeys = [
    next(),
    next(),
    next(),
    next(),
    next(),
    next(),
    next(),
    next(),
  ];

  return { pieceKeys, sideKey, castlingKeys, epKeys };
};

let cache: ZobristKeys | null = null;
const z = (): ZobristKeys => {
  if (!cache) cache = initZobrist();
  return cache;
};

export const computeHash = (
  board: Board,
  turn: Color,
  castlingRights: CastlingRights,
  enPassant: Square | null
): number => {
  const keys = z();
  let hash = 0;
  const ptIdx: Record<string, number> = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 };
  for (let sq = 0; sq < 64; sq++) {
    const piece = board[sq];
    if (piece) {
      const piecesByType = keys.pieceKeys[ptIdx[piece.type]!];
      if (piecesByType) {
        const piecesByColor = piecesByType[piece.color === 'w' ? 0 : 1];
        if (piecesByColor) hash ^= piecesByColor[sq]!;
      }
    }
  }
  if (turn === 'b') hash ^= keys.sideKey;
  if (castlingRights.K) hash ^= keys.castlingKeys[0]!;
  if (castlingRights.Q) hash ^= keys.castlingKeys[1]!;
  if (castlingRights.k) hash ^= keys.castlingKeys[2]!;
  if (castlingRights.q) hash ^= keys.castlingKeys[3]!;
  if (enPassant !== null) hash ^= keys.epKeys[getFile(enPassant)]!;
  return hash >>> 0;
};

export enum TTFlag {
  Exact,
  Alpha,
  Beta,
}

export interface TTEntry {
  key: number;
  depth: number;
  score: number;
  flag: TTFlag;
  bestMove: Move | null;
}

const TT_SIZE = 1 << 20;

export class TranspositionTable {
  entries: TTEntry[];

  constructor() {
    this.entries = [];
    for (let i = 0; i < TT_SIZE; i++) {
      this.entries[i] = {
        key: 0,
        depth: 0,
        score: 0,
        flag: TTFlag.Exact,
        bestMove: null,
      };
    }
  }

  private index(hash: number): number {
    return hash & (TT_SIZE - 1);
  }

  probe(hash: number): TTEntry | null {
    const entry = this.entries[this.index(hash)];
    if (!entry || entry.key !== hash) return null;
    return entry;
  }

  getCutoff(
    hash: number,
    depth: number,
    alpha: number,
    beta: number
  ): { score: number; bestMove: Move | null } | null {
    const entry = this.probe(hash);
    if (!entry || entry.depth < depth) return null;
    if (entry.flag === TTFlag.Exact)
      return { score: entry.score, bestMove: entry.bestMove };
    if (entry.flag === TTFlag.Alpha && entry.score <= alpha)
      return { score: entry.score, bestMove: entry.bestMove };
    if (entry.flag === TTFlag.Beta && entry.score >= beta)
      return { score: entry.score, bestMove: entry.bestMove };
    return null;
  }

  store(
    hash: number,
    depth: number,
    score: number,
    flag: TTFlag,
    bestMove: Move | null
  ): void {
    const idx = this.index(hash);
    this.entries[idx] = { key: hash, depth, score, flag, bestMove };
  }

  clear(): void {
    for (let i = 0; i < TT_SIZE; i++) {
      const entry = this.entries[i];
      if (entry) entry.key = 0;
    }
  }
}
