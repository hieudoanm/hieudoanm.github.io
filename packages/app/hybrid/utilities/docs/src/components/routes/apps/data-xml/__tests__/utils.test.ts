import { jsonToXml } from '../JsonToXml/utils';
import { xmlToJson } from '../XmlToJson/utils';

describe('xmlToJson', () => {
  it('converts XML to JSON', () => {
    const result = xmlToJson('<root><item><name>Alice</name></item></root>');
    expect(result).toHaveProperty('item');
    expect(result.item).toHaveProperty('name', 'Alice');
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
