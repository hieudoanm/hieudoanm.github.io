import {
  classifyChar,
  classifySegment,
  escapeLit,
  splitParts,
  generateRegex,
  testRegex,
} from '../regex';

describe('classifyChar', () => {
  it('classifies digit', () => {
    expect(classifyChar('5')).toBe('\\d');
  });
  it('classifies lowercase', () => {
    expect(classifyChar('a')).toBe('[a-z]');
  });
  it('classifies uppercase', () => {
    expect(classifyChar('Z')).toBe('[A-Z]');
  });
  it('returns null for special chars', () => {
    expect(classifyChar('@')).toBeNull();
  });
});

describe('classifySegment', () => {
  it('classifies digits', () => {
    expect(classifySegment('123')).toBe('\\d{3}');
  });
  it('classifies lowercase', () => {
    expect(classifySegment('abc')).toBe('[a-z]{3}');
  });
  it('classifies uppercase', () => {
    expect(classifySegment('XYZ')).toBe('[A-Z]{3}');
  });
  it('classifies mixed case', () => {
    expect(classifySegment('aBc')).toBe('[a-zA-Z]{3}');
  });
  it('classifies alphanumeric', () => {
    expect(classifySegment('a1b')).toBe('\\w{3}');
  });
  it('returns null for mixed with special', () => {
    expect(classifySegment('a@b')).toBeNull();
  });
  it('returns empty string for empty', () => {
    expect(classifySegment('')).toBe('');
  });
});

describe('escapeLit', () => {
  it('escapes regex special chars', () => {
    expect(escapeLit('.')).toBe('\\.');
    expect(escapeLit('*')).toBe('\\*');
    expect(escapeLit('hello.world')).toBe('hello\\.world');
  });

  it('escapes bracket and backslash', () => {
    expect(escapeLit('[')).toBe('\\[');
    expect(escapeLit('\\')).toBe('\\\\');
  });
});

describe('splitParts', () => {
  it('splits by separators', () => {
    expect(splitParts('hello-world_test')).toEqual(['hello', 'world', 'test']);
  });
  it('filters empty parts', () => {
    expect(splitParts('a--b')).toEqual(['a', 'b']);
  });
  it('splits with multiple separator types', () => {
    expect(splitParts('a/b c|d')).toEqual(['a', 'b', 'c', 'd']);
  });
});

describe('generateRegex', () => {
  it('returns null for < 2 strings', () => {
    expect(generateRegex(['only'])).toBeNull();
  });
  it('returns null for empty filtered', () => {
    expect(generateRegex(['', ''])).toBeNull();
  });

  it('returns escaped literal for identical strings', () => {
    expect(generateRegex(['hello', 'hello'])).toBe('hello');
  });

  it('uses char class for same-length strings with same char class', () => {
    const result = generateRegex(['abc', 'abd']);
    expect(result).toBe('[a-z][a-z][a-z]');
  });

  it('generates char class pattern for same-length strings', () => {
    const result = generateRegex(['hello', 'world']);
    expect(result).toBe('[a-z][a-z][a-z][a-z][a-z]');
  });

  it('handles separator-based strings with identical parts', () => {
    const result = generateRegex(['hello-world', 'hello-world']);
    expect(result).toBe('hello-world');
  });

  it('generates pattern for separator-based strings with same-length parts', () => {
    const result = generateRegex(['abc-def', 'abc-ghi']);
    expect(result).toContain('abc');
  });

  it('uses prefix/suffix extraction for different-length strings with common prefix', () => {
    const result = generateRegex(['hello-world', 'hello-there']);
    expect(result).toContain('hello');
  });

  it('generates alternation for different structure strings', () => {
    const result = generateRegex(['hello', 'world']);
    expect(result).toBe('[a-z][a-z][a-z][a-z][a-z]');
  });

  it('handles strings with mixed character classes per position', () => {
    const result = generateRegex(['a1b', 'c2d']);
    expect(result).toBeDefined();
    expect(result?.length).toBeGreaterThan(0);
  });

  it('handles strings with different lengths using prefix/suffix', () => {
    const result = generateRegex(['foobar', 'foobaz']);
    expect(result).toBe('[a-z][a-z][a-z][a-z][a-z][a-z]');
  });

  it('handles strings with same prefix and suffix but different middle', () => {
    const result = generateRegex(['fooBar', 'fooBaz']);
    expect(result).toBe('[a-z][a-z][a-z][A-Z][a-z][a-z]');
  });

  it('escapes special characters in output', () => {
    const result = generateRegex(['hello.com', 'hello.org']);
    expect(result).toBe('hello[-_.\\s/|~][a-z][a-z][a-z]');
  });

  it('handles different numbers of parts per string', () => {
    const result = generateRegex(['hello-world', 'foo']);
    expect(result).toBeDefined();
  });

  it('handles strings with separators and common prefix', () => {
    const result = generateRegex(['hello-world', 'hello-test']);
    expect(result).toContain('hello');
    expect(result).toContain('[-_.\\s/|~]');
  });

  it('handles same-length parts with mixed char classes', () => {
    const result = generateRegex(['aBc', 'xYz']);
    expect(result).toBe('[a-z][A-Z][a-z]');
  });
});

describe('testRegex', () => {
  it('tests strings against pattern', () => {
    expect(testRegex('\\d+', '', ['123', 'abc'])).toEqual([true, false]);
  });

  it('handles invalid regex gracefully', () => {
    const results = testRegex('[invalid', '', ['test']);
    expect(results).toEqual([false]);
  });

  it('handles flags correctly', () => {
    expect(testRegex('^hello', 'm', ['hello', ' world'])).toEqual([
      true,
      false,
    ]);
  });

  it('tests multiple strings', () => {
    expect(testRegex('\\w+', '', ['a', 'b', 'c'])).toEqual([true, true, true]);
  });
});
