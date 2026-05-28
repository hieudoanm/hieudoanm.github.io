import {
  clone,
  cloneDeep,
  eq,
  gt,
  gte,
  isArguments,
  isArray,
  isBoolean,
  isDate,
  isEmpty,
  isEqual,
  isError,
  isFunction,
  isInteger,
  isNil,
  isNull,
  isNumber,
  isObject,
  isRegExp,
  isString,
  isUndefined,
  lt,
  lte,
  toArray,
  toFinite,
  toInteger,
  toNumber,
  toString,
} from '../src/lang.js';

describe('clone', () => {
  it('should shallow clone', () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloned = clone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.b).toBe(obj.b);
  });
});

describe('cloneDeep', () => {
  it('should deep clone', () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloned = cloneDeep(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.b).not.toBe(obj.b);
  });
});

describe('eq', () => {
  it('should check SameValueZero equality', () => {
    expect(eq(1, 1)).toBe(true);
    expect(eq(NaN, NaN)).toBe(true);
    expect(eq('a', Object('a'))).toBe(false);
  });
});

describe('gt/gte/lt/lte', () => {
  it('should compare values', () => {
    expect(gt(3, 1)).toBe(true);
    expect(gte(3, 3)).toBe(true);
    expect(lt(1, 3)).toBe(true);
    expect(lte(3, 3)).toBe(true);
  });
});

describe('isArguments', () => {
  it('should detect arguments', () => {
    function argsFn() {
      return arguments;
    } // eslint-disable-line prefer-rest-params
    expect(isArguments(argsFn())).toBe(true);
    expect(isArguments([1, 2, 3])).toBe(false);
  });
});

describe('isArray', () => {
  it('should detect arrays', () => {
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray('abc')).toBe(false);
  });
});

describe('isBoolean', () => {
  it('should detect booleans', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(1)).toBe(false);
  });
});

describe('isDate', () => {
  it('should detect dates', () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate('2021-01-01')).toBe(false);
  });
});

describe('isEmpty', () => {
  it('should check if empty', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty({ a: 1 })).toBe(false);
  });
});

describe('isEqual', () => {
  it('should deep compare', () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
    expect(isEqual(NaN, NaN)).toBe(true);
    expect(isEqual(new Date(2021, 0, 1), new Date(2021, 0, 1))).toBe(true);
  });
});

describe('isError', () => {
  it('should detect errors', () => {
    expect(isError(new Error())).toBe(true);
    expect(isError('error')).toBe(false);
  });
});

describe('isFunction', () => {
  it('should detect functions', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(class {})).toBe(true);
    expect(isFunction(1)).toBe(false);
  });
});

describe('isInteger', () => {
  it('should detect integers', () => {
    expect(isInteger(1)).toBe(true);
    expect(isInteger(1.5)).toBe(false);
    expect(isInteger('1')).toBe(false);
  });
});

describe('isNil', () => {
  it('should detect nil', () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNil(0)).toBe(false);
    expect(isNil('')).toBe(false);
  });
});

describe('isNull', () => {
  it('should detect null', () => {
    expect(isNull(null)).toBe(true);
    expect(isNull(undefined)).toBe(false);
  });
});

describe('isNumber', () => {
  it('should detect numbers', () => {
    expect(isNumber(1)).toBe(true);
    expect(isNumber(NaN)).toBe(true);
    expect(isNumber('1')).toBe(false);
  });
});

describe('isObject', () => {
  it('should detect objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject(() => {})).toBe(true);
    expect(isObject(null)).toBe(false);
    expect(isObject(1)).toBe(false);
  });
});

describe('isRegExp', () => {
  it('should detect regexps', () => {
    expect(isRegExp(/test/)).toBe(true);
    expect(isRegExp('/test/')).toBe(false);
  });
});

describe('isString', () => {
  it('should detect strings', () => {
    expect(isString('abc')).toBe(true);
    expect(isString(1)).toBe(false);
  });
});

describe('isUndefined', () => {
  it('should detect undefined', () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(null)).toBe(false);
  });
});

describe('toArray', () => {
  it('should convert to array', () => {
    expect(toArray({ a: 1, b: 2 })).toEqual([1, 2]);
    expect(toArray('abc')).toEqual(['a', 'b', 'c']);
    expect(toArray(null)).toEqual([]);
  });
});

describe('toFinite', () => {
  it('should convert to finite', () => {
    expect(toFinite(3.2)).toBe(3.2);
    expect(toFinite(Infinity)).toBe(Number.MAX_VALUE);
    expect(toFinite('3.2')).toBe(3.2);
    expect(toFinite(NaN)).toBe(0);
  });
});

describe('toInteger', () => {
  it('should convert to integer', () => {
    expect(toInteger(3.2)).toBe(3);
    expect(toInteger('3.2')).toBe(3);
    expect(toInteger(Infinity)).toBe(Number.MAX_VALUE);
  });
});

describe('toNumber', () => {
  it('should convert to number', () => {
    expect(toNumber('3.2')).toBe(3.2);
    expect(toNumber(null)).toBe(0);
  });
});

describe('toString', () => {
  it('should convert to string', () => {
    expect(toString(null)).toBe('');
    expect(toString(undefined)).toBe('');
    expect(toString(1)).toBe('1');
  });
});
