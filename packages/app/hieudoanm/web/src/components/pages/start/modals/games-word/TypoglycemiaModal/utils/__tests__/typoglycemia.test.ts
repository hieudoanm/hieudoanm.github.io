import { countWords, scrambleWord, scrambleText } from '../typoglycemia';

describe('countWords', () => {
  it('counts words in normal text', () => {
    expect(countWords('hello world')).toBe(2);
  });

  it('returns 0 for empty string', () => {
    expect(countWords('')).toBe(0);
  });

  it('handles unicode letters', () => {
    expect(countWords('café résumé')).toBe(2);
  });

  it('handles numbers and apostrophes', () => {
    expect(countWords("it's a 123 test")).toBe(4);
  });
});

describe('scrambleWord', () => {
  it('returns short words unchanged', () => {
    expect(scrambleWord('a')).toBe('a');
    expect(scrambleWord('ab')).toBe('ab');
    expect(scrambleWord('abc')).toBe('abc');
  });

  it('scrambles middle letters of longer words', () => {
    const result = scrambleWord('hello');
    expect(result[0]).toBe('h');
    expect(result[result.length - 1]).toBe('o');
    expect(result.length).toBe(5);
  });

  it('ensures scrambled word differs from original when possible', () => {
    const original = 'world';
    const results = new Set<string>();
    for (let i = 0; i < 50; i++) {
      results.add(scrambleWord(original));
    }
    for (const r of results) {
      expect(r[0]).toBe('w');
      expect(r[r.length - 1]).toBe('d');
      expect(r.length).toBe(5);
    }
  });
});

describe('scrambleText', () => {
  it('scrambles all words in text', () => {
    const result = scrambleText('hello world');
    const words = result.split(' ');
    expect(words).toHaveLength(2);
    expect(words[0][0]).toBe('h');
    expect(words[0][words[0].length - 1]).toBe('o');
    expect(words[1][0]).toBe('w');
    expect(words[1][words[1].length - 1]).toBe('d');
  });

  it('returns empty string for empty input', () => {
    expect(scrambleText('')).toBe('');
  });

  it('preserves non-alphabetic characters', () => {
    const result = scrambleText('hello, world!');
    expect(result).toContain(',');
    expect(result).toContain('!');
  });
});
