import { range } from '.';

describe('range', () => {
  it('should return array of numbers', () => {
    const numbers = range(3);
    expect(numbers).toEqual([0, 1, 2]);
  });

  it('should return array of numbers with min and max (excluded)', () => {
    const numbers = range(3, 6);
    expect(numbers).toEqual([3, 4, 5]);
  });
});
