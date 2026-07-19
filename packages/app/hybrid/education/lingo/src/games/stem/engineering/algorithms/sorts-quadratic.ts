import { Recorder } from '../shared/recorder';
import type { Frame } from '../shared/types';

/**
 * The three quadratic sorts, recorded frame by frame.
 *
 * They share an outer shape — repeated passes, each shrinking by one — so they
 * live together to make the differences (which end is the boundary, where the
 * pivot lives) easy to compare side by side.
 */

export const recordBubbleSort = (input: readonly number[]): Frame[] => {
  const r = new Recorder(input);
  r.push('Start unsorted.');
  for (let end = r.length - 1; end > 0; end--) {
    let swapped = false;
    for (let i = 0; i < end; i++) {
      r.compare(i, i + 1);
      if (r.at(i) > r.at(i + 1)) {
        r.swap(i, i + 1);
        swapped = true;
        r.push(`Swap out of order: ${r.at(i + 1)} > ${r.at(i)}.`);
      }
    }
    r.markAll('idle', 0, end - 1);
    r.push(`Largest of the prefix is now fixed at index ${end}.`);
    if (!swapped) {
      r.push('A full pass with no swaps means the array is already ordered.');
      break;
    }
  }
  r.clearMarks();
  r.setAllSorted();
  r.push('Bubble sort done.');
  return r.result;
};

export const recordInsertionSort = (input: readonly number[]): Frame[] => {
  const r = new Recorder(input);
  r.push('The prefix left of the marker is already sorted.');
  for (let i = 1; i < r.length; i++) {
    const key = r.at(i);
    r.push(`Lift ${key} out and insert it into the sorted prefix.`);
    let j = i - 1;
    while (j >= 0) {
      r.compare(j, j + 1);
      if (r.at(j) > key) {
        r.write(j + 1, r.at(j));
        r.push(`Shift ${r.at(j + 1)} right, opening a gap.`);
        j--;
      } else break;
    }
    r.write(j + 1, key);
    r.push(`${key} settles into index ${j + 1}.`);
    r.markAll('sorted', 0, i);
  }
  r.clearMarks();
  r.setAllSorted();
  r.push('Insertion sort done.');
  return r.result;
};

export const recordSelectionSort = (input: readonly number[]): Frame[] => {
  const r = new Recorder(input);
  r.push('Scan the unsorted region for its minimum, then swap it into place.');
  for (let i = 0; i < r.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < r.length; j++) {
      r.compare(min, j);
      if (r.at(j) < r.at(min)) min = j;
    }
    if (min !== i) {
      r.swap(i, min);
      r.push(`Swap the minimum into index ${i}.`);
    } else {
      r.push(`Index ${i} already holds the minimum.`);
    }
    r.markAll('sorted', 0, i);
  }
  r.clearMarks();
  r.setAllSorted();
  r.push('Selection sort done.');
  return r.result;
};
