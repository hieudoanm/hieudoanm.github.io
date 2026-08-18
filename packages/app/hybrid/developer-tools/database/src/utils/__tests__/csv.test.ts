import {
  detectDelimiter,
  parseCSV,
  inferColumnType,
  coerceValue,
  previewRows,
  toSqliteCell,
} from '@/utils/csv';

describe('detectDelimiter', () => {
  it('detects comma', () => {
    expect(detectDelimiter('a,b,c\n1,2,3')).toBe(',');
  });
  it('detects tab', () => {
    expect(detectDelimiter('a\tb\tc\n1\t2\t3')).toBe('\t');
  });
  it('detects pipe', () => {
    expect(detectDelimiter('a|b\n1|2')).toBe('|');
  });
  it('defaults to comma on single column', () => {
    expect(detectDelimiter('abc')).toBe(',');
  });
});

describe('parseCSV', () => {
  it('parses basic rows', () => {
    expect(parseCSV('a,b\n1,2\n3,4')).toEqual([
      ['a', 'b'],
      ['1', '2'],
      ['3', '4'],
    ]);
  });
  it('handles quoted fields with commas and quotes', () => {
    expect(parseCSV('a,"b,c",d\n"x""y",1,2')).toEqual([
      ['a', 'b,c', 'd'],
      ['x"y', '1', '2'],
    ]);
  });
  it('handles CRLF and trailing newline', () => {
    expect(parseCSV('a,b\r\n1,2\r\n')).toEqual([
      ['a', 'b'],
      ['1', '2'],
    ]);
  });
  it('skips empty lines', () => {
    expect(parseCSV('a\n\nb')).toEqual([['a'], ['b']]);
  });
  it('supports custom delimiters', () => {
    expect(parseCSV('a\tb\n1\t2', '\t')).toEqual([
      ['a', 'b'],
      ['1', '2'],
    ]);
  });
});

describe('inferColumnType', () => {
  it('infers INTEGER', () => {
    expect(inferColumnType(['1', '2', '3'])).toBe('INTEGER');
  });
  it('infers REAL', () => {
    expect(inferColumnType(['1.5', '2.0'])).toBe('REAL');
  });
  it('infers TEXT', () => {
    expect(inferColumnType(['abc', '1x'])).toBe('TEXT');
  });
  it('returns NULL for empty values', () => {
    expect(inferColumnType(['', '  '])).toBe('NULL');
  });
  it('infers TEXT when mixed int and text', () => {
    expect(inferColumnType(['1', 'no'])).toBe('TEXT');
  });
});

describe('coerceValue', () => {
  it('returns null for empty strings', () => {
    expect(coerceValue('', 'TEXT')).toBeNull();
  });
  it('parses INTEGER', () => {
    expect(coerceValue('42', 'INTEGER')).toBe(42);
  });
  it('parses REAL', () => {
    expect(coerceValue('3.5', 'REAL')).toBe(3.5);
  });
  it('keeps strings untouched', () => {
    expect(coerceValue('abc', 'TEXT')).toBe('abc');
  });
});

describe('previewRows', () => {
  it('returns header and limited body', () => {
    const rows = previewRows('h1,h2\n1,2\n3,4\n5,6', ',', 2);
    expect(rows).toEqual([
      ['h1', 'h2'],
      ['1', '2'],
      ['3', '4'],
    ]);
  });
  it('returns empty for empty text', () => {
    expect(previewRows('')).toEqual([]);
  });
});

describe('toSqliteCell', () => {
  it('passes through values', () => {
    expect(toSqliteCell(1)).toBe(1);
    expect(toSqliteCell('a')).toBe('a');
    expect(toSqliteCell(null)).toBeNull();
  });
});
