import {
  chunk,
  compact,
  concat,
  difference,
  drop,
  dropRight,
  fill,
  findIndex,
  findLastIndex,
  flatten,
  flattenDeep,
  flattenDepth,
  fromPairs,
  head,
  indexOf,
  initial,
  intersection,
  join,
  last,
  lastIndexOf,
  nth,
  pull,
  pullAll,
  pullAllBy,
  remove,
  reverse,
  slice,
  sortedIndex,
  sortedUniq,
  tail,
  take,
  takeRight,
  union,
  uniq,
  unzip,
  without,
  xor,
  zip,
  zipObject,
} from '../src/array.js';

describe('chunk', () => {
  it('should split array into chunks', () => {
    expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ]);
    expect(chunk(['a', 'b', 'c', 'd'], 3)).toEqual([['a', 'b', 'c'], ['d']]);
  });
});

describe('compact', () => {
  it('should remove falsy values', () => {
    expect(compact([0, 1, false, 2, '', 3])).toEqual([1, 2, 3]);
  });
});

describe('concat', () => {
  it('should concat arrays and values', () => {
    expect(concat([1], 2, [3], [[4]])).toEqual([1, 2, 3, [4]]);
  });
});

describe('difference', () => {
  it('should return difference', () => {
    expect(difference([2, 1], [2, 3])).toEqual([1]);
  });
});

describe('drop', () => {
  it('should drop first n elements', () => {
    expect(drop([1, 2, 3])).toEqual([2, 3]);
    expect(drop([1, 2, 3], 2)).toEqual([3]);
    expect(drop([1, 2, 3], 5)).toEqual([]);
    expect(drop([1, 2, 3], 0)).toEqual([1, 2, 3]);
  });
});

describe('dropRight', () => {
  it('should drop last n elements', () => {
    expect(dropRight([1, 2, 3])).toEqual([1, 2]);
    expect(dropRight([1, 2, 3], 2)).toEqual([1]);
    expect(dropRight([1, 2, 3], 5)).toEqual([]);
    expect(dropRight([1, 2, 3], 0)).toEqual([1, 2, 3]);
  });
});

describe('fill', () => {
  it('should fill elements', () => {
    expect(fill([1, 2, 3], 'a')).toEqual(['a', 'a', 'a']);
    expect(fill([4, 6, 8, 10], '*', 1, 3)).toEqual([4, '*', '*', 10]);
  });
});

describe('findIndex', () => {
  it('should find index by predicate', () => {
    const users = [
      { user: 'barney', active: false },
      { user: 'fred', active: true },
      { user: 'pebbles', active: false },
    ];
    expect(findIndex(users, (u) => u.user === 'fred')).toBe(1);
    expect(findIndex(users, (u) => u.user === 'nonexistent')).toBe(-1);
  });
});

describe('findLastIndex', () => {
  it('should find last index by predicate', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: false },
      { user: 'pebbles', active: true },
    ];
    expect(findLastIndex(users, (u) => u.active)).toBe(2);
  });
});

describe('flatten', () => {
  it('should flatten a single level', () => {
    expect(flatten([1, [2, [3, [4]]]])).toEqual([1, 2, [3, [4]]]);
  });
});

