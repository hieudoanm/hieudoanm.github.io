'use client';

import { GameItem, GamesTemplate } from '@/components/templates/GamesTemplate';
import { PiCaretDown, PiCaretUp, PiListNumbers } from 'react-icons/pi';

const ITEMS: GameItem[] = [
  {
    testId: 'engineering-sorting-bubble-sort',
    name: 'Bubble Sort',
    description:
      'Repeatedly swap adjacent pairs to float the largest value to the end.',
    icon: PiCaretUp,
    href: '/engineering/bubble-sort/',
    group: 'Sorting',
  },
  {
    testId: 'engineering-sorting-merge-sort',
    name: 'Merge Sort',
    description:
      'Split to single elements, then merge sorted runs in linear passes.',
    icon: PiCaretUp,
    href: '/engineering/merge-sort/',
    group: 'Sorting',
  },
  {
    testId: 'engineering-sorting-insertion-sort',
    name: 'Insertion Sort',
    description: 'Grow a sorted prefix one element at a time.',
    icon: PiCaretUp,
    href: '/engineering/insertion-sort/',
    group: 'Sorting',
  },
  {
    testId: 'engineering-sorting-quick-sort',
    name: 'Quick Sort',
    description: 'Partition around a pivot and recurse on both sides.',
    icon: PiCaretUp,
    href: '/engineering/quick-sort/',
    group: 'Sorting',
  },
  {
    testId: 'engineering-sorting-selection-sort',
    name: 'Selection Sort',
    description: 'Repeatedly select the smallest remaining value.',
    icon: PiCaretUp,
    href: '/engineering/selection-sort/',
    group: 'Sorting',
  },
  {
    testId: 'engineering-sorting-heap-sort',
    name: 'Heap Sort',
    description: 'Build a max-heap, then repeatedly move the root to the end.',
    icon: PiCaretUp,
    href: '/engineering/heap-sort/',
    group: 'Sorting',
  },
  {
    testId: 'engineering-searching-binary-search',
    name: 'Binary Search',
    description: 'Halve the search interval at each step on a sorted array.',
    icon: PiCaretDown,
    href: '/engineering/binary-search/',
    group: 'Searching',
  },
  {
    testId: 'engineering-searching-linear-search',
    name: 'Linear Search',
    description: 'Scan every element until the target turns up.',
    icon: PiCaretDown,
    href: '/engineering/linear-search/',
    group: 'Searching',
  },
  {
    testId: 'engineering-storage-array',
    name: 'Array',
    description: 'Contiguous storage with constant-time index access.',
    icon: PiListNumbers,
    href: '/engineering/array/',
    group: 'Storage and indexing',
  },
  {
    testId: 'engineering-storage-linked-lists',
    name: 'Linked Lists',
    description: 'Pointer-chained nodes with O(1) splicing and O(n) search.',
    icon: PiListNumbers,
    href: '/engineering/linked-lists/',
    group: 'Storage and indexing',
  },
  {
    testId: 'engineering-storage-queues',
    name: 'Queues',
    description: 'First in, first out, and the ring buffer that makes it O(1).',
    icon: PiListNumbers,
    href: '/engineering/queues/',
    group: 'Storage and indexing',
  },
  {
    testId: 'engineering-storage-stacks',
    name: 'Stacks',
    description: 'Last in, first out, and the discipline behind recursion.',
    icon: PiListNumbers,
    href: '/engineering/stacks/',
    group: 'Storage and indexing',
  },
  {
    testId: 'engineering-storage-hash-tables',
    name: 'Hash Tables',
    description: 'Map a key to a bucket so lookup stops being a search.',
    icon: PiListNumbers,
    href: '/engineering/hash-tables/',
    group: 'Storage and indexing',
  },
  {
    testId: 'engineering-storage-trie',
    name: 'Trie',
    description: 'A tree of prefixes with lookup cost independent of set size.',
    icon: PiListNumbers,
    href: '/engineering/trie/',
    group: 'Storage and indexing',
  },
  {
    testId: 'engineering-storage-segment-trees',
    name: 'Segment Trees',
    description: 'Disjoint partial aggregates for logarithmic range queries.',
    icon: PiListNumbers,
    href: '/engineering/segment-trees/',
    group: 'Storage and indexing',
  },
  {
    testId: 'engineering-storage-fenwick-trees',
    name: 'Fenwick Trees',
    description: 'Overlapping lowbit blocks for point update and prefix sum.',
    icon: PiListNumbers,
    href: '/engineering/fenwick-trees/',
    group: 'Storage and indexing',
  },
  {
    testId: 'engineering-storage-disjoint-set',
    name: 'Disjoint Set',
    description:
      'Union by rank and path compression, effectively constant time.',
    icon: PiListNumbers,
    href: '/engineering/disjoint-set/',
    group: 'Storage and indexing',
  },
  {
    testId: 'engineering-storage-suffix-arrays',
    name: 'Suffix Arrays',
    description: 'Sorted suffixes, built by doubling, for substring queries.',
    icon: PiListNumbers,
    href: '/engineering/suffix-arrays/',
    group: 'Storage and indexing',
  },
];

const Page = () => (
  <GamesTemplate
    title="Engineering"
    subtitle="Data structures and the algorithms that operate on them, each with a theory page and a hands-on visualiser."
    items={ITEMS}
    searchable
  />
);

export default Page;
