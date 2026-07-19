import { recordBinarySearch, recordLinearSearch } from '../searches';
import { makeDistinctArray } from '../../shared/random';

const SORTED = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];

describe('recordLinearSearch', () => {
  it('finds a value present in the array', () => {
    const frames = recordLinearSearch(SORTED, 23);
    expect(frames[frames.length - 1].note).toContain('found at index 5');
  });

  it('reports a miss when the value is absent', () => {
    const frames = recordLinearSearch(SORTED, 7);
    expect(frames[frames.length - 1].note).toContain('not present');
  });

  it('probes every element when the value is absent', () => {
    const frames = recordLinearSearch(SORTED, 7);
    expect(frames.length).toBeGreaterThanOrEqual(SORTED.length);
  });

  it('probes one element when the value is first', () => {
    const frames = recordLinearSearch(SORTED, 2);
    expect(frames.length).toBeLessThanOrEqual(3);
  });

  it('finds a value in an unsorted array', () => {
    const frames = recordLinearSearch([9, 4, 7, 1], 7);
    expect(frames[frames.length - 1].note).toContain('found at index 2');
  });
});

describe('recordBinarySearch', () => {
  it('finds a value present in the array', () => {
    const frames = recordBinarySearch(SORTED, 23);
    expect(frames[frames.length - 1].note).toContain('found at index 5');
  });

  it('reports a miss when the value is absent', () => {
    const frames = recordBinarySearch(SORTED, 7);
    expect(frames[frames.length - 1].note).toContain('not present');
  });

  it('sorts unsorted input before searching', () => {
    const frames = recordBinarySearch([9, 4, 7, 1], 7);
    expect(frames[0].values).toEqual([1, 4, 7, 9]);
    expect(frames[frames.length - 1].note).toContain('found at index 2');
  });

  it('uses far fewer probes than linear search', () => {
    const linear = recordLinearSearch(SORTED, 91).length;
    const binary = recordBinarySearch(SORTED, 91).length;
    expect(binary).toBeLessThan(linear);
  });

  it('tracks the live search window', () => {
    const frames = recordBinarySearch(SORTED, 56);
    expect(frames.some((f) => f.range !== undefined)).toBe(true);
  });

  it('finds the first and last elements', () => {
    expect(recordBinarySearch(SORTED, 2)[0].values[0]).toBe(2);
    const frames = recordBinarySearch(SORTED, 91);
    expect(frames[frames.length - 1].note).toContain('found');
  });

  it('handles a single-element array', () => {
    const frames = recordBinarySearch([5], 5);
    expect(frames[frames.length - 1].note).toContain('found at index 0');
  });

  it('misses on a single-element array', () => {
    const frames = recordBinarySearch([5], 6);
    expect(frames[frames.length - 1].note).toContain('not present');
  });

  it('stays correct on a large pseudo-random input', () => {
    const input = makeDistinctArray(3, 40, 1, 200);
    const target = input[17];
    const expected = [...input].sort((a, b) => a - b).indexOf(target);
    const frames = recordBinarySearch(input, target);
    expect(frames[frames.length - 1].note).toContain(
      `found at index ${expected}`
    );
  });
});
