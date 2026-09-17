import { DisjointSet, insertWord, renderTrie, searchWord } from '../trees';
import { buildSuffixArray, lcpOf, naiveSuffixOrder } from '../suffix';
import {
  fenwickBuild,
  fenwickPrefix,
  fenwickQuerySteps,
  fenwickUpdate,
  segmentBuild,
  segmentQuerySteps,
  segmentRangeSum,
  segmentUpdate,
  treeSizeFor,
} from '../ranges';
import { empty, pop, push, scan } from '../linear';

const WORDS = ['car', 'cat', 'cart', 'dog', 'do'];

describe('array-backed structures', () => {
  it('pushes into the first free slot', () => {
    const step = push(empty(3), 7, 'Push 7', 'append');
    expect(step.items).toEqual([7, null, null]);
  });

  it('reports overflow when full', () => {
    let items = empty(2);
    items = push(items, 1, 'Push 1', 'a').items;
    items = push(items, 2, 'Push 2', 'b').items;
    expect(push(items, 3, 'Push 3', 'c').detail).toContain('Overflow');
  });

  it('pops the last element for a stack', () => {
    const step = pop([1, 2, null], 'end', 'Pop');
    expect(step.items).toEqual([1, null, null]);
  });

  it('reports underflow when empty', () => {
    expect(pop(empty(2), 'end', 'Pop').detail).toContain('Underflow');
  });

  it('pops the first element for a queue', () => {
    expect(pop([1, 2, null], 'front', 'Dequeue').items[0]).toBeNull();
  });

  it('scans and finds a value', () => {
    const steps = scan([4, 8, 15, 16], 15);
    expect(steps.at(-1)?.detail).toContain('is at index 2');
  });

  it('scans every slot on a miss', () => {
    expect(scan([4, 8, 15, 16], 99)).toHaveLength(4);
  });
});

describe('trie', () => {
  it('finds an inserted word', () => {
    const root = WORDS.reduce(insertWord, { children: {}, terminal: false });
    expect(WORDS.every((w) => searchWord(root, w))).toBe(true);
  });

  it('rejects a word that is only a prefix of another', () => {
    const root = WORDS.reduce(insertWord, { children: {}, terminal: false });
    expect(searchWord(root, 'ca')).toBe(false);
  });

  it('rejects an unknown word', () => {
    const root = WORDS.reduce(insertWord, { children: {}, terminal: false });
    expect(searchWord(root, 'zebra')).toBe(false);
  });

  it('is case insensitive', () => {
    const root = insertWord({ children: {}, terminal: false }, 'Dog');
    expect(searchWord(root, 'dog')).toBe(true);
  });

  it('renders one line per node and marks complete words', () => {
    const root = WORDS.reduce(insertWord, { children: {}, terminal: false });
    const rendered = renderTrie(root);
    expect(rendered.length).toBeGreaterThan(5);
    expect(rendered.some((l) => l.endsWith('*'))).toBe(true);
  });

  it('caps depth so a long word cannot flood the panel', () => {
    const root = insertWord({ children: {}, terminal: false }, 'abcdefghij');
    expect(renderTrie(root, 3).at(-1)).toContain('…');
  });
});

describe('disjoint set', () => {
  it('starts with every element in its own component', () => {
    expect(new DisjointSet(5).componentCount).toBe(5);
  });

  it('merges two components', () => {
    const ds = new DisjointSet(5);
    ds.union(0, 1);
    expect(ds.componentCount).toBe(4);
  });

  it('is idempotent on a repeated union', () => {
    const ds = new DisjointSet(3);
    ds.union(0, 1);
    ds.union(0, 1);
    expect(ds.componentCount).toBe(2);
  });

  it('transitively joins through a chain', () => {
    const ds = new DisjointSet(4);
    ds.union(0, 1);
    ds.union(1, 2);
    ds.union(2, 3);
    expect(ds.componentCount).toBe(1);
    expect(ds.find(3)).toBe(ds.find(0));
  });

  it('path compression flattens the chain', () => {
    const ds = new DisjointSet(4);
    ds.union(0, 1);
    ds.union(1, 2);
    ds.union(2, 3);
    ds.find(0);
    expect(ds.groups[0]).toBe(ds.find(0));
  });
});

