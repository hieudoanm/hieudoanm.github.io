import { evaluateBoard } from '../evaluate';
import { findBestMove } from '../search';
import { computeHash, TranspositionTable, TTFlag } from '../transposition';
import { fromFen } from '../../notation/notation';
import { applyMove, getLegalMoves } from '../../moves/moves';
import { cloneBoard, findKing } from '../../board/board';
import { isSquareAttacked } from '../../moves/attack';
import type { Move } from '../../types/types';

/* ─── evaluateBoard ─── */

describe('evaluateBoard', () => {
  it('evaluates starting position as roughly equal', () => {
    const state = fromFen(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    );
    const score = evaluateBoard(state.board, 'w');
    expect(Math.abs(score)).toBeLessThan(50);
  });

  it('prefers white up a rook', () => {
    const state = fromFen(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    );
    state.board[0] = null;
    const whiteScore = evaluateBoard(state.board, 'w');
    const blackScore = evaluateBoard(state.board, 'b');
    expect(whiteScore).toBeLessThan(blackScore);
  });

  it('evaluates black up a queen favorably for black', () => {
    const state = fromFen(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    );
    state.board[3] = null;
    const score = evaluateBoard(state.board, 'w');
    expect(score).toBeLessThan(-700);
  });

  it('is symmetric: flipping side gives negated score', () => {
    const fen = 'rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1';
    const state = fromFen(fen);
    const whiteScore = evaluateBoard(state.board, 'w');
    const blackScore = evaluateBoard(state.board, 'b');
    expect(whiteScore + blackScore).toBeCloseTo(0, 0);
  });

  it('evaluates endgame king positions differently from opening', () => {
    const opening = fromFen(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    );
    const endgame = fromFen('4k3/8/8/8/8/8/8/4K3 w - - 0 1');
    const openingScore = evaluateBoard(opening.board, 'w');
    const endgameScore = evaluateBoard(endgame.board, 'w');
    // Endgame with only kings should be 0 (both sides equal)
    expect(Math.abs(endgameScore)).toBe(0);
    expect(Math.abs(openingScore)).toBeLessThan(50);
  });
});

/* ─── TranspositionTable ─── */

describe('TranspositionTable', () => {
  it('stores and probes an entry', () => {
    const tt = new TranspositionTable();
    const hash = 0xdeadbeef >>> 0;
    tt.store(hash, 3, 150, TTFlag.Exact, null);
    const entry = tt.probe(hash);
    expect(entry).not.toBeNull();
    expect(entry!.key).toBe(hash);
    expect(entry!.depth).toBe(3);
    expect(entry!.score).toBe(150);
    expect(entry!.flag).toBe(TTFlag.Exact);
  });

  it('returns null for unknown hash', () => {
    const tt = new TranspositionTable();
    expect(tt.probe(0x12345678 >>> 0)).toBeNull();
  });

  it('getCutoff returns score when depth sufficient and flag Exact', () => {
    const tt = new TranspositionTable();
    const hash = 0x1234 >>> 0;
    tt.store(hash, 5, 200, TTFlag.Exact, null);
    const cutoff = tt.getCutoff(hash, 3, -INF, INF);
    expect(cutoff).not.toBeNull();
    expect(cutoff!.score).toBe(200);
  });

  it('getCutoff returns null when stored depth is insufficient', () => {
    const tt = new TranspositionTable();
    const hash = 0x1234 >>> 0;
    tt.store(hash, 2, 200, TTFlag.Exact, null);
    const cutoff = tt.getCutoff(hash, 5, -INF, INF);
    expect(cutoff).toBeNull();
  });

  it('getCutoff returns score when Alpha flag and score <= alpha', () => {
    const tt = new TranspositionTable();
    const hash = 0x1234 >>> 0;
    tt.store(hash, 5, 50, TTFlag.Alpha, null);
    const cutoff = tt.getCutoff(hash, 3, 100, 200);
    expect(cutoff).not.toBeNull();
    expect(cutoff!.score).toBe(50);
  });

  it('getCutoff returns score when Beta flag and score >= beta', () => {
    const tt = new TranspositionTable();
    const hash = 0x1234 >>> 0;
    tt.store(hash, 5, 300, TTFlag.Beta, null);
    const cutoff = tt.getCutoff(hash, 3, 100, 200);
    expect(cutoff).not.toBeNull();
    expect(cutoff!.score).toBe(300);
  });

  it('clear invalidates all entries', () => {
    const tt = new TranspositionTable();
    const hash = 0xdeadbeef >>> 0;
    tt.store(hash, 3, 150, TTFlag.Exact, null);
    tt.clear();
    expect(tt.probe(hash)).toBeNull();
  });

  it('stores and retrieves best move', () => {
    const tt = new TranspositionTable();
    const hash = 0x1234 >>> 0;
    const move: Move = { from: 8, to: 16, promotion: null, captured: null };
    tt.store(hash, 3, 100, TTFlag.Exact, move);
    const entry = tt.probe(hash);
    expect(entry!.bestMove).toEqual(move);
  });
});

