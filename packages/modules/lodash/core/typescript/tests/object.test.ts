import {
  assign,
  entries,
  findKey,
  findLastKey,
  forIn,
  forOwn,
  functions,
  get,
  has,
  hasIn,
  invert,
  keys,
  mapKeys,
  mapValues,
  omit,
  omitBy,
  pick,
  pickBy,
  set,
  toPairs,
  values,
} from '../src/object.js';

describe('assign', () => {
  it('should assign sources', () => {
    expect(assign({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
  });
});

describe('entries', () => {
  it('should return entries', () => {
    expect(entries({ a: 1, b: 2 })).toEqual([
      ['a', 1],
      ['b', 2],
    ]);
  });
});

describe('findKey', () => {
  it('should find key by predicate', () => {
    expect(findKey({ a: 1, b: 2, c: 3 }, (v) => v === 2)).toBe('b');
    expect(findKey({ a: 1, b: 2 }, (v) => v === 4)).toBeUndefined();
  });
});

describe('findLastKey', () => {
  it('should find last key', () => {
    expect(findLastKey({ a: 1, b: 2, c: 2 }, (v) => v === 2)).toBe('c');
  });
});

describe('forIn', () => {
  it('should iterate over own and inherited', () => {
    const result: string[] = [];
    forIn({ a: 1, b: 2 }, (_v, k) => result.push(k));
    expect(result).toEqual(['a', 'b']);
  });
});

describe('forOwn', () => {
  it('should iterate over own keys', () => {
    const result: string[] = [];
    forOwn({ a: 1, b: 2 }, (_v, k) => result.push(k));
    expect(result).toEqual(['a', 'b']);
  });
});

describe('functions', () => {
  it('should return function names', () => {
    expect(functions({ a: () => {}, b: 1, c: () => {} }).sort()).toEqual([
      'a',
      'c',
    ]);
  });
});

describe('get', () => {
  it('should get nested value', () => {
    expect(get({ a: { b: 1 } }, 'a.b')).toBe(1);
    expect(get({ a: { b: 1 } }, 'a.c')).toBeUndefined();
    expect(get({ a: { b: 1 } }, 'a.c', 'default')).toBe('default');
  });
});

describe('has', () => {
  it('should check for own property', () => {
    expect(has({ a: 1 }, 'a')).toBe(true);
    expect(has({ a: 1 }, 'b')).toBe(false);
  });
});

describe('hasIn', () => {
  it('should check for inherited property', () => {
    expect(hasIn({ a: 1 }, 'a')).toBe(true);
    expect(hasIn({ a: 1 }, 'b')).toBe(false);
  });
});

describe('invert', () => {
  it('should invert object', () => {
    expect(invert({ a: 'x', b: 'y' })).toEqual({ x: 'a', y: 'b' });
  });
});

describe('keys', () => {
  it('should return keys', () => {
    expect(keys({ a: 1, b: 2 })).toEqual(['a', 'b']);
  });
});

describe('mapKeys', () => {
  it('should map keys', () => {
    expect(mapKeys({ a: 1, b: 2 }, (_v, k) => k + ' mapped')).toEqual({
      'a mapped': 1,
      'b mapped': 2,
    });
  });
});

describe('mapValues', () => {
  it('should map values', () => {
    expect(mapValues({ a: 1, b: 2 }, (v) => v * 2)).toEqual({ a: 2, b: 4 });
  });
});

describe('omit', () => {
  it('should omit keys', () => {
    expect(omit({ a: 1, b: 2, c: 3 }, 'a', 'c')).toEqual({ b: 2 });
  });
});

describe('omitBy', () => {
  it('should omit by predicate', () => {
    expect(omitBy({ a: 1, b: 2, c: 3 }, (v) => v > 1)).toEqual({ a: 1 });
  });
});

describe('pick', () => {
  it('should pick keys', () => {
    expect(pick({ a: 1, b: 2, c: 3 }, 'a', 'c')).toEqual({ a: 1, c: 3 });
  });
});

describe('pickBy', () => {
  it('should pick by predicate', () => {
    expect(pickBy({ a: 1, b: 2, c: 3 }, (v) => v > 1)).toEqual({ b: 2, c: 3 });
  });
});

describe('set', () => {
  it('should set nested value', () => {
    expect(set({}, 'a.b.c', 1)).toEqual({ a: { b: { c: 1 } } });
  });
});

describe('toPairs', () => {
  it('should return pairs', () => {
    expect(toPairs({ a: 1, b: 2 })).toEqual([
      ['a', 1],
      ['b', 2],
    ]);
  });
});

describe('values', () => {
  it('should return values', () => {
    expect(values({ a: 1, b: 2 })).toEqual([1, 2]);
  });
});
