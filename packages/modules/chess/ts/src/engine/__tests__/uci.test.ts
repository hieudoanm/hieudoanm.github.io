import { parseUciCommand, UCIEngine } from '../uci';
import type { UCIResponse } from '../uci';

describe('parseUciCommand', () => {
  it('parses "uci"', () => {
    expect(parseUciCommand('uci')).toBe('uci');
  });

  it('parses "isready"', () => {
    expect(parseUciCommand('isready')).toBe('isready');
  });

  it('parses "stop"', () => {
    expect(parseUciCommand('stop')).toBe('stop');
  });

  it('parses "quit"', () => {
    expect(parseUciCommand('quit')).toBe('quit');
  });

  it('parses "position startpos"', () => {
    const cmd = parseUciCommand('position startpos');
    expect(cmd).toEqual({
      type: 'position',
      fen: expect.any(String),
      moves: [],
    });
  });

  it('parses "position startpos moves e2e4 e7e5"', () => {
    const cmd = parseUciCommand('position startpos moves e2e4 e7e5');
    expect(cmd).toEqual({
      type: 'position',
      fen: expect.any(String),
      moves: ['e2e4', 'e7e5'],
    });
  });

  it('parses "position fen ..."', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1';
    const cmd = parseUciCommand(`position fen ${fen}`);
    expect(cmd).toEqual({ type: 'position', fen, moves: [] });
  });

  it('parses "position fen ... moves ..."', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1';
    const cmd = parseUciCommand(`position fen ${fen} moves e7e5`);
    expect(cmd).toEqual({ type: 'position', fen, moves: ['e7e5'] });
  });

  it('parses "go depth 5"', () => {
    const cmd = parseUciCommand('go depth 5');
    expect(cmd).toEqual({ type: 'go', depth: 5 });
  });

  it('parses "go movetime 1000"', () => {
    const cmd = parseUciCommand('go movetime 1000');
    expect(cmd).toEqual({ type: 'go', movetime: 1000 });
  });

  it('parses "go wtime 300000 btime 200000"', () => {
    const cmd = parseUciCommand('go wtime 300000 btime 200000');
    expect(cmd).toEqual({ type: 'go', wtime: 300000, btime: 200000 });
  });

  it('returns null for empty string', () => {
    expect(parseUciCommand('')).toBeNull();
  });

  it('returns null for garbage', () => {
    expect(parseUciCommand('xyz')).toBeNull();
  });
});

describe('UCIEngine', () => {
  it('responds to uci with uciok', () => {
    const responses: UCIResponse[] = [];
    const engine = new UCIEngine({ onResponse: (r) => responses.push(r) });
    engine.handle('uci');
    expect(responses).toHaveLength(1);
    expect(responses[0]).toEqual({ type: 'uciok' });
  });

  it('responds to isready with readyok', () => {
    const responses: UCIResponse[] = [];
    const engine = new UCIEngine({ onResponse: (r) => responses.push(r) });
    engine.handle('isready');
    expect(responses).toHaveLength(1);
    expect(responses[0]).toEqual({ type: 'readyok' });
  });

  it('handles position startpos', () => {
    const engine = new UCIEngine();
    expect(() =>
      engine.handle(parseUciCommand('position startpos')!)
    ).not.toThrow();
  });

  it('handles position startpos moves e2e4', () => {
    const engine = new UCIEngine();
    expect(() =>
      engine.handle(parseUciCommand('position startpos moves e2e4')!)
    ).not.toThrow();
  });

  it('handles position with FEN', () => {
    const fen =
      'r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1';
    const engine = new UCIEngine();
    expect(() =>
      engine.handle(parseUciCommand(`position fen ${fen}`)!)
    ).not.toThrow();
  });

  it('handles go depth 1 and returns bestmove', async () => {
    const responses: UCIResponse[] = [];
    const engine = new UCIEngine({ onResponse: (r) => responses.push(r) });
    engine.handle(parseUciCommand('position startpos')!);
    engine.handle(parseUciCommand('go depth 1')!);
    // Wait for async search
    await new Promise((r) => setTimeout(r, 100));
    expect(responses).toHaveLength(1);
    expect(responses[0]!.type).toBe('bestmove');
    if (responses[0]!.type === 'bestmove') {
      expect(responses[0]!.move).toBeTruthy();
    }
  });

  it('handles go with movetime', async () => {
    const responses: UCIResponse[] = [];
    const engine = new UCIEngine({ onResponse: (r) => responses.push(r) });
    engine.handle(parseUciCommand('position startpos')!);
    engine.handle(parseUciCommand('go movetime 100')!);
    await new Promise((r) => setTimeout(r, 200));
    expect(responses).toHaveLength(1);
    expect(responses[0]!.type).toBe('bestmove');
  });

  it('ignores stop', () => {
    const engine = new UCIEngine();
    expect(() => engine.handle('stop')).not.toThrow();
  });

  it('ignores quit', () => {
    const engine = new UCIEngine();
    expect(() => engine.handle('quit')).not.toThrow();
  });
});
