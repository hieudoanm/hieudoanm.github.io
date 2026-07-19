import { PIECE_GLYPHS, PIECE_SET_KEYS, renderPieces } from '../pieceSets';

describe('pieceSets', () => {
  it('exports all piece keys', () => {
    expect(PIECE_SET_KEYS).toEqual(['standard', 'unicode']);
  });

  it('has glyphs for all 12 pieces', () => {
    const keys = Object.keys(PIECE_GLYPHS);
    expect(keys).toHaveLength(12);
    keys.forEach((k) => {
      expect(typeof PIECE_GLYPHS[k as keyof typeof PIECE_GLYPHS]).toBe(
        'string'
      );
    });
  });

  it('renderPieces returns undefined for standard set', () => {
    expect(renderPieces('standard')).toBeUndefined();
  });

  it('renderPieces returns an object for unicode set', () => {
    const result = renderPieces('unicode');
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
  });

  it('unicode set has renderers for all pieces', () => {
    const result = renderPieces('unicode');
    expect(result).toBeDefined();
    const keys = Object.keys(result!);
    expect(keys).toHaveLength(12);
  });
});
