import {
  after,
  ary,
  before,
  bind,
  curry,
  defer,
  delay,
  flip,
  memoize,
  negate,
  once,
  partial,
  rest,
  spread,
  unary,
} from '../src/function.js';

describe('after', () => {
  it('should only call after n times', () => {
    const fn = jest.fn();
    const afterFn = after(2, fn);
    afterFn();
    expect(fn).not.toHaveBeenCalled();
    afterFn();
    expect(fn).toHaveBeenCalledTimes(1);
    afterFn();
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

describe('ary', () => {
  it('should limit arity', () => {
    expect(
      ary((a: number, b: number, c: number) => [a, b, c], 2)(1, 2, 3)
    ).toEqual([1, 2, undefined]);
  });
});

describe('before', () => {
  it('should only call before n times', () => {
    let count = 0;
    const beforeFn = before(3, () => ++count);
    beforeFn();
    expect(count).toBe(1);
    beforeFn();
    expect(count).toBe(2);
    beforeFn();
    expect(count).toBe(2);
  });
});

describe('bind', () => {
  it('should bind this and partials', () => {
    const fn = function (
      this: Record<string, string>,
      greeting: string,
      punctuation: string
    ) {
      return `${greeting} ${this.name}${punctuation}`;
    };
    const bound = bind(fn, { name: 'fred' }, 'hi');
    expect(bound('!')).toBe('hi fred!');
  });
});

describe('curry', () => {
  it('should curry function', () => {
    const curried = curry((a: number, b: number, c: number) => a + b + c);
    expect(curried(1)(2)(3)).toBe(6);
    expect(curried(1, 2)(3)).toBe(6);
    expect(curried(1, 2, 3)).toBe(6);
  });
});

describe('defer', () => {
  it('should defer function', async () => {
    const result = await new Promise<boolean>((resolve) => {
      defer(() => resolve(true));
    });
    expect(result).toBe(true);
  });
});

describe('delay', () => {
  it('should delay function', async () => {
    const start = Date.now();
    await new Promise<void>((resolve) => {
      delay(() => resolve(), 10);
    });
    expect(Date.now() - start).toBeGreaterThanOrEqual(8);
  });
});

describe('flip', () => {
  it('should flip arguments', () => {
    expect(
      flip((a: string, b: string, c: string) => [a, b, c])('a', 'b', 'c')
    ).toEqual(['c', 'b', 'a']);
  });
});

describe('memoize', () => {
  it('should memoize results', () => {
    let callCount = 0;
    const fn = memoize((n: number) => {
      callCount++;
      return n * 2;
    });
    expect(fn(1)).toBe(2);
    expect(fn(1)).toBe(2);
    expect(callCount).toBe(1);
    expect(fn(2)).toBe(4);
    expect(callCount).toBe(2);
  });

  it('should have cache property', () => {
    const fn = memoize((n: number) => n * 2);
    fn(1);
    expect(fn.cache instanceof Map).toBe(true);
  });
});

describe('negate', () => {
  it('should negate predicate', () => {
    const isEven = (n: number) => n % 2 === 0;
    const isOdd = negate(isEven);
    expect(isOdd(1)).toBe(true);
    expect(isOdd(2)).toBe(false);
  });
});

describe('once', () => {
  it('should only call once', () => {
    let count = 0;
    const fn = once(() => ++count);
    expect(fn()).toBe(1);
    expect(fn()).toBe(1);
    expect(count).toBe(1);
  });
});

describe('partial', () => {
  it('should partially apply', () => {
    const fn = (a: number, b: number, c: number) => a + b + c;
    const partialFn = partial(fn, 1, partial.placeholder);
    expect(partialFn(2, 3)).toBe(6);
  });
});

describe('rest', () => {
  it('should collect rest args', () => {
    const fn = rest((a: number, b: number, restArgs: number[]) => [
      a,
      b,
      restArgs,
    ]);
    expect(fn(1, 2, 3, 4)).toEqual([1, 2, [3, 4]]);
  });
});

describe('spread', () => {
  it('should spread array args', () => {
    expect(spread((a: number, b: number) => a + b)([1, 2])).toBe(3);
  });
});

describe('unary', () => {
  it('should accept only one arg', () => {
    expect(unary((a: number) => a)(1, 2, 3)).toBe(1);
  });
});
