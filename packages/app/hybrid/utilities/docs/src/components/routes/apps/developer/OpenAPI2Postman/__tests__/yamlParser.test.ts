import { parseOpenAPI, parseYAML } from '../utils/yamlParser';

describe('parseYAML', () => {
  it('parses a simple key-value pair', () => {
    const result = parseYAML('foo: bar');
    expect(result).toEqual({ foo: 'bar' });
  });

  it('parses nested objects', () => {
    const yaml = 'parent:\n  child: value';
    const result = parseYAML(yaml);
    expect(result).toEqual({ parent: { child: 'value' } });
  });

  it('parses numeric values', () => {
    const result = parseYAML('count: 42');
    expect(result).toEqual({ count: 42 });
  });

  it('parses boolean values', () => {
    const result = parseYAML('enabled: true');
    expect(result).toEqual({ enabled: true });
  });

  it('parses array items at root level', () => {
    const result = parseYAML('- a\n- b');
    expect(result.undefined).toEqual(['a', 'b']);
  });

  it('parses array of objects at root level', () => {
    const result = parseYAML('- name: a\n- name: b');
    expect(result.undefined).toEqual([{ name: 'a' }, { name: 'b' }]);
  });

  it('skips empty lines and comments', () => {
    const yaml = '# comment\n\nkey: val';
    const result = parseYAML(yaml);
    expect(result).toEqual({ key: 'val' });
  });

  it('handles empty input', () => {
    expect(parseYAML('')).toEqual({});
  });

  it('parses a top-level OpenAPI-style YAML key', () => {
    const result = parseYAML('openapi: "3.0.0"');
    expect(result.openapi).toBe('3.0.0');
  });
});

describe('parseOpenAPI', () => {
  it('parses JSON input', () => {
    const result = parseOpenAPI('{"openapi": "3.0.0"}');
    expect(result.openapi).toBe('3.0.0');
  });

  it('parses YAML input', () => {
    const result = parseOpenAPI('openapi: 3.0.0');
    expect(result.openapi).toBe('3.0.0');
  });
});
