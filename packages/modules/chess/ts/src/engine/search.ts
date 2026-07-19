import type {
  Board,
  Move,
  Color,
  Square,
  CastlingRights,
} from '../types/types';
import { cloneBoard } from '../board/board';
import { getLegalMoves, applyMove } from '../moves/moves';
import { isInCheck } from '../moves/attack';
import { getRank, getFile, toSquare } from '../utils/utils';
import { updateCastlingRights } from '../game/game';
import { evaluateBoard } from './evaluate';
import { computeHash, TranspositionTable, TTFlag } from './transposition';

const INF = 1_000_000_000;
const MATE_SCORE = 100_000;
const MAX_DEPTH = 64;
const NULL_MOVE_REDUCTION = 3;

export interface SearchResult {
  move: Move | null;
  score: number;
  depth: number;
  nodes: number;
}

type SearchLimits = {
  depth?: number;
  timeMs?: number;
};

let nodeCount = 0;
let startTime = 0;
let timeLimit = 0;
let stop = false;
const tt = new TranspositionTable();

const resetSearch = (limits: SearchLimits): void => {
  nodeCount = 0;
  stop = false;
  startTime = Date.now();
  timeLimit = limits.timeMs ?? 0;
};

const timeUp = (): boolean => {
  if (stop) return true;
  if (timeLimit > 0 && Date.now() - startTime >= timeLimit) {
    stop = true;
  }
  return stop;
};

const applyEngineMove = (
  board: Board,
  turn: Color,
  castlingRights: CastlingRights,
  enPassant: Square | null,
  move: Move
): {
  board: Board;
  turn: Color;
  castlingRights: CastlingRights;
  enPassant: Square | null;
} => {
  const newBoard = cloneBoard(board);
  applyMove(newBoard, move);

  const piece = board[move.from]!;
  const newCastlingRights = updateCastlingRights(castlingRights, move, board);

  let newEnPassant: Square | null = null;
  if (
    piece.type === 'p' &&
    Math.abs(getRank(move.to) - getRank(move.from)) === 2
  ) {
    newEnPassant = toSquare(
      (getRank(move.from) + getRank(move.to)) / 2,
      getFile(move.from)
    );
  }

  const newTurn: Color = turn === 'w' ? 'b' : 'w';

  return {
    board: newBoard,
    turn: newTurn,
    castlingRights: newCastlingRights,
    enPassant: newEnPassant,
  };
};

const PIECE_VALS: Record<string, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

const moveValue = (move: Move): number => {
  if (move.captured) {
    const v = PIECE_VALS[move.captured.type] ?? 0;
    const a = move.promotion ? 900 : (PIECE_VALS[move.promotion ?? 'p'] ?? 0);
    return v * 10 - a;
  }
  if (move.promotion) return 900;
  return 0;
};

const orderMoves = (moves: Move[], ttBest: Move | null): Move[] =>
  [...moves].sort((a, b) => {
    if (
      ttBest &&
      a.from === ttBest.from &&
      a.to === ttBest.to &&
      a.promotion === ttBest.promotion
    )
      return -1;
    if (
      ttBest &&
      b.from === ttBest.from &&
      b.to === ttBest.to &&
      b.promotion === ttBest.promotion
    )
      return 1;
    return moveValue(b) - moveValue(a);
  });

const quiescence = (
  board: Board,
  turn: Color,
  castlingRights: CastlingRights,
  enPassant: Square | null,
  alpha: number,
  beta: number,
  maxDepth: number,
  ply: number = 0
): number => {
  if (timeUp()) return 0;

  nodeCount++;

  const allMoves = getLegalMoves(board, turn, castlingRights, enPassant);
  if (allMoves.length === 0) {
    if (isInCheck(board, turn)) {
      return -(MATE_SCORE - ply);
    }
    return evaluateBoard(board, turn);
  }

  if (maxDepth <= 0) {
    return evaluateBoard(board, turn);
  }

  const standPat = evaluateBoard(board, turn);

  if (standPat >= beta) return beta;
  if (standPat > alpha) alpha = standPat;

  const tacticalMoves = orderMoves(
    allMoves.filter((m) => m.captured || m.promotion || isInCheck(board, turn)),
    null
  );

  if (tacticalMoves.length === 0) return alpha;

  for (const move of tacticalMoves) {
    const next = applyEngineMove(board, turn, castlingRights, enPassant, move);
    const score = -quiescence(
      next.board,
      next.turn,
      next.castlingRights,
      next.enPassant,
      -beta,
      -alpha,
      maxDepth - 1,
      ply + 1
    );
    if (score >= beta) return beta;
    if (score > alpha) alpha = score;
  }

  return alpha;
};