describe('fenwick tree', () => {
  const VALUES = [3, 2, 5, 1, 6];

  it('matches a naive prefix sum', () => {
    const tree = fenwickBuild(VALUES);
    for (let end = 0; end <= VALUES.length; end++) {
      const naive = VALUES.slice(0, end).reduce((a, b) => a + b, 0);
      expect(fenwickPrefix(tree, end)).toBe(naive);
    }
  });

  it('returns zero for an empty prefix', () => {
    expect(fenwickPrefix(fenwickBuild(VALUES), 0)).toBe(0);
  });

  it('applies a point update', () => {
    const tree = fenwickUpdate(fenwickBuild(VALUES), 1, 10);
    expect(fenwickPrefix(tree, 2)).toBe(
      fenwickPrefix(fenwickBuild(VALUES), 2) + 10
    );
  });

  it('touches at most log n blocks', () => {
    expect(
      fenwickQuerySteps(fenwickBuild(VALUES), 5).length
    ).toBeLessThanOrEqual(3);
  });

  it('steps sum to the prefix total', () => {
    const steps = fenwickQuerySteps(fenwickBuild(VALUES), 4);
    expect(steps.at(-1)?.runningTotal).toBe(11);
  });

  it('survives a negative delta', () => {
    const tree = fenwickUpdate(fenwickBuild(VALUES), 0, -3);
    expect(fenwickPrefix(tree, 1)).toBe(0);
  });
});

describe('segment tree', () => {
  const VALUES = [3, 2, 5, 1, 6];
  const n = treeSizeFor(VALUES.length);

  it('rounds the tree size up to a power of two', () => {
    expect(n).toBe(8);
  });

  it('matches a naive range sum', () => {
    const tree = segmentBuild(VALUES);
    for (let lo = 0; lo < n; lo++) {
      for (let hi = lo; hi < n; hi++) {
        const naive = VALUES.slice(lo, hi + 1).reduce((a, b) => a + b, 0);
        expect(segmentRangeSum(tree, n, lo, hi)).toBe(naive);
      }
    }
  });

  it('sums a single-element range', () => {
    expect(segmentRangeSum(segmentBuild(VALUES), n, 0, 0)).toBe(3);
  });

  it('applies a point update', () => {
    const tree = segmentUpdate(segmentBuild(VALUES), n, 1, 10);
    expect(segmentRangeSum(tree, n, 0, 3)).toBe(3 + 12 + 5 + 1);
  });

  it('combines disjoint nodes', () => {
    const steps = segmentQuerySteps(segmentBuild(VALUES), n, 0, 4);
    expect(steps.at(-1)?.runningTotal).toBe(17);
  });

  it('handles a single-element range', () => {
    expect(segmentRangeSum(segmentBuild(VALUES), n, 2, 2)).toBe(5);
  });
});

describe('suffix array', () => {
  const TEXT = 'banana';

  it('orders suffixes lexicographically', () => {
    const steps = buildSuffixArray(TEXT);
    const final = steps.at(-1)!.order;
    const suffixes = final.map((i) => TEXT.slice(i));
    expect(suffixes).toEqual([...suffixes].sort());
  });

  it('agrees with the naive ordering', () => {
    const steps = buildSuffixArray(TEXT);
    expect(steps.at(-1)!.order).toEqual(naiveSuffixOrder(TEXT));
  });

  it('assigns every position a distinct rank', () => {
    const ranks = buildSuffixArray(TEXT).at(-1)!.ranks;
    expect(new Set(ranks).size).toBe(TEXT.length);
  });

  it('ranks start at zero', () => {
    expect(Math.min(...buildSuffixArray(TEXT).at(-1)!.ranks)).toBe(0);
  });

  it('handles a single character', () => {
    expect(buildSuffixArray('a')).toHaveLength(1);
  });

  it('handles an empty string', () => {
    expect(buildSuffixArray('')).toEqual([]);
  });

  it('computes a longest common prefix length', () => {
    expect(lcpOf('banana', 1, 3)).toBe(3);
  });

  it('returns zero LCP for disjoint suffixes', () => {
    expect(lcpOf('abc', 0, 1)).toBe(0);
  });
});
