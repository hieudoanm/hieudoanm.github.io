import { createGame, makeMove, undoMove, getStatusMessage } from '../game';
import { fromFen } from '../../notation/notation';

describe('createGame', () => {
  it('creates starting position by default', () => {
    const game = createGame();
    expect(game.turn).toBe('w');
    expect(game.board[0]).toEqual({ color: 'w', type: 'r' });
    expect(game.board[4]).toEqual({ color: 'w', type: 'k' });
    expect(game.status).toBe('playing');
    expect(game.result).toBe('*');
  });

  it('creates game from FEN', () => {
    const game = createGame('8/8/8/8/8/8/8/8 w - - 0 1');
    expect(game.board.every((sq) => sq === null)).toBe(true);
  });
});

describe('makeMove', () => {
  it('advances turn after white move', () => {
    const game = createGame();
    const after = makeMove(game, {
      from: 12,
      to: 28,
      promotion: null,
      captured: null,
    });
    expect(after.turn).toBe('b');
  });

  it('increments full move number after black move', () => {
    const game = createGame();
    const after1 = makeMove(game, {
      from: 12,
      to: 28,
      promotion: null,
      captured: null,
    });
    const after2 = makeMove(after1, {
      from: 52,
      to: 36,
      promotion: null,
      captured: null,
    });
    expect(after2.fullMoveNumber).toBe(2);
  });

  it('records move in history', () => {
    const game = createGame();
    const after = makeMove(game, {
      from: 12,
      to: 28,
      promotion: null,
      captured: null,
    });
    expect(after.history).toHaveLength(1);
    expect(after.history[0]!.move.from).toBe(12);
    expect(after.history[0]!.move.to).toBe(28);
  });

  it('queen on f7 gives checkmate', () => {
    const game = fromFen(
      'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 4 4'
    );
    const after = makeMove(game, {
      from: 21,
      to: 53,
      promotion: null,
      captured: null,
    });
    expect(after.inCheck).toBe(true);
    expect(after.status).toBe('checkmate');
  });
});

describe('undoMove', () => {
  it('reverts to previous state', () => {
    const game = createGame();
    const after = makeMove(game, {
      from: 12,
      to: 28,
      promotion: null,
      captured: null,
    });
    const undone = undoMove(after);
    expect(undone.turn).toBe('w');
    expect(undone.history).toHaveLength(0);
  });

  it('returns same state if no history', () => {
    const game = createGame();
    const undone = undoMove(game);
    expect(undone).toBe(game);
  });
});

describe('getStatusMessage', () => {
  it('returns playing for starting position', () => {
    expect(getStatusMessage(createGame())).toBe('Playing.');
  });

  it('returns draw for stalemate', () => {
    const game = fromFen('k7/2K5/1P6/8/8/8/8/8 w - - 0 1');
    const result = makeMove(game, {
      from: 50,
      to: 58,
      promotion: null,
      captured: null,
    });
    expect(result.status).toBe('stalemate');
    expect(getStatusMessage(result)).toContain('Stalemate');
  });

  it('returns check when in check', () => {
    const game = fromFen(
      'r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4'
    );
    expect(getStatusMessage(game)).toContain('Check!');
  });
});

describe('insufficient material', () => {
  it('K vs K detected on makeMove', () => {
    const game = createGame('k7/8/K7/8/8/8/8/8 w - - 0 1');
    const result = makeMove(game, {
      from: 40,
      to: 32,
      promotion: null,
      captured: null,
    });
    expect(result.status).toBe('draw');
    expect(result.result).toBe('1/2-1/2');
  });

  it('K+R vs K is not draw', () => {
    const game = createGame('k7/8/K7/8/5R2/8/8/8 w - - 0 1');
    const result = makeMove(game, {
      from: 29,
      to: 13,
      promotion: null,
      captured: null,
    });
    expect(result.status).toBe('playing');
  });
});

describe('fifty-move rule', () => {
  it('draws after 100 half-moves without pawn move or capture', () => {
    const game = fromFen('k7/8/K7/8/8/8/8/8 w - - 99 1');
    const after = makeMove(game, {
      from: 40,
      to: 39,
      promotion: null,
      captured: null,
    });
    expect(after.halfMoveClock).toBe(100);
    expect(after.status).toBe('draw');
    expect(after.result).toBe('1/2-1/2');
  });
});
