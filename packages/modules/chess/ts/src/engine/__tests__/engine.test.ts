import { evaluateBoard } from '../evaluate';
import { findBestMove } from '../search';
import { fromFen } from '../../notation/notation';
import { applyMove, getLegalMoves } from '../../moves/moves';
import { cloneBoard, findKing } from '../../board/board';
import { isSquareAttacked } from '../../moves/attack';

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
});

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
});
