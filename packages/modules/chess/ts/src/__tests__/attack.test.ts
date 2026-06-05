import { isSquareAttacked, isInCheck } from '../attack';
import { boardFromFen } from '../board';

describe('isSquareAttacked', () => {
  it('starting position: e5 not attacked by white', () => {
    const board = boardFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    expect(isSquareAttacked(board, 36, 'w')).toBe(false);
  });

  it('fools mate: queen on h4 attacks e1', () => {
    const board = boardFromFen(
      'rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR'
    );
    expect(isSquareAttacked(board, 4, 'b')).toBe(true);
  });

  it('bishop on f8 attacks g7', () => {
    const board = boardFromFen(
      'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R'
    );
    expect(isSquareAttacked(board, 54, 'b')).toBe(true);
  });

  it('queen on d8 attacks d6', () => {
    const board = boardFromFen(
      'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R'
    );
    expect(isSquareAttacked(board, 43, 'b')).toBe(true);
  });
});

describe('isInCheck', () => {
  it('starting position: not in check', () => {
    const board = boardFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    expect(isInCheck(board, 'w')).toBe(false);
    expect(isInCheck(board, 'b')).toBe(false);
  });

  it('fools mate: white king in check', () => {
    const board = boardFromFen(
      'rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR'
    );
    expect(isInCheck(board, 'w')).toBe(true);
  });

  it('scholars mate: black king in check after Qxf7', () => {
    const board = boardFromFen(
      'r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR'
    );
    expect(isInCheck(board, 'b')).toBe(true);
  });

  it('queen on f7 attacks e8 diagonally', () => {
    const board = boardFromFen(
      'r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR'
    );
    expect(isSquareAttacked(board, 60, 'w')).toBe(true);
  });
});
