import {
  parseFEN,
  stringifyFEN,
  moveToUCI,
  parseUCI,
  moveToSAN,
} from '../notation';
import { createGame, makeMove } from '../game';
import type { Move } from '../types';

describe('parseFEN', () => {
  it('parses starting position', () => {
    const state = parseFEN(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    );
    expect(state.turn).toBe('w');
    expect(state.castlingRights.K).toBe(true);
    expect(state.castlingRights.k).toBe(true);
    expect(state.enPassant).toBeNull();
    expect(state.halfMoveClock).toBe(0);
    expect(state.fullMoveNumber).toBe(1);
  });

  it('parses black to move with en passant', () => {
    const state = parseFEN(
      'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'
    );
    expect(state.turn).toBe('b');
    expect(state.enPassant).not.toBeNull();
  });

  it('parses no castling rights', () => {
    const state = parseFEN(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1'
    );
    expect(state.castlingRights.K).toBe(false);
    expect(state.castlingRights.Q).toBe(false);
    expect(state.castlingRights.k).toBe(false);
    expect(state.castlingRights.q).toBe(false);
  });
});

describe('stringifyFEN', () => {
  it('round-trips starting position', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    const state = parseFEN(fen);
    expect(stringifyFEN(state)).toBe(fen);
  });

  it('round-trips a mid-game position', () => {
    const fen =
      'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4';
    const state = parseFEN(fen);
    expect(stringifyFEN(state)).toBe(fen);
  });

  it('round-trips after a move', () => {
    const game = createGame();
    const after = makeMove(game, {
      from: 12,
      to: 28,
      promotion: null,
      captured: null,
    });
    const reparsed = parseFEN(stringifyFEN(after));
    expect(reparsed.turn).toBe('b');
  });
});

describe('moveToUCI', () => {
  it('converts e2e4', () => {
    const move: Move = { from: 12, to: 28, promotion: null, captured: null };
    expect(moveToUCI(move)).toBe('e2e4');
  });

  it('converts promotion', () => {
    const move: Move = { from: 48, to: 56, promotion: 'q', captured: null };
    expect(moveToUCI(move)).toBe('a7a8q');
  });
});

describe('parseUCI', () => {
  it('parses e2e4', () => {
    const move = parseUCI('e2e4');
    expect(move).not.toBeNull();
    expect(move!.from).toBe(12);
    expect(move!.to).toBe(28);
  });

  it('parses a7a8q promotion', () => {
    const move = parseUCI('a7a8q');
    expect(move).not.toBeNull();
    expect(move!.promotion).toBe('q');
  });

  it('returns null for invalid', () => {
    expect(parseUCI('e2')).toBeNull();
    expect(parseUCI('e2z9')).toBeNull();
  });
});

describe('moveToSAN', () => {
  it('pawn move e4', () => {
    const game = createGame();
    const san = moveToSAN(
      game.board,
      { from: 12, to: 28, promotion: null, captured: null },
      'w',
      game.castlingRights,
      game.enPassant
    );
    expect(san).toBe('e4');
  });

  it('knight move Nf3', () => {
    const game = createGame();
    const san = moveToSAN(
      game.board,
      { from: 62, to: 45, promotion: null, captured: null },
      'b',
      game.castlingRights,
      game.enPassant
    );
    expect(san).toBe('Nf6');
  });

  it('castling kingside', () => {
    const game = parseFEN('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1');
    const san = moveToSAN(
      game.board,
      { from: 4, to: 6, promotion: null, captured: null },
      'w',
      game.castlingRights,
      game.enPassant
    );
    expect(san).toBe('O-O');
  });

  it('castling queenside', () => {
    const game = parseFEN('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1');
    const san = moveToSAN(
      game.board,
      { from: 4, to: 2, promotion: null, captured: null },
      'w',
      game.castlingRights,
      game.enPassant
    );
    expect(san).toBe('O-O-O');
  });

  it('pawn promotion with capture', () => {
    const game = parseFEN('8/1kP5/8/8/8/5K2/8/8 w - - 0 1');
    const san = moveToSAN(
      game.board,
      { from: 50, to: 58, promotion: 'q', captured: null },
      'w',
      game.castlingRights,
      game.enPassant
    );
    expect(san).toBe('c8=Q');
  });
});
