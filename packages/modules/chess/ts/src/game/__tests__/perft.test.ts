import { perft, divide } from '../perft';
import { createGame } from '../game';

describe('perft starting position', () => {
  const game = createGame(
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  );

  it('depth 1 = 20', () => {
    expect(perft(game, 1)).toBe(20);
  });

  it('depth 2 = 400', () => {
    expect(perft(game, 2)).toBe(400);
  });

  it('depth 3 = 8902', () => {
    expect(perft(game, 3)).toBe(8902);
  });
});

describe('perft Kiwipete position', () => {
  const game = createGame(
    'r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1'
  );

  it('depth 1 = 48', () => {
    expect(perft(game, 1)).toBe(48);
  });

  it('depth 2 = 2039', () => {
    expect(perft(game, 2)).toBe(2039);
  });
});

describe('perft position 4 (promotions)', () => {
  const game = createGame(
    'r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1'
  );

  it('depth 1 = 6', () => {
    expect(perft(game, 1)).toBe(6);
  });

  it('depth 2 = 264', () => {
    expect(perft(game, 2)).toBe(264);
  });
});

describe('perft position 5', () => {
  const game = createGame(
    'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8'
  );

  it('depth 1 = 44', () => {
    expect(perft(game, 1)).toBe(44);
  });

  it('depth 2 = 1486', () => {
    expect(perft(game, 2)).toBe(1486);
  });
});

describe('perft position 6', () => {
  const game = createGame(
    'r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 10'
  );

  it('depth 1 = 46', () => {
    expect(perft(game, 1)).toBe(46);
  });

  it('depth 2 = 2079', () => {
    expect(perft(game, 2)).toBe(2079);
  });
});

describe('divide', () => {
  it('returns per-move counts for depth 1', () => {
    const game = createGame(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    );
    const result = divide(game, 1);
    expect(Object.keys(result)).toHaveLength(20);
    expect(Object.values(result).every((v) => v === 1)).toBe(true);
  });

  it('sums to perft value', () => {
    const game = createGame(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    );
    const result = divide(game, 3);
    const sum = Object.values(result).reduce((a, b) => a + b, 0);
    expect(sum).toBe(8902);
  });
});
