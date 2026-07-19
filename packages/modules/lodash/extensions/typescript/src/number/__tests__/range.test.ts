import { range } from '../range';

describe('range', () => {
  it('generates ascending range from zero', () => {
    expect(range(4)).toEqual([0, 1, 2, 3]);
  });

  it('generates descending range for a negative end', () => {
    expect(range(-4)).toEqual([0, -1, -2, -3]);
  });

  it('generates range between start and end', () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4]);
  });

  it('honors a positive step', () => {
    expect(range(0, 20, 5)).toEqual([0, 5, 10, 15]);
  });

  it('honors a negative step', () => {
    expect(range(0, -4, -1)).toEqual([0, -1, -2, -3]);
  });

  it('defaults to descending when end is below start', () => {
    expect(range(5, 1)).toEqual([5, 4, 3, 2]);
  });

  it('returns empty when direction conflicts with step', () => {
    expect(range(1, 5, -1)).toEqual([]);
  });

  it('repeats start when step is zero', () => {
    expect(range(1, 4, 0)).toEqual([1, 1, 1]);
  });

  it('returns empty for a zero end', () => {
    expect(range(0)).toEqual([]);
  });
});
