import {
  formatBytes,
  formatNumber,
  cellToString,
  convertToCSV,
  convertToJSON,
  convertToMarkdown,
  convertToSQL,
  getExportContent,
} from '../sqlExport';
import { CellVal, ExportFormat } from '../../types';

describe('formatBytes', () => {
  it('formats bytes', () => {
    expect(formatBytes(500)).toBe('500 B');
  });
  it('formats KB', () => {
    expect(formatBytes(2048)).toBe('2.0 KB');
  });
  it('formats MB', () => {
    expect(formatBytes(2097152)).toBe('2.00 MB');
  });
});

describe('formatNumber', () => {
  it('formats with locale separators', () => {
    expect(formatNumber(1000)).toBe('1,000');
  });
});

describe('cellToString', () => {
  it('handles null', () => {
    expect(cellToString(null)).toBe('');
  });
  it('handles Uint8Array', () => {
    expect(cellToString(new Uint8Array(5))).toBe('[BLOB 5B]');
  });
  it('handles numbers', () => {
    expect(cellToString(42)).toBe('42');
  });
  it('handles strings', () => {
    expect(cellToString('hello')).toBe('hello');
  });
});

describe('convertToCSV', () => {
  it('generates CSV with header and rows', () => {
    const result = convertToCSV(
      ['name', 'age'],
      [
        ['Alice', 30],
        ['Bob', 25],
      ]
    );
    expect(result).toContain('name,age');
    expect(result).toContain('Alice,30');
    expect(result).toContain('Bob,25');
  });

  it('escapes commas', () => {
    const result = convertToCSV(['col'], [['hello,world']]);
    expect(result).toContain('"hello,world"');
  });
});

describe('convertToJSON', () => {
  it('generates JSON array of objects', () => {
    const result = convertToJSON(
      ['name', 'age'],
      [
        ['Alice', 30],
        ['Bob', 25],
      ]
    );
    const parsed = JSON.parse(result);
    expect(parsed).toHaveLength(2);
    expect(parsed[0].name).toBe('Alice');
    expect(parsed[0].age).toBe(30);
  });

  it('converts Uint8Array to blob string', () => {
    const result = convertToJSON(['data'], [[new Uint8Array(3)]]);
    expect(result).toContain('[BLOB 3B]');
  });
});

describe('convertToMarkdown', () => {
  it('generates markdown table', () => {
    const result = convertToMarkdown(['a', 'b'], [['1', '2']]);
    expect(result).toContain('| a | b |');
    expect(result).toContain('| 1 | 2 |');
  });
});

describe('convertToSQL', () => {
  it('generates INSERT statements', () => {
    const result = convertToSQL(
      'users',
      ['id', 'name'],
      [
        [1, 'Alice'],
        [2, 'Bob'],
      ]
    );
    expect(result).toContain('INSERT INTO "users"');
    expect(result).toContain("'Alice'");
  });

  it('handles zero rows', () => {
    expect(convertToSQL('t', ['c'], [])).toBe('-- No rows in "t"');
  });
});

describe('getExportContent', () => {
  const cols = ['a', 'b'];
  const rows: CellVal[][] = [['1', '2']];

  it('returns CSV for csv format', () => {
    expect(getExportContent('csv', 't', cols, rows)).toContain('a,b');
  });

  it('returns JSON for json format', () => {
    const result = getExportContent('json', 't', cols, rows);
    expect(JSON.parse(result)).toBeInstanceOf(Array);
  });

  it('returns Markdown for md format', () => {
    expect(getExportContent('md', 't', cols, rows)).toContain('| a | b |');
  });

  it('returns SQL for sql format', () => {
    expect(getExportContent('sql', 't', cols, rows)).toContain('INSERT INTO');
  });
});
