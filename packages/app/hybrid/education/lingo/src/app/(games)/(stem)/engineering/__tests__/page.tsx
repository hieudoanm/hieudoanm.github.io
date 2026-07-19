import { render, screen } from '@testing-library/react';
import type { ComponentType } from 'react';

import BinarySearchInteractive from '../(algorithms)/binary-search/interactive/page';
import AlgorithmsBinarySearch from '../(algorithms)/binary-search/page';
import BubbleSortInteractive from '../(algorithms)/bubble-sort/interactive/page';
import AlgorithmsBubbleSort from '../(algorithms)/bubble-sort/page';
import HeapSortInteractive from '../(algorithms)/heap-sort/interactive/page';
import AlgorithmsHeapSort from '../(algorithms)/heap-sort/page';
import InsertionInteractive from '../(algorithms)/insertion-sort/interactive/page';
import AlgorithmsInsertionSort from '../(algorithms)/insertion-sort/page';
import LinearSearchInteractive from '../(algorithms)/linear-search/interactive/page';
import AlgorithmsLinearSearch from '../(algorithms)/linear-search/page';
import MergeSortInteractive from '../(algorithms)/merge-sort/interactive/page';
import AlgorithmsMergeSort from '../(algorithms)/merge-sort/page';
import QuickSortInteractive from '../(algorithms)/quick-sort/interactive/page';
import AlgorithmsQuickSort from '../(algorithms)/quick-sort/page';
import SelectionInteractive from '../(algorithms)/selection-sort/interactive/page';
import AlgorithmsSelectionSort from '../(algorithms)/selection-sort/page';
import ArrayInteractive from '../(data-structures)/array/interactive/page';
import ArrayTheory from '../(data-structures)/array/page';
import DisjointSetInteractive from '../(data-structures)/disjoint-set/interactive/page';
import DisjointSetTheory from '../(data-structures)/disjoint-set/page';
import FenwickTreesInteractive from '../(data-structures)/fenwick-trees/interactive/page';
import FenwickTreesTheory from '../(data-structures)/fenwick-trees/page';
import HashTablesInteractive from '../(data-structures)/hash-tables/interactive/page';
import HashTablesTheory from '../(data-structures)/hash-tables/page';
import LinkedListsInteractive from '../(data-structures)/linked-lists/interactive/page';
import LinkedListsTheory from '../(data-structures)/linked-lists/page';
import QueuesInteractive from '../(data-structures)/queues/interactive/page';
import QueuesTheory from '../(data-structures)/queues/page';
import SegmentTreesInteractive from '../(data-structures)/segment-trees/interactive/page';
import SegmentTreesTheory from '../(data-structures)/segment-trees/page';
import StacksInteractive from '../(data-structures)/stacks/interactive/page';
import StacksTheory from '../(data-structures)/stacks/page';
import SuffixArraysInteractive from '../(data-structures)/suffix-arrays/interactive/page';
import SuffixArraysTheory from '../(data-structures)/suffix-arrays/page';
import TrieInteractive from '../(data-structures)/trie/interactive/page';
import TrieTheory from '../(data-structures)/trie/page';
import EngineeringHub from '../page';

type Page = ComponentType;

const theoryCases: [string, Page][] = [
  ['Bubble Sort', AlgorithmsBubbleSort],
  ['Merge Sort', AlgorithmsMergeSort],
  ['Insertion Sort', AlgorithmsInsertionSort],
  ['Quicksort', AlgorithmsQuickSort],
  ['Selection Sort', AlgorithmsSelectionSort],
  ['Heapsort', AlgorithmsHeapSort],
  ['Binary Search', AlgorithmsBinarySearch],
  ['Linear Search', AlgorithmsLinearSearch],
  ['Array', ArrayTheory],
  ['Linked Lists', LinkedListsTheory],
  ['Queue', QueuesTheory],
  ['Stack', StacksTheory],
  ['Hash Table', HashTablesTheory],
  ['Trie', TrieTheory],
  ['Segment Tree', SegmentTreesTheory],
  ['Fenwick Tree', FenwickTreesTheory],
  ['Disjoint Set (Union-Find)', DisjointSetTheory],
  ['Suffix Trees and Arrays', SuffixArraysTheory],
];

const interactiveCases: [string, Page][] = [
  ['Bubble Sort', BubbleSortInteractive],
  ['Merge Sort', MergeSortInteractive],
  ['Insertion Sort', InsertionInteractive],
  ['Quicksort', QuickSortInteractive],
  ['Selection Sort', SelectionInteractive],
  ['Heapsort', HeapSortInteractive],
  ['Binary Search', BinarySearchInteractive],
  ['Linear Search', LinearSearchInteractive],
  ['Array', ArrayInteractive],
  ['Linked List', LinkedListsInteractive],
  ['Queue', QueuesInteractive],
  ['Stack', StacksInteractive],
  ['Hash Table', HashTablesInteractive],
  ['Trie', TrieInteractive],
  ['Segment Tree', SegmentTreesInteractive],
  ['Fenwick Tree', FenwickTreesInteractive],
  ['Union-Find', DisjointSetInteractive],
  ['Suffix Array', SuffixArraysInteractive],
];

describe('engineering route hub', () => {
  it('renders the engineering hub', () => {
    render(<EngineeringHub />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Engineering'
    );
  });
});

describe('engineering theory pages', () => {
  it.each(theoryCases)('renders the %s theory page', (title, Page) => {
    render(<Page />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(title);
  });

  it.each(theoryCases)(
    'links the %s theory page to its interactive view',
    (_t, Page) => {
      render(<Page />);
      const linked = screen
        .getAllByRole('link')
        .some((a) => a.getAttribute('href')?.endsWith('/interactive'));
      expect(linked).toBe(true);
    }
  );

  it.each(theoryCases)(
    'renders references on the %s theory page',
    (_t, Page) => {
      render(<Page />);
      expect(
        screen.getByRole('heading', { name: 'References' })
      ).toBeInTheDocument();
    }
  );
});

describe('engineering interactive pages', () => {
  it.each(interactiveCases)(
    'renders a heading on the %s interactive page',
    (title, Page) => {
      render(<Page />);
      const match = screen
        .getAllByRole('heading')
        .some((h) =>
          (h.textContent ?? '').toLowerCase().includes(title.toLowerCase())
        );
      expect(match).toBe(true);
    }
  );

  it.each(interactiveCases)(
    'renders interactive controls on the %s page',
    (_t, Page) => {
      render(<Page />);
      expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
    }
  );
});
