import * as string from '../src';

describe('string package exports', () => {
  it('exports all expected functions', () => {
    expect(string.deburr).toBeDefined();
    expect(string.capitalise).toBeDefined();
    expect(string.kebabcase).toBeDefined();
    expect(string.snakecase).toBeDefined();
    expect(string.uppercase).toBeDefined();
    expect(string.lowercase).toBeDefined();
    expect(string.FormatStyle).toBeDefined();
    expect(string.strings).toBeDefined();
  });
});
