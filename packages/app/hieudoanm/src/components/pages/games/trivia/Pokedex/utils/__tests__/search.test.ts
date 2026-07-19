import { fuzzyMatch } from '../search';

describe('fuzzyMatch', () => {
  it('returns 1 for empty query', () => {
    expect(fuzzyMatch('anything', '')).toBe(1);
  });

  it('returns 1 when all query chars found in order', () => {
    expect(fuzzyMatch('pikachu', 'pchu')).toBe(1);
  });

  it('returns 0 when query chars not found in order', () => {
    expect(fuzzyMatch('pikachu', 'xyz')).toBe(0);
  });

  it('is case-insensitive', () => {
    expect(fuzzyMatch('PIKACHU', 'pik')).toBe(1);
    expect(fuzzyMatch('pikachu', 'PIK')).toBe(1);
  });

  it('returns 1 for exact match', () => {
    expect(fuzzyMatch('charmander', 'charmander')).toBe(1);
  });

  it('returns 0 when text is empty but query is not', () => {
    expect(fuzzyMatch('', 'a')).toBe(0);
  });
});