describe('flattenDeep', () => {
  it('should flatten recursively', () => {
    expect(flattenDeep([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
  });
});

describe('flattenDepth', () => {
  it('should flatten to depth', () => {
    expect(flattenDepth([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
  });
});

describe('fromPairs', () => {
  it('should create object from pairs', () => {
    expect(
      fromPairs([
        ['a', 1],
        ['b', 2],
      ])
    ).toEqual({ a: 1, b: 2 });
  });
});

describe('head', () => {
  it('should get first element', () => {
    expect(head([1, 2, 3])).toBe(1);
    expect(head([])).toBeUndefined();
  });
});

describe('indexOf', () => {
  it('should find index of value', () => {
    expect(indexOf([1, 2, 1, 2], 2)).toBe(1);
    expect(indexOf([1, 2, 1, 2], 2, 2)).toBe(3);
    expect(indexOf([1, 2, 1, 2], 3)).toBe(-1);
  });
});

describe('initial', () => {
  it('should return all but last', () => {
    expect(initial([1, 2, 3])).toEqual([1, 2]);
  });
});

describe('intersection', () => {
  it('should return intersection', () => {
    expect(intersection([2, 1], [2, 3])).toEqual([2]);
    expect(intersection([1, 2], [3, 4])).toEqual([]);
  });
});

describe('join', () => {
  it('should join elements', () => {
    expect(join(['a', 'b', 'c'], '~')).toBe('a~b~c');
    expect(join([1, 2, 3])).toBe('1,2,3');
  });
});

describe('last', () => {
  it('should get last element', () => {
    expect(last([1, 2, 3])).toBe(3);
    expect(last([])).toBeUndefined();
  });
});

describe('lastIndexOf', () => {
  it('should find last index', () => {
    expect(lastIndexOf([1, 2, 1, 2], 2)).toBe(3);
  });
});

describe('nth', () => {
  it('should get nth element', () => {
    expect(nth([1, 2, 3], 1)).toBe(2);
    expect(nth([1, 2, 3], -1)).toBe(3);
  });
});

describe('pull', () => {
  it('should remove values', () => {
    expect(pull([1, 2, 3, 1, 2, 3], 2, 3)).toEqual([1, 1]);
  });
});

describe('pullAll', () => {
  it('should remove all specified values', () => {
    expect(pullAll([1, 2, 3, 1, 2, 3], [2, 3])).toEqual([1, 1]);
  });
});

describe('pullAllBy', () => {
  it('should pull by iteratee', () => {
    expect(
      pullAllBy(
        [{ x: 1 }, { x: 2 }, { x: 3 }],
        [{ x: 1 }, { x: 3 }],
        (o) => o.x
      )
    ).toEqual([{ x: 2 }]);
  });
});

describe('remove', () => {
  it('should remove matched elements', () => {
    expect(remove([1, 2, 3, 4], (n) => n % 2 === 0)).toEqual([2, 4]);
  });
});

describe('reverse', () => {
  it('should reverse array', () => {
    expect(reverse([1, 2, 3])).toEqual([3, 2, 1]);
  });
});

describe('slice', () => {
  it('should slice array', () => {
    expect(slice([1, 2, 3, 4], 1, 3)).toEqual([2, 3]);
  });
});

describe('sortedIndex', () => {
  it('should find sorted index', () => {
    expect(sortedIndex([30, 50], 40)).toBe(1);
  });
});

describe('sortedUniq', () => {
  it('should return sorted unique', () => {
    expect(sortedUniq([1, 1, 2])).toEqual([1, 2]);
  });
});

describe('tail', () => {
  it('should return all but first', () => {
    expect(tail([1, 2, 3])).toEqual([2, 3]);
  });
});

describe('take', () => {
  it('should take first n', () => {
    expect(take([1, 2, 3])).toEqual([1]);
    expect(take([1, 2, 3], 2)).toEqual([1, 2]);
    expect(take([1, 2, 3], 5)).toEqual([1, 2, 3]);
    expect(take([1, 2, 3], 0)).toEqual([]);
  });
});

describe('takeRight', () => {
  it('should take last n', () => {
    expect(takeRight([1, 2, 3])).toEqual([3]);
    expect(takeRight([1, 2, 3], 2)).toEqual([2, 3]);
  });
});

describe('union', () => {
  it('should return union', () => {
    expect(union([2], [1, 2])).toEqual([2, 1]);
  });
});

describe('uniq', () => {
  it('should return unique values', () => {
    expect(uniq([2, 1, 2])).toEqual([2, 1]);
  });
});

describe('unzip', () => {
  it('should unzip arrays', () => {
    expect(
      unzip([
        ['a', 1, true],
        ['b', 2, false],
      ])
    ).toEqual([
      ['a', 'b'],
      [1, 2],
      [true, false],
    ]);
  });
});

describe('without', () => {
  it('should return array without values', () => {
    expect(without([2, 1, 2, 3], 1, 2)).toEqual([3]);
  });
});

describe('xor', () => {
  it('should return xor', () => {
    expect(xor([2, 1], [2, 3])).toEqual([1, 3]);
  });
});

describe('zip', () => {
  it('should zip arrays', () => {
    expect(zip(['a', 'b'], [1, 2], [true, false])).toEqual([
      ['a', 1, true],
      ['b', 2, false],
    ]);
  });
});

describe('zipObject', () => {
  it('should zip into object', () => {
    expect(zipObject(['a', 'b'], [1, 2])).toEqual({ a: 1, b: 2 });
  });
});