const hasNonPawn = (board: Board, turn: Color): boolean => {
  for (let sq = 0; sq < 64; sq++) {
    const piece = board[sq];
    if (
      piece &&
      piece.color === turn &&
      piece.type !== 'k' &&
      piece.type !== 'p'
    )
      return true;
  }
  return false;
};

const alphaBeta = (
  board: Board,
  turn: Color,
  castlingRights: CastlingRights,
  enPassant: Square | null,
  depth: number,
  ply: number,
  alpha: number,
  beta: number,
  inNull: boolean = false
): number => {
  if (ply > 0 && timeUp()) return 0;

  const hash = computeHash(board, turn, castlingRights, enPassant);

  if (depth > 0 && !inNull) {
    const cutoff = tt.getCutoff(hash, depth, alpha, beta);
    if (cutoff) return cutoff.score;
  }

  const check = isInCheck(board, turn);
  nodeCount++;

  const ttEntry = tt.probe(hash);
  const ttBest: Move | null = ttEntry ? ttEntry.bestMove : null;

  // Null-move pruning
  if (
    depth >= NULL_MOVE_REDUCTION + 1 &&
    !check &&
    !inNull &&
    hasNonPawn(board, turn)
  ) {
    const nextTurn: Color = turn === 'w' ? 'b' : 'w';
    const nullScore = -alphaBeta(
      board,
      nextTurn,
      castlingRights,
      enPassant,
      depth - NULL_MOVE_REDUCTION,
      ply + 1,
      -beta,
      -beta + 1,
      true
    );
    if (nullScore >= beta) return beta;
  }

  const moves = orderMoves(
    getLegalMoves(board, turn, castlingRights, enPassant),
    ttBest
  );

  if (moves.length === 0) {
    const score = check ? -(MATE_SCORE - ply) : 0;
    tt.store(hash, depth, score, TTFlag.Exact, null);
    return score;
  }

  if (depth === 0) {
    const score = quiescence(
      board,
      turn,
      castlingRights,
      enPassant,
      alpha,
      beta,
      3
    );
    tt.store(hash, depth, score, TTFlag.Exact, null);
    return score;
  }

  let bestMove: Move | null = null;
  let bestScore = alpha;
  let flag = TTFlag.Alpha;

  for (const move of moves) {
    const next = applyEngineMove(board, turn, castlingRights, enPassant, move);
    const score = -alphaBeta(
      next.board,
      next.turn,
      next.castlingRights,
      next.enPassant,
      depth - 1,
      ply + 1,
      -beta,
      -alpha,
      false
    );

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
    if (score >= beta) {
      tt.store(hash, depth, score, TTFlag.Beta, bestMove);
      return beta;
    }
    if (score > alpha) {
      alpha = score;
      flag = TTFlag.Exact;
    }
  }

  tt.store(hash, depth, bestScore, flag, bestMove);
  return bestScore;
};

export const findBestMove = (
  board: Board,
  turn: Color,
  castlingRights: CastlingRights,
  enPassant: Square | null,
  limits: SearchLimits = {}
): SearchResult => {
  resetSearch(limits);

  const moves = getLegalMoves(board, turn, castlingRights, enPassant);
  if (moves.length === 0) return { move: null, score: 0, depth: 0, nodes: 0 };

  const maxDepth = limits.depth ?? MAX_DEPTH;
  let bestMove: Move = moves[0]!;
  let bestScore = -INF;

  tt.clear();

  for (let depth = 1; depth <= maxDepth; depth++) {
    if (timeUp()) break;

    let currentBest: Move = moves[0]!;
    let alpha = -INF;
    const beta = INF;

    const ttEntry = tt.probe(
      computeHash(board, turn, castlingRights, enPassant)
    );
    const orderedMoves = orderMoves(moves, ttEntry ? ttEntry.bestMove : null);

    for (const move of orderedMoves) {
      if (timeUp()) break;

      const next = applyEngineMove(
        board,
        turn,
        castlingRights,
        enPassant,
        move
      );
      const score = -alphaBeta(
        next.board,
        next.turn,
        next.castlingRights,
        next.enPassant,
        depth - 1,
        1,
        -beta,
        -alpha,
        false
      );

      if (score > alpha) {
        alpha = score;
        currentBest = move;
      }
    }

    if (!timeUp() || depth === 1) {
      bestMove = currentBest;
      bestScore = alpha;
    }

    if (Math.abs(alpha) >= MATE_SCORE - MAX_DEPTH) break;
  }

  return {
    move: bestMove,
    score: bestScore,
    depth: maxDepth,
    nodes: nodeCount,
  };
};
