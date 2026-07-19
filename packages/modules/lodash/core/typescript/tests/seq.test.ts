import { chain, tap, thru } from '../src/seq.js';

describe('chain', () => {
  it('should chain value', () => {
    const result = chain([1, 2, 3])
      .tap((arr) => {
        arr.push(4);
      })
      .thru((arr) => arr.map((n) => n * 2))
      .value();
    expect(result).toEqual([2, 4, 6, 8]);
  });
});

describe('tap', () => {
  it('should tap value', () => {
    const result: number[] = [];
    expect(
      tap([1, 2, 3], (arr) => {
        result.push(...arr);
      })
    ).toEqual([1, 2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });
});

describe('thru', () => {
  it('should transform value', () => {
    expect(thru(5, (n) => n * 2)).toBe(10);
  });
});
