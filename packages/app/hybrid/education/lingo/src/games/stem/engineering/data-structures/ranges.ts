/**
 * The range-query structures: Fenwick tree and segment tree.
 *
 * Both support point updates and prefix or range sums. They are grouped
 * because the interesting contrast is exactly how each one stores partial
 * results: overlapping blocks for the Fenwick tree, disjoint segments for the
 * segment tree.
 */

export interface RangeStep {
  note: string;
  /** Indices contributing to the running total on this step. */
  used: number[];
  runningTotal: number;
  /** The stored tree, for display. */
  tree: number[];
}

const prefixSumFenwick = (tree: readonly number[], i: number): number => {
  let sum = 0;
  let idx = i;
  while (idx > 0) {
    sum += tree[idx];
    idx -= idx & -idx;
  }
  return sum;
};

export const fenwickBuild = (values: readonly number[]): number[] => {
  const n = values.length;
  const tree = new Array<number>(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    tree[i] += values[i - 1];
    const parent = i + (i & -i);
    if (parent <= n) tree[parent] += tree[i];
  }
  return tree;
};

export const fenwickUpdate = (
  tree: readonly number[],
  index: number,
  delta: number
): number[] => {
  const next = [...tree];
  let idx = index + 1;
  while (idx < next.length) {
    next[idx] += delta;
    idx += idx & -idx;
  }
  return next;
};

/** Records every index a Fenwick prefix query touches. */
export const fenwickQuerySteps = (
  tree: readonly number[],
  end: number
): RangeStep[] => {
  const steps: RangeStep[] = [];
  const used: number[] = [];
  let idx = end;
  let total = 0;
  while (idx > 0) {
    used.push(idx);
    total += tree[idx];
    idx -= idx & -idx;
    steps.push({
      note: `Add block at index ${idx + (idx & -idx)}; step to ${idx}.`,
      used: [...used],
      runningTotal: total,
      tree: [...tree],
    });
  }
  return steps;
};

export const fenwickPrefix = (tree: readonly number[], end: number): number =>
  prefixSumFenwick(tree, end);

// ---------------------------------------------------------- segment tree

/** Smallest power of two at least as large as `n`. */
export const treeSizeFor = (n: number): number => {
  let size = 1;
  while (size < n) size *= 2;
  return size;
};

export const segmentBuild = (
  values: readonly number[],
  size = treeSizeFor(values.length)
): number[] => {
  const tree = new Array<number>(2 * size).fill(0);
  for (let i = 0; i < values.length; i++) tree[size + i] = values[i];
  for (let i = size - 1; i > 0; i--) tree[i] = tree[2 * i] + tree[2 * i + 1];
  return tree;
};

export const segmentUpdate = (
  tree: readonly number[],
  size: number,
  index: number,
  delta: number
): number[] => {
  const next = [...tree];
  let idx = size + index;
  next[idx] += delta;
  idx = Math.floor(idx / 2);
  while (idx >= 1) {
    next[idx] = next[2 * idx] + next[2 * idx + 1];
    idx = Math.floor(idx / 2);
  }
  return next;
};

/** Records the tree nodes a range query combines. */
export const segmentQuerySteps = (
  tree: readonly number[],
  size: number,
  lo: number,
  hi: number
): RangeStep[] => {
  const steps: RangeStep[] = [];
  let left = lo + size;
  let right = hi + size;
  let total = 0;
  const used: number[] = [];
  while (left <= right) {
    if (left % 2 === 1) {
      used.push(left);
      total += tree[left];
      steps.push({
        note: `Left bound is odd: take node ${left}.`,
        used: [...used],
        runningTotal: total,
        tree: [...tree],
      });
      left++;
    }
    if (right % 2 === 0) {
      used.push(right);
      total += tree[right];
      steps.push({
        note: `Right bound is even: take node ${right}.`,
        used: [...used],
        runningTotal: total,
        tree: [...tree],
      });
      right--;
    }
    left = Math.floor(left / 2);
    right = Math.floor(right / 2);
  }
  return steps;
};

export const segmentRangeSum = (
  tree: readonly number[],
  size: number,
  lo: number,
  hi: number
): number => segmentQuerySteps(tree, size, lo, hi).at(-1)?.runningTotal ?? 0;
