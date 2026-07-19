import { DEFAULT_PERFT_FENS, runDivide, runPerft } from '../perft';

describe('perft utils', () => {
  it('runs perft with a capped depth', () => {
    const result = runPerft(DEFAULT_PERFT_FENS[0]!, 6);
    expect(result.depth).toBe(4);
    expect(result.nodes).toBe(20);
    expect(result.fen).toBe(DEFAULT_PERFT_FENS[0]);
  });

  it('keeps a minimum depth of one', () => {
    const result = runPerft(DEFAULT_PERFT_FENS[0]!, 0);
    expect(result.depth).toBe(1);
  });

  it('produces a move breakdown', () => {
    const divide = runDivide(DEFAULT_PERFT_FENS[0]!, 2);
    expect(typeof divide).toBe('object');
    expect(Object.keys(divide).length).toBeGreaterThan(0);
  });
});
