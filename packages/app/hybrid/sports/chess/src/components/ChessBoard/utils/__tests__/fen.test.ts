import { applyOdds, emptyFen, setSquareFen } from '../fen';

describe('emptyFen', () => {
  it('returns a valid empty board FEN', () => {
    const fen = emptyFen();
    expect(fen).toBe('8/8/8/8/8/8/8/8 w - - 0 1');
    expect(fen.split(' ')).toHaveLength(6);
  });
});

describe('setSquareFen', () => {
  it('places a white piece on an empty square', () => {
    const fen = emptyFen();
    const result = setSquareFen(fen, 'e4', 'Pw');
    const boardPart = result.split(' ')[0];
    expect(boardPart).toContain('P');
  });

  it('places a black piece (lowercase type + b)', () => {
    const fen = emptyFen();
    const result = setSquareFen(fen, 'a1', 'qb');
    const boardPart = result.split(' ')[0];
    expect(boardPart).toContain('q');
  });

  it('removes a piece with null on empty board', () => {
    const fen = emptyFen();
    const placed = setSquareFen(fen, 'e4', 'Pw');
    const removed = setSquareFen(placed, 'e4', null);
    expect(removed.split(' ')[0]).not.toContain('P');
  });

  it('returns original FEN for invalid square', () => {
    const fen = emptyFen();
    expect(setSquareFen(fen, 'z9', 'Pw')).toBe(fen);
  });

  it('returns original FEN for invalid rank count', () => {
    const fen = '8/8/8 w - - 0 1';
    expect(setSquareFen(fen, 'a1', 'Pw')).toBe(fen);
  });

  it('handles square a1 (rank 1, file a)', () => {
    const fen = emptyFen();
    const result = setSquareFen(fen, 'a1', 'Kw');
    const boardPart = result.split(' ')[0];
    expect(boardPart).toContain('K');
  });

  it('handles square h8 (rank 8, file h)', () => {
    const fen = emptyFen();
    const result = setSquareFen(fen, 'h8', 'qb');
    const boardPart = result.split(' ')[0];
    expect(boardPart).toContain('q');
  });
});

describe('applyOdds', () => {
  it('returns FEN unchanged for odds none', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1';
    expect(applyOdds(fen, 'none')).toBe(fen);
  });

  it('removes a white queen for queen odds', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    const result = applyOdds(fen, 'queen');
    const boardPart = result.split(' ')[0];
    expect(boardPart).not.toContain('Q');
  });

  it('removes a white rook for rook odds (single R)', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/1NBQKBNR w KQkq - 0 1';
    const result = applyOdds(fen, 'rook');
    const boardPart = result.split(' ')[0];
    expect(boardPart).not.toContain('R');
  });

  it('removes a white knight for knight odds (single N)', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/R1BQKBNR w KQkq - 0 1';
    const result = applyOdds(fen, 'knight');
    const boardPart = result.split(' ')[0];
    expect(boardPart).not.toContain('N');
  });

  it('removes a white bishop for bishop odds (single B)', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RN1QKBNR w KQkq - 0 1';
    const result = applyOdds(fen, 'bishop');
    const boardPart = result.split(' ')[0];
    expect(boardPart).not.toContain('B');
  });

  it('returns FEN unchanged when piece not found on back ranks', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/1N1QKBN1 w KQkq - 0 1';
    const result = applyOdds(fen, 'rook');
    expect(result).toBe(fen);
  });
});
