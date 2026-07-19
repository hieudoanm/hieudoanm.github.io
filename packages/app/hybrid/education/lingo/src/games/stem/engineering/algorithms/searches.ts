import { Recorder } from '../shared/recorder';
import type { Frame } from '../shared/types';

/**
 * Linear and binary search, recorded frame by frame.
 *
 * Both walk an array looking for a target, so they share the Recorder and
 * differ only in how the next probe is chosen — which is the entire point the
 * visualiser is meant to make.
 */

export const recordLinearSearch = (
  input: readonly number[],
  target: number
): Frame[] => {
  const r = new Recorder(input);
  r.markAll('idle');
  r.push(`Start at index 0 and compare every element against ${target}.`);
  for (let i = 0; i < r.length; i++) {
    r.compare(i, i);
    const hit = r.at(i) === target;
    r.push(`Index ${i} holds ${r.at(i)}: ${hit ? 'match' : 'not the target'}.`);
    if (hit) {
      r.markAll('idle');
      r.push(`${target} found at index ${i}.`);
      return r.result;
    }
  }
  r.push(`${target} is not present.`);
  return r.result;
};

export const recordBinarySearch = (
  input: readonly number[],
  target: number
): Frame[] => {
  const sorted = [...input].sort((a, b) => a - b);
  const r = new Recorder(sorted);
  r.push(`Sorted input; target ${target}.`);
  let lo = 0;
  let hi = r.length - 1;
  while (lo <= hi) {
    r.setRange([lo, hi]);
    const mid = Math.floor((lo + hi) / 2);
    r.compare(mid, mid);
    const value = r.at(mid);
    if (value === target) {
      r.markAll('idle', 0, r.length - 1);
      r.push(`${target} found at index ${mid}.`);
      r.setRange(undefined);
      return r.result;
    }
    r.push(
      `${value} is ${value < target ? 'smaller' : 'larger'}; halve the window.`
    );
    if (value < target) lo = mid + 1;
    else hi = mid - 1;
  }
  r.setRange(undefined);
  r.push(`Window empties — ${target} is not present.`);
  return r.result;
};

/** How many probes a search needs, for the theory-page comparison table. */
export const probeCount = (
  input: readonly number[],
  target: number,
  binary: boolean
): number => {
  const frames = binary
    ? recordBinarySearch(input, target)
    : recordLinearSearch(input, target);
  return frames.filter(
    (f) => f.note.includes('Index') || f.note.includes('not the target')
  ).length;
};
