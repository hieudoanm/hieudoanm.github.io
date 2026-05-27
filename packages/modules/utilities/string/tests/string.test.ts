import {
  deburr,
  capitalise,
  kebabcase,
  snakecase,
  uppercase,
  lowercase,
  FormatStyle,
  strings,
} from '../src/string';

describe('deburr', () => {
  it('removes diacritical marks', () => {
    expect(deburr('café')).toBe('cafe');
    expect(deburr('résumé')).toBe('resume');
    expect(deburr('São Paulo')).toBe('Sao Paulo');
    expect(deburr('Zoë')).toBe('Zoe');
  });

  it('handles plain ASCII', () => {
    expect(deburr('hello')).toBe('hello');
  });
});

describe('capitalise', () => {
  it('capitalises each word', () => {
    expect(capitalise('hello world')).toBe('Hello World');
  });

  it('handles single word', () => {
    expect(capitalise('hello')).toBe('Hello');
  });

  it('lowercases the rest of each word', () => {
    expect(capitalise('HELLO WORLD')).toBe('Hello World');
  });
});

describe('kebabcase', () => {
  it('converts spaces to hyphens', () => {
    expect(kebabcase('hello world')).toBe('hello-world');
  });

  it('lowercases the string', () => {
    expect(kebabcase('Hello World')).toBe('hello-world');
  });
});

describe('snakecase', () => {
  it('converts spaces to underscores', () => {
    expect(snakecase('hello world')).toBe('hello_world');
  });

  it('lowercases the string', () => {
    expect(snakecase('Hello World')).toBe('hello_world');
  });
});

describe('uppercase', () => {
  it('converts to uppercase', () => {
    expect(uppercase('hello')).toBe('HELLO');
  });
});

describe('lowercase', () => {
  it('converts to lowercase', () => {
    expect(lowercase('HELLO')).toBe('hello');
  });
});

describe('FormatStyle enum', () => {
  it('has all format styles', () => {
    expect(FormatStyle.Capitalise).toBe('capitalise');
    expect(FormatStyle.Deburr).toBe('deburr');
    expect(FormatStyle.Kebabcase).toBe('kebabcase');
    expect(FormatStyle.Lowercase).toBe('lowercase');
    expect(FormatStyle.Snakecase).toBe('snakecase');
    expect(FormatStyle.Uppercase).toBe('uppercase');
  });
});

describe('strings', () => {
  it('formats with capitalise', () => {
    expect(strings('hello world').format(FormatStyle.Capitalise)).toBe(
      'Hello World'
    );
  });

  it('formats with deburr', () => {
    expect(strings('café').format(FormatStyle.Deburr)).toBe('cafe');
  });

  it('formats with kebabcase', () => {
    expect(strings('Hello World').format(FormatStyle.Kebabcase)).toBe(
      'hello-world'
    );
  });

  it('formats with snakecase', () => {
    expect(strings('Hello World').format(FormatStyle.Snakecase)).toBe(
      'hello_world'
    );
  });

  it('formats with uppercase', () => {
    expect(strings('hello').format(FormatStyle.Uppercase)).toBe('HELLO');
  });

  it('formats with lowercase', () => {
    expect(strings('HELLO').format(FormatStyle.Lowercase)).toBe('hello');
  });

  it('returns original string for unknown style', () => {
    expect(strings('hello').format('unknown' as FormatStyle)).toBe('hello');
  });
});
