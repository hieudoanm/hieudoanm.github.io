import { parseFENFields, stringifyFENFields } from '../fen';
import type { FENFields } from '../fen';

describe('parseFENFields', () => {
  it('parses a valid FEN string', () => {
    const fenStr = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    const fen = parseFENFields(fenStr);

    expect(fen).toEqual<FENFields>({
      piecePlacement: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
      activeColor: 'w',
      castlingAvailability: 'KQkq',
      enPassantTarget: '-',
      halfMoveClock: 0,
      fullMoveNumber: 1,
    });
  });

  it('throws on invalid FEN (wrong field count)', () => {
    expect(() => parseFENFields('invalid fen string')).toThrow('Invalid FEN');
  });

  it('throws on invalid active color', () => {
    expect(() => parseFENFields('8/8/8/8/8/8/8/8 x - - 0 1')).toThrow(
      'active color'
    );
  });
});

describe('stringifyFENFields', () => {
  it('stringifies a FENFields object back to string', () => {
    const fen: FENFields = {
      piecePlacement: '8/8/8/8/8/8/8/8',
      activeColor: 'b',
      castlingAvailability: '-',
      enPassantTarget: '-',
      halfMoveClock: 12,
      fullMoveNumber: 34,
    };

    const result = stringifyFENFields(fen);
    expect(result).toBe('8/8/8/8/8/8/8/8 b - - 12 34');
  });

  it('round-trips parse → stringify → parse', () => {
    const original =
      'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3';
    const parsed = parseFENFields(original);
    const stringified = stringifyFENFields(parsed);
    const reparsed = parseFENFields(stringified);
    expect(reparsed).toEqual(parsed);
  });
});
