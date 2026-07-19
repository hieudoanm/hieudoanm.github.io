import {
  attempt,
  bindAll,
  constant,
  defaultTo,
  flow,
  flowRight,
  identity,
  iteratee,
  matches,
  matchesProperty,
  method,
  methodOf,
  mixin,
  noop,
  nthArg,
  over,
  overEvery,
  overSome,
  property,
  propertyOf,
  range,
  rangeRight,
  stubArray,
  stubFalse,
  stubObject,
  stubString,
  stubTrue,
  times,
  toPath,
} from '../src/util.js';

describe('attempt', () => {
  it('should attempt function', () => {
    expect(attempt(() => JSON.parse('invalid'))).toBeInstanceOf(Error);
    expect(attempt(() => JSON.parse('{}'))).toEqual({});
  });
});

describe('bindAll', () => {
  it('should bind methods', () => {
    const obj = {
      name: 'fred',
      greet() {
        return `hello ${this.name}`;
      },
    };
    bindAll(obj, 'greet');
    expect(obj.greet()).toBe('hello fred');
  });
});

describe('constant', () => {
  it('should return constant', () => {
    const fn = constant({ a: 1 });
    expect(fn()).toEqual({ a: 1 });
    expect(fn()).toBe(fn());
  });
});

describe('defaultTo', () => {
  it('should return default', () => {
    expect(defaultTo(1, 10)).toBe(1);
    expect(defaultTo(null, 10)).toBe(10);
    expect(defaultTo(undefined, 10)).toBe(10);
  });
});

describe('flow', () => {
  it('should flow functions', () => {
    const fn = flow(
      (n: number) => n + 1,
      (n: number) => n * 2
    );
    expect(fn(1)).toBe(4);
  });
});

describe('flowRight', () => {
  it('should flow right', () => {
    const fn = flowRight(
      (n: number) => n * 2,
      (n: number) => n + 1
    );
    expect(fn(1)).toBe(4);
  });
});

describe('identity', () => {
  it('should return the same value', () => {
    expect(identity(1)).toBe(1);
    expect(identity({ a: 1 })).toEqual({ a: 1 });
  });
});

describe('iteratee', () => {
  it('should create iteratee', () => {
    const fn = iteratee('a');
    expect(fn({ a: 1 })).toBe(1);
  });
});

describe('matches', () => {
  it('should match source', () => {
    const fn = matches({ a: 1, b: 2 });
    expect(fn({ a: 1, b: 2, c: 3 })).toBe(true);
    expect(fn({ a: 1, b: 3 })).toBe(false);
  });
});

describe('matchesProperty', () => {
  it('should match property', () => {
    const fn = matchesProperty('a', 1);
    expect(fn({ a: 1, b: 2 })).toBe(true);
    expect(fn({ a: 2 })).toBe(false);
  });
});

describe('method', () => {
  it('should call method', () => {
    const fn = method('join', '-');
    expect(fn([1, 2])).toBe('1-2');
  });
});

describe('methodOf', () => {
  it('should call method of object', () => {
    const obj = { join: (sep: string) => [1, 2].join(sep) };
    const fn = methodOf(obj);
    expect(fn('join')).toBe('1,2');
  });
});

describe('mixin', () => {
  it('should mixin functions', () => {
    const obj = {};
    mixin(obj, { square: (n: number) => n * n });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((obj as any).square(3)).toBe(9);
  });
});

describe('noop', () => {
  it('should return undefined', () => {
    expect(noop()).toBeUndefined();
    expect(noop(1, 2, 3)).toBeUndefined();
  });
});

describe('nthArg', () => {
  it('should return nth argument', () => {
    const fn = nthArg(1);
    expect(fn('a', 'b', 'c')).toBe('b');
    const fn2 = nthArg(-2);
    expect(fn2('a', 'b', 'c')).toBe('b');
  });
});

describe('over', () => {
  it('should invoke iteratees', () => {
    const fn = over(Math.max, Math.min);
    expect(fn(1, 2, 3, 4)).toEqual([4, 1]);
  });
});

describe('overEvery', () => {
  it('should check all predicates', () => {
    const fn = overEvery(
      (n: number) => n > 0,
      (n: number) => n < 5
    );
    expect(fn(3)).toBe(true);
    expect(fn(6)).toBe(false);
  });
});

describe('overSome', () => {
  it('should check some predicates', () => {
    const fn = overSome(
      (n: number) => n > 0,
      (n: number) => n < -5
    );
    expect(fn(3)).toBe(true);
    expect(fn(-10)).toBe(true);
    expect(fn(0)).toBe(false);
  });
});

describe('property', () => {
  it('should return property', () => {
    const fn = property('a');
    expect(fn({ a: 1 })).toBe(1);
  });
});

describe('propertyOf', () => {
  it('should return property of object', () => {
    const fn = propertyOf({ a: 1, b: 2 });
    expect(fn('a')).toBe(1);
  });
});

describe('range', () => {
  it('should create range', () => {
    expect(range(4)).toEqual([0, 1, 2, 3]);
    expect(range(1, 5)).toEqual([1, 2, 3, 4]);
    expect(range(0, 20, 5)).toEqual([0, 5, 10, 15]);
    expect(range(0, -4, -1)).toEqual([0, -1, -2, -3]);
  });
});

describe('rangeRight', () => {
  it('should create range in reverse', () => {
    expect(rangeRight(4)).toEqual([3, 2, 1, 0]);
  });
});

describe('stubArray', () => {
  it('should return empty array', () => {
    expect(stubArray()).toEqual([]);
  });
});

describe('stubFalse', () => {
  it('should return false', () => {
    expect(stubFalse()).toBe(false);
  });
});

describe('stubObject', () => {
  it('should return empty object', () => {
    expect(stubObject()).toEqual({});
  });
});

describe('stubString', () => {
  it('should return empty string', () => {
    expect(stubString()).toBe('');
  });
});

describe('stubTrue', () => {
  it('should return true', () => {
    expect(stubTrue()).toBe(true);
  });
});

describe('times', () => {
  it('should call iteratee n times', () => {
    expect(times(3, String)).toEqual(['0', '1', '2']);
  });
});

describe('toPath', () => {
  it('should convert to path', () => {
    expect(toPath('a.b.c')).toEqual(['a', 'b', 'c']);
    expect(toPath('a[0].b')).toEqual(['a', '0', 'b']);
  });
});
