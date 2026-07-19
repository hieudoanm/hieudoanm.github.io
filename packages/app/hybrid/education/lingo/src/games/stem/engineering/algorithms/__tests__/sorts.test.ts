import {
  recordBubbleSort,
  recordInsertionSort,
  recordSelectionSort,
} from '../sorts-quadratic';
import {
  recordHeapSort,
  recordMergeSort,
  recordQuickSort,
} from '../sorts-divide';
import { makeDistinctArray } from '../../shared/random';
import type { Frame } from '../../shared/types';

const SORTS: [string, (input: readonly number[]) => Frame[]][] = [
  ['bubble sort', recordBubbleSort],
  ['insertion sort', recordInsertionSort],
  ['selection sort', recordSelectionSort],
  ['merge sort', recordMergeSort],
  ['quicksort', recordQuickSort],
  ['heapsort', recordHeapSort],
];

const lastValues = (frames: Frame[]): number[] =>
  frames[frames.length - 1].values;

const ascending = (xs: number[]): number[] => [...xs].sort((a, b) => a - b);

describe.each(SORTS)('%s', (_name, sort) => {
  it('sorts arrays of every small size', () => {
    for (let size = 1; size <= 12; size++) {
      const input = makeDistinctArray(size, size, 1, 200);
      expect(lastValues(sort(input))).toEqual(ascending(input));
    }
  });

  it('leaves an already-sorted array ordered', () => {
    expect(lastValues(sort([1, 2, 3, 4, 5]))).toEqual([1, 2, 3, 4, 5]);
  });

  it('handles duplicates', () => {
    expect(lastValues(sort([3, 1, 3, 2, 1]))).toEqual([1, 1, 2, 3, 3]);
  });

  it('does not mutate the caller array', () => {
    const input = [4, 2, 5, 1];
    sort(input);
    expect(input).toEqual([4, 2, 5, 1]);
  });

  it('records a state for every cell in every frame', () => {
    for (const frame of sort([5, 3, 9, 1])) {
      expect(frame.states).toHaveLength(frame.values.length);
    }
  });

  it('counts at least one comparison', () => {
    const frames = sort([5, 3, 9, 1]);
    expect(frames[frames.length - 1].comparisons).toBeGreaterThan(0);
  });

  it('ends on a fully sorted frame', () => {
    const frames = sort([5, 3, 9, 1]);
    const last = frames[frames.length - 1];
    expect(last.states.every((s) => s === 'sorted')).toBe(true);
  });
});

describe('sort growth', () => {
  const SIZES = [16, 32, 64];

  it('bubble sort comparisons grow quadratically', () => {
    const counts = SIZES.map((n) =>
      finalComparisons(recordBubbleSort(larger(n)))
    );
    expect(counts[1]).toBeGreaterThan(counts[0] * 2);
    expect(counts[2]).toBeGreaterThan(counts[1] * 2);
  });

  it('merge sort comparisons grow sub-quadratically', () => {
    // A 4x size increase means 16x work if quadratic, but only ~6x at n log n.
    const counts = SIZES.map((n) =>
      finalComparisons(recordMergeSort(larger(n)))
    );
    expect(counts[2]).toBeLessThan(counts[0] * 10);
    expect(counts[2]).toBeGreaterThan(counts[0]);
  });
});

const larger = (size: number): number[] => makeDistinctArray(7, size, 1, 5000);

const finalComparisons = (frames: Frame[]): number =>
  frames[frames.length - 1].comparisons ?? 0;
