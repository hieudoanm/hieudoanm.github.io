import { toCSV, readFile } from '../ExcelToCsvModal/utils';

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

describe('readFile', () => {
  it('reads file as ArrayBuffer', async () => {
    const file = new File(['hello'], 'test.txt', { type: 'text/plain' });
    const result = await readFile(file);
    const decoder = new TextDecoder();
    expect(decoder.decode(result)).toBe('hello');
  });
});
