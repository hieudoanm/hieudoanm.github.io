import {
  countBy,
  every,
  filter,
  find,
  findLast,
  flatMap,
  forEach,
  groupBy,
  includes,
  invokeMap,
  keyBy,
  map,
  orderBy,
  partition,
  reduce,
  reduceRight,
  reject,
  sample,
  shuffle,
  size,
  some,
  sortBy,
} from '../src/collection.js';

describe('countBy', () => {
  it('should count by iteratee', () => {
    expect(countBy([6.1, 4.2, 6.3], Math.floor)).toEqual({ '4': 1, '6': 2 });
  });
});

describe('every', () => {
  it('should check if all pass predicate', () => {
    expect(every([true, 1, null, 'yes'], Boolean)).toBe(false);
    expect(every([1, 2, 3], (n) => n > 0)).toBe(true);
  });
});

describe('filter', () => {
  it('should filter array', () => {
    expect(filter([1, 2, 3, 4], (n) => n % 2 === 0)).toEqual([2, 4]);
  });
});

describe('find', () => {
  it('should find element', () => {
    expect(find([1, 2, 3, 4], (n) => n % 2 === 0)).toBe(2);
    expect(find([1, 3, 5], (n) => n % 2 === 0)).toBeUndefined();
  });
});

describe('findLast', () => {
  it('should find last element', () => {
    expect(findLast([1, 2, 3, 4], (n) => n % 2 === 0)).toBe(4);
  });
});

describe('flatMap', () => {
  it('should flat map', () => {
    expect(flatMap([1, 2], (n) => [n, n])).toEqual([1, 1, 2, 2]);
  });
});

describe('forEach', () => {
  it('should iterate over array', () => {
    const result: number[] = [];
    forEach([1, 2, 3], (n) => {
      result.push(n * 2);
    });
    expect(result).toEqual([2, 4, 6]);
  });
});

describe('groupBy', () => {
  it('should group by iteratee', () => {
    expect(groupBy([6.1, 4.2, 6.3], Math.floor)).toEqual({
      '4': [4.2],
      '6': [6.1, 6.3],
    });
  });
});

describe('includes', () => {
  it('should check if includes', () => {
    expect(includes([1, 2, 3], 1)).toBe(true);
    expect(includes([1, 2, 3], 4)).toBe(false);
    expect(includes([1, 2, 3], 1, 2)).toBe(false);
  });
});

describe('invokeMap', () => {
  it('should invoke method', () => {
    expect(invokeMap([['a', 'b', 'c']], 'join', '-')).toEqual(['a-b-c']);
  });
});

describe('keyBy', () => {
  it('should key by iteratee', () => {
    expect(keyBy([{ id: 1 }, { id: 2 }], (o) => o.id)).toEqual({
      1: { id: 1 },
      2: { id: 2 },
    });
  });
});

describe('map', () => {
  it('should map array', () => {
    expect(map([1, 2, 3], (n) => n * 2)).toEqual([2, 4, 6]);
  });
});

describe('orderBy', () => {
  it('should sort by iteratees', () => {
    const users = [
      { user: 'fred', age: 48 },
      { user: 'barney', age: 36 },
      { user: 'fred', age: 40 },
    ];
    expect(
      orderBy(users, [(o) => o.user, (o) => o.age], ['asc', 'desc'])
    ).toEqual([
      { user: 'barney', age: 36 },
      { user: 'fred', age: 48 },
      { user: 'fred', age: 40 },
    ]);
  });
});

describe('partition', () => {
  it('should partition array', () => {
    expect(partition([1, 2, 3, 4], (n) => n % 2 === 0)).toEqual([
      [2, 4],
      [1, 3],
    ]);
  });
});

describe('reduce', () => {
  it('should reduce array', () => {
    expect(reduce([1, 2, 3], (acc, n) => acc + n, 0)).toBe(6);
  });
});

describe('reduceRight', () => {
  it('should reduce right', () => {
    expect(
      reduceRight(
        [
          ['a', 1],
          ['b', 2],
        ] as [string, number][],
        (acc, [key, val]) => ({ ...acc, [key]: val }),
        {}
      )
    ).toEqual({ a: 1, b: 2 });
  });
});

describe('reject', () => {
  it('should reject elements', () => {
    expect(reject([1, 2, 3, 4], (n) => n % 2 === 0)).toEqual([1, 3]);
  });
});

describe('sample', () => {
  it('should sample element', () => {
    const arr = [1, 2, 3];
    const result = sample(arr);
    expect(arr).toContain(result);
  });
});

describe('shuffle', () => {
  it('should shuffle array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffle(arr);
    expect(result).toHaveLength(5);
    expect(result.sort()).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('size', () => {
  it('should return size', () => {
    expect(size([1, 2, 3])).toBe(3);
  });
});

describe('some', () => {
  it('should check if any pass', () => {
    expect(some([null, 0, 'yes', false], Boolean)).toBe(true);
    expect(some([null, 0, false], Boolean)).toBe(false);
  });
});

describe('sortBy', () => {
  it('should sort by iteratees', () => {
    expect(sortBy([3, 1, 2], (n) => n)).toEqual([1, 2, 3]);
  });
});
