import {
  camelCase,
  capitalize,
  deburr,
  endsWith,
  escape,
  escapeRegExp,
  kebabCase,
  lowerCase,
  lowerFirst,
  pad,
  padEnd,
  padStart,
  parseInt,
  repeat,
  replace,
  snakeCase,
  split,
  startCase,
  startsWith,
  toLower,
  toUpper,
  trim,
  trimEnd,
  trimStart,
  truncate,
  unescape,
  upperCase,
  upperFirst,
  words,
} from '../src/string.js';

describe('camelCase', () => {
  it('should convert to camel case', () => {
    expect(camelCase('Foo Bar')).toBe('fooBar');
    expect(camelCase('--foo-bar--')).toBe('fooBar');
    expect(camelCase('__FOO_BAR__')).toBe('fooBar');
  });
});

describe('capitalize', () => {
  it('should capitalize string', () => {
    expect(capitalize('FRED')).toBe('Fred');
  });
});

describe('deburr', () => {
  it('should deburr string', () => {
    expect(deburr('déjà vu')).toBe('deja vu');
  });
});

describe('endsWith', () => {
  it('should check ending', () => {
    expect(endsWith('abc', 'c')).toBe(true);
    expect(endsWith('abc', 'b')).toBe(false);
    expect(endsWith('abc', 'b', 2)).toBe(true);
  });
});

describe('escape', () => {
  it('should escape HTML', () => {
    expect(escape('fred, barney, & pebbles')).toBe(
      'fred, barney, &amp; pebbles'
    );
  });
});

describe('escapeRegExp', () => {
  it('should escape regexp', () => {
    expect(escapeRegExp('[lodash](https://lodash.com/)')).toBe(
      '\\[lodash\\]\\(https://lodash\\.com/\\)'
    );
  });
});

describe('kebabCase', () => {
  it('should convert to kebab case', () => {
    expect(kebabCase('Foo Bar')).toBe('foo-bar');
  });
});

describe('lowerCase', () => {
  it('should convert to lower case', () => {
    expect(lowerCase('--Foo-Bar--')).toBe('foo bar');
  });
});

describe('lowerFirst', () => {
  it('should lower first character', () => {
    expect(lowerFirst('Fred')).toBe('fred');
    expect(lowerFirst('FRED')).toBe('fRED');
  });
});

describe('pad', () => {
  it('should pad string', () => {
    expect(pad('abc', 8)).toBe('  abc   ');
    expect(pad('abc', 8, '_-')).toBe('_-abc_-_');
  });
});

describe('padEnd', () => {
  it('should pad end', () => {
    expect(padEnd('abc', 6)).toBe('abc   ');
  });
});

describe('padStart', () => {
  it('should pad start', () => {
    expect(padStart('abc', 6)).toBe('   abc');
  });
});

describe('parseInt', () => {
  it('should parse int', () => {
    expect(parseInt('08')).toBe(8);
  });
});

describe('repeat', () => {
  it('should repeat string', () => {
    expect(repeat('*', 3)).toBe('***');
  });
});

describe('replace', () => {
  it('should replace pattern', () => {
    expect(replace('Hi Fred', 'Fred', 'Barney')).toBe('Hi Barney');
  });
});

describe('snakeCase', () => {
  it('should convert to snake case', () => {
    expect(snakeCase('Foo Bar')).toBe('foo_bar');
  });
});

describe('split', () => {
  it('should split string', () => {
    expect(split('a-b-c', '-', 2)).toEqual(['a', 'b']);
  });
});

describe('startCase', () => {
  it('should convert to start case', () => {
    expect(startCase('--foo-bar--')).toBe('Foo Bar');
  });
});

describe('startsWith', () => {
  it('should check start', () => {
    expect(startsWith('abc', 'a')).toBe(true);
    expect(startsWith('abc', 'b')).toBe(false);
    expect(startsWith('abc', 'b', 1)).toBe(true);
  });
});

describe('toLower', () => {
  it('should convert to lower', () => {
    expect(toLower('--Foo-Bar--')).toBe('--foo-bar--');
  });
});

describe('toUpper', () => {
  it('should convert to upper', () => {
    expect(toUpper('--Foo-Bar--')).toBe('--FOO-BAR--');
  });
});

describe('trim', () => {
  it('should trim string', () => {
    expect(trim('  abc  ')).toBe('abc');
    expect(trim('-_-abc-_-', '_-')).toBe('abc');
  });
});

describe('trimEnd', () => {
  it('should trim end', () => {
    expect(trimEnd('  abc  ')).toBe('  abc');
  });
});

describe('trimStart', () => {
  it('should trim start', () => {
    expect(trimStart('  abc  ')).toBe('abc  ');
  });
});

describe('truncate', () => {
  it('should truncate string', () => {
    expect(truncate('hi-diddly-ho there, neighborino')).toBe(
      'hi-diddly-ho there, neighbo...'
    );
    expect(
      truncate('hi-diddly-ho there, neighborino', {
        length: 24,
        separator: ' ',
      })
    ).toBe('hi-diddly-ho there,...');
  });
});

describe('unescape', () => {
  it('should unescape HTML', () => {
    expect(unescape('fred, barney, &amp; pebbles')).toBe(
      'fred, barney, & pebbles'
    );
  });
});

describe('upperCase', () => {
  it('should convert to upper case', () => {
    expect(upperCase('--foo-bar--')).toBe('FOO BAR');
  });
});

describe('upperFirst', () => {
  it('should upper first character', () => {
    expect(upperFirst('fred')).toBe('Fred');
  });
});

describe('words', () => {
  it('should split into words', () => {
    expect(words('fred, barney, & pebbles')).toEqual([
      'fred',
      'barney',
      'pebbles',
    ]);
  });
});
