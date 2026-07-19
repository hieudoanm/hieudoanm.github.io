import { xmlToJson } from '../XmlToJson/utils';
import { toCSV } from '../XmlToCsv/utils';

describe('xmlToJson', () => {
  it('converts XML to JSON', () => {
    const result = xmlToJson('<root><item><name>Alice</name></item></root>');
    expect(result).toHaveProperty('item');
    expect(result.item).toHaveProperty('name', 'Alice');
  });
});

describe('toCSV', () => {
  it('converts rows to CSV', () => {
    const result = toCSV([
      ['a', 'b'],
      ['1', '2'],
    ]);
    expect(result).toBe('a,b\n1,2');
  });
});
