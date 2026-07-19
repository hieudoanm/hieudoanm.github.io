import { Recorder } from '../shared/recorder';
import type { Frame } from '../shared/types';

/**
 * Divide-and-conquer and selection sorts: merge, quicksort, and heapsort.
 *
 * These break the array differently, so each is recorded in its own shape
 * rather than sharing a template with the quadratic family.
 */

const merge = (r: Recorder, lo: number, mid: number, hi: number): void => {
  const leftSize = mid - lo + 1;
  const size = leftSize + (hi - mid);
  r.setAux('Auxiliary buffer', size);
  for (let k = 0; k < size; k++) r.setAuxAt(k, r.at(lo + k));
  r.push(`Copy [${lo}..${hi}] into the buffer before overwriting anything.`);

  let i = 0;
  let j = leftSize;
  for (let k = 0; k < size; k++) {
    // A half is only exhausted once its cursor passes its own length; the
    // buffer holds both halves, so a non-null read alone would leak across.
    const leftDone = i >= leftSize;
    const rightDone = j >= size;
    if (!leftDone && !rightDone) r.countComparison();
    const takeLeft =
      !leftDone &&
      (rightDone || (r.auxAt(i) as number) <= (r.auxAt(j) as number));
    const value = takeLeft ? (r.auxAt(i) as number) : (r.auxAt(j) as number);
    r.write(lo + k, value);
    if (takeLeft) i++;
    else j++;
    r.push(`Write ${value} to index ${lo + k}.`);
  }
};

export const recordMergeSort = (input: readonly number[]): Frame[] => {
  const r = new Recorder(input);
  r.push('Split in half until each run is a single element.');
  const sort = (lo: number, hi: number): void => {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    sort(lo, mid);
    sort(mid + 1, hi);
    r.markAll('idle');
    r.markAll('active', lo, hi);
    merge(r, lo, mid, hi);
  };
  sort(0, r.length - 1);
  r.clearMarks();
  r.setAllSorted();
  r.push('Merge sort done.');
  return r.result;
};

export const recordQuickSort = (input: readonly number[]): Frame[] => {
  const r = new Recorder(input);
  r.push('Partition around a pivot, then recurse into each side.');
  const sort = (lo: number, hi: number): void => {
    if (lo >= hi) {
      if (lo === hi) r.push(`Index ${lo} is a single element, already placed.`);
      return;
    }
    const pivot = r.at(hi);
    r.push(
      `Pivot ${pivot} parked at index ${hi}; partition [${lo}..${hi - 1}].`
    );
    let store = lo;
    for (let i = lo; i < hi; i++) {
      if (r.less(i, hi) && r.at(i) <= pivot) {
        if (store !== i) {
          r.swap(store, i);
          r.push(`Swap the value into the left partition at index ${store}.`);
        }
        store++;
      }
    }
    r.swap(store, hi);
    r.markAll('idle', lo, store - 1);
    r.push(`Pivot lands at index ${store}; everything left is smaller.`);
    r.markAll('sorted', store, store);
    sort(lo, store - 1);
    sort(store + 1, hi);
  };
  sort(0, r.length - 1);
  r.clearMarks();
  r.setAllSorted();
  r.push('Quicksort done.');
  return r.result;
};

export const recordHeapSort = (input: readonly number[]): Frame[] => {
  const r = new Recorder(input);
  r.push('Build a max-heap, then repeatedly swap the root to the end.');
  const size = r.length;
  const sift = (root: number, end: number): void => {
    let i = root;
    for (;;) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let largest = i;
      if (left < end && r.greater(left, largest)) largest = left;
      if (right < end && r.greater(right, largest)) largest = right;
      if (largest === i) return;
      r.swap(i, largest);
      r.push(`Sift: swap index ${i} with its larger child.`);
      i = largest;
    }
  };
  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) sift(i, size);
  r.push('Heap property holds everywhere.');
  for (let end = size - 1; end > 0; end--) {
    r.swap(0, end);
    r.markAll('sorted', end, size - 1);
    r.push(`Max is now fixed at index ${end}; sift the root down.`);
    sift(0, end);
  }
  r.clearMarks();
  r.setAllSorted();
  r.push('Heapsort done.');
  return r.result;
};
