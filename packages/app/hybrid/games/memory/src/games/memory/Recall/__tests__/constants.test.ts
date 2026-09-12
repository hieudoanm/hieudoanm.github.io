import { chunkDigits, generateNumber, highlightMistakes } from '../constants';

describe('chunkDigits', () => {
  it('chunks 6-digit number into two groups of 3', () => {
    expect(chunkDigits('123456')).toBe('123,456');
  });

  it('chunks 4-digit number with leading group of 1', () => {
    expect(chunkDigits('1234')).toBe('1,234');
  });

  it('chunks 5-digit number with leading group of 2', () => {
    expect(chunkDigits('12345')).toBe('12,345');
  });

  it('returns single digit without comma', () => {
    expect(chunkDigits('7')).toBe('7');
  });

  it('returns two digits without comma', () => {
    expect(chunkDigits('78')).toBe('78');
  });

  it('returns three digits without comma', () => {
    expect(chunkDigits('789')).toBe('789');
  });

  it('chunks 9-digit number into three groups of 3', () => {
    expect(chunkDigits('123456789')).toBe('123,456,789');
  });

  it('respects custom size parameter', () => {
    expect(chunkDigits('123456', 2)).toBe('12,34,56');
  });

  it('handles empty string', () => {
    expect(chunkDigits('')).toBe('');
  });
});

describe('generateNumber', () => {
  it('generates number of specified length', () => {
    expect(generateNumber(5)).toHaveLength(5);
  });

  it('generates number of length 1', () => {
    expect(generateNumber(1)).toHaveLength(1);
  });

  it('generates number of length 10', () => {
    expect(generateNumber(10)).toHaveLength(10);
  });

  it('generates only digits', () => {
    const num = generateNumber(20);
    expect(num).toMatch(/^\d+$/);
  });

  it('generates different numbers (probabilistic)', () => {
    const results = new Set(
      Array.from({ length: 50 }, () => generateNumber(6))
    );
    expect(results.size).toBeGreaterThan(1);
  });
});

describe('highlightMistakes', () => {
  it('returns plain digits when all correct', () => {
    expect(highlightMistakes('123', '123')).toBe('123');
  });

  it('wraps wrong digits in red span', () => {
    const result = highlightMistakes('193', '123');
    expect(result).toContain('<span class="text-red-500 font-normal">9</span>');
    expect(result).toContain('1');
    expect(result).toContain('3');
  });

  it('highlights multiple mistakes', () => {
    const result = highlightMistakes('999', '123');
    expect(result).toContain('text-red-500');
    const spans = result.split('text-red-500').length - 1;
    expect(spans).toBe(3);
  });

  it('handles empty input', () => {
    expect(highlightMistakes('', '123')).toBe('');
  });

  it('handles input shorter than correct', () => {
    const result = highlightMistakes('1', '123');
    expect(result).toBe('1');
  });
});
