import { jsonToCsv } from '../JsonToCsvModal/utils';
import { jsonToXml } from '../JsonToXmlModal/utils';

describe('jsonToCsv', () => {
  it('converts JSON array to CSV', () => {
    const result = jsonToCsv('[{"name":"Alice","age":"30"}]');
    expect(result).toBe('name,age\nAlice,30');
  });

  it('handles single object', () => {
    const result = jsonToCsv('{"name":"Bob"}');
    expect(result).toBe('name\nBob');
  });

  it('throws on invalid JSON', () => {
    expect(() => jsonToCsv('invalid')).toThrow();
  });
});

describe('jsonToXml', () => {
  it('converts JSON array to XML', () => {
    const result = jsonToXml('[{"name":"Alice"}]');
    expect(result).toContain('<name>');
    expect(result).toContain('Alice');
    expect(result).toContain('</root>');
  });

  it('throws on invalid JSON', () => {
    expect(() => jsonToXml('invalid')).toThrow();
  });
});
