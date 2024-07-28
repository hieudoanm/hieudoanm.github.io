import { unique } from '.';

describe('unique', () => {
  it('should return unique array', () => {
    const array = [1, 1, 2, 2, 3, 3];
    expect(unique(array)).toEqual([1, 2, 3]);
  });
});
