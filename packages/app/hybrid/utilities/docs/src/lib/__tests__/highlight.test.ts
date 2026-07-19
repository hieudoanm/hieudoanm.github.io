import { getHighlightParts } from '../highlight';

describe('getHighlightParts', () => {
  it('returns a single non-highlighted part for empty query', () => {
    expect(getHighlightParts('Chess', '')).toEqual([
      { text: 'Chess', highlight: false },
    ]);
  });

  it('highlights a matching substring', () => {
    expect(getHighlightParts('Chess', 'che')).toEqual([
      { text: 'Che', highlight: true },
      { text: 'ss', highlight: false },
    ]);
  });

  it('highlights all occurrences case-insensitively', () => {
    const parts = getHighlightParts('Sudoku Sudoku', 'sudoku');
    expect(parts.filter((p) => p.highlight)).toHaveLength(2);
  });

  it('highlights multiple terms', () => {
    const parts = getHighlightParts('Calendar Clock', 'cal clock');
    expect(parts.filter((p) => p.highlight).map((p) => p.text)).toEqual([
      'Cal',
      'Clock',
    ]);
  });

  it('returns a single part when there is no match', () => {
    expect(getHighlightParts('Chess', 'xyz')).toEqual([
      { text: 'Chess', highlight: false },
    ]);
  });

  it('escapes regex special characters in the query', () => {
    const parts = getHighlightParts('C++ CSV', 'c++');
    expect(parts.some((p) => p.highlight && p.text === 'C++')).toBe(true);
  });
});
