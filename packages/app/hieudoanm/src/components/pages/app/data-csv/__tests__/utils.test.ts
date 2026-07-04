import { csvToJson } from '../CsvToJsonModal/utils';
import { csvToXml } from '../CsvToXmlModal/utils';
import { parseCSV, toCSV, readFileAsText } from '../SplitCsvModal/utils';

describe('csvToJson', () => {
  it('converts CSV to JSON', () => {
    const result = csvToJson('name,age\nAlice,30\nBob,25');
    expect(result).toContain('Alice');
    expect(result).toContain('Bob');
    expect(result).toContain('"name"');
  });

  it('returns empty array for single line', () => {
    expect(csvToJson('header')).toBe('[]');
  });

  it('handles empty string', () => {
    expect(csvToJson('')).toBe('[]');
  });
});

describe('csvToXml', () => {
  it('converts CSV to XML', () => {
    const result = csvToXml('name,age\nAlice,30');
    expect(result).toContain('<name>');
    expect(result).toContain('Alice');
    expect(result).toContain('</root>');
  });

  it('handles single header line', () => {
    expect(csvToXml('name')).toBe('<root></root>');
  });

  it('handles empty string', () => {
    expect(csvToXml('')).toBe('<root></root>');
  });
});

describe('parseCSV', () => {
  it('parses simple CSV', () => {
    const result = parseCSV('a,b\n1,2');
    expect(result).toEqual([
      ['a', 'b'],
      ['1', '2'],
    ]);
  });

  it('handles quoted fields', () => {
    const result = parseCSV('a,"b,c"\n1,2');
    expect(result).toEqual([
      ['a', 'b,c'],
      ['1', '2'],
    ]);
  });

  it('returns empty array for empty input', () => {
    expect(parseCSV('')).toEqual([]);
  });
});

describe('toCSV', () => {
  it('converts rows to CSV string', () => {
    const result = toCSV([
      ['a', 'b'],
      ['1', '2'],
    ]);
    expect(result).toBe('a,b\n1,2');
  });

  it('quotes fields with commas', () => {
    const result = toCSV([['a', 'b,c']]);
    expect(result).toBe('a,"b,c"');
  });
});

describe('readFileAsText', () => {
  it('reads file content as text', async () => {
    const file = new File(['hello world'], 'test.txt', { type: 'text/plain' });
    const result = await readFileAsText(file);
    expect(result).toBe('hello world');
  });
});