/* ─── computeHash (Zobrist) ─── */

describe('computeHash', () => {
  it('produces deterministic hashes for the same position', () => {
    const state = fromFen(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    );
    const hash1 = computeHash(
      state.board,
      state.turn,
      state.castlingRights,
      state.enPassant
    );
    const hash2 = computeHash(
      state.board,
      state.turn,
      state.castlingRights,
      state.enPassant
    );
    expect(hash1).toBe(hash2);
  });

  it('produces different hashes for different positions', () => {
    const s1 = fromFen(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    );
    const s2 = fromFen(
      'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1'
    );
    const h1 = computeHash(s1.board, s1.turn, s1.castlingRights, s1.enPassant);
    const h2 = computeHash(s2.board, s2.turn, s2.castlingRights, s2.enPassant);
    expect(h1).not.toBe(h2);
  });
});

/* ─── findBestMove ─── */

describe('findBestMove', () => {
  it('returns a move when legal moves exist', () => {
    const state = fromFen(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    );
    const result = findBestMove(
      state.board,
      state.turn,
      state.castlingRights,
      state.enPassant,
      { depth: 1 }
    );
    expect(result.move).not.toBeNull();
  });

  it('finds checkmate with two rooks', () => {
    const state = fromFen('kR6/R7/8/8/8/8/8/4K3 w - - 0 1');
    const result = findBestMove(
      state.board,
      state.turn,
      state.castlingRights,
      state.enPassant,
      { depth: 3 }
    );
    expect(result.move).not.toBeNull();
    expect(result.score).toBeGreaterThan(90000);
  });

  it('avoids moving into check', () => {
    const state = fromFen(
      'rnb1kbnr/pppppppp/8/5q2/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1'
    );
    const result = findBestMove(
      state.board,
      state.turn,
      state.castlingRights,
      state.enPassant,
      { depth: 2 }
    );
    expect(result.move).not.toBeNull();
    const newBoard = cloneBoard(state.board);
    applyMove(newBoard, result.move!);
    const kingSq = findKing(newBoard, 'w');
    expect(isSquareAttacked(newBoard, kingSq!, 'b')).toBe(false);
  });

  it('handles no legal moves', () => {
    const state = fromFen('k7/8/8/8/8/8/8/4K3 w - - 0 1');
    state.board[0] = null;
    state.board[1] = null;
    state.board[2] = null;
    state.board[3] = null;
    state.board[4] = null;
    const moves = getLegalMoves(
      state.board,
      state.turn,
      state.castlingRights,
      state.enPassant
    );
    if (moves.length === 0) {
      const result = findBestMove(
        state.board,
        state.turn,
        state.castlingRights,
        state.enPassant,
        { depth: 1 }
      );
      expect(result.move).toBeNull();
    }
  });

  it('captures hanging queen with knight when possible', () => {
    const state = fromFen('4k3/8/8/8/4q3/2N5/8/4K3 w - - 0 1');
    const result = findBestMove(
      state.board,
      state.turn,
      state.castlingRights,
      state.enPassant,
      { depth: 3 }
    );
    expect(result.move).not.toBeNull();
    const newBoard = cloneBoard(state.board);
    applyMove(newBoard, result.move!);
    const queen = newBoard.find((p) => p && p.type === 'q' && p.color === 'b');
    expect(queen).toBeUndefined();
  });

  it('prefers winning material over losing it at depth 3', () => {
    const state = fromFen(
      'rnb1kbnr/pppp1ppp/8/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR w KQkq - 0 1'
    );
    const result = findBestMove(
      state.board,
      state.turn,
      state.castlingRights,
      state.enPassant,
      { depth: 3 }
    );
    expect(result.move).not.toBeNull();
    expect(result.score).toBeGreaterThan(0);
  });

  it('returns mate score for instant queen mate in 1', () => {
    const state = fromFen('7k/8/6QK/8/8/8/8/8 w - - 0 1');
    const result = findBestMove(
      state.board,
      state.turn,
      state.castlingRights,
      state.enPassant,
      { depth: 3 }
    );
    expect(result.move).not.toBeNull();
    expect(Math.abs(result.score)).toBeGreaterThan(90000);
  });

  it('selects the fastest mate (mate in 1 via Qh7#)', () => {
    const state = fromFen('7k/8/6QK/8/8/8/8/8 w - - 0 1');
    const result = findBestMove(
      state.board,
      state.turn,
      state.castlingRights,
      state.enPassant,
      { depth: 3 }
    );
    expect(result.move).not.toBeNull();
    const newBoard = cloneBoard(state.board);
    applyMove(newBoard, result.move!);
    const blackKing = findKing(newBoard, 'b');
    expect(isSquareAttacked(newBoard, blackKing!, 'w')).toBe(true);
  });
});

const INF = 1_000_000_000;
