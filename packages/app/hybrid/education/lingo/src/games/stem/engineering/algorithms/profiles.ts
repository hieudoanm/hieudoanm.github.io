/**
 * Per-sort characteristics.
 *
 * Keeping the table beside the visualiser lets the complexity panel and the
 * theory pages quote the same numbers instead of restating them.
 */
export interface SortProfile {
  best: string;
  average: string;
  worst: string;
  stable: boolean;
  inPlace: boolean;
  inputHint: string;
  summary: string;
}

export const BUBBLE_SORT: SortProfile = {
  best: 'O(n)',
  average: 'O(n²)',
  worst: 'O(n²)',
  stable: true,
  inPlace: true,
  inputHint: 'Each pass floats the largest remaining value to the right.',
  summary:
    'Repeatedly walk the array swapping neighbours that are out of order, shrinking the unsorted prefix by one each pass.',
};

export const INSERTION_SORT: SortProfile = {
  best: 'O(n)',
  average: 'O(n²)',
  worst: 'O(n²)',
  stable: true,
  inPlace: true,
  inputHint:
    'Grow a sorted prefix, shifting larger values right to open a gap.',
  summary:
    'Take each element in turn and insert it into the already-sorted prefix by shifting bigger values to the right.',
};

export const SELECTION_SORT: SortProfile = {
  best: 'O(n²)',
  average: 'O(n²)',
  worst: 'O(n²)',
  stable: false,
  inPlace: true,
  inputHint:
    'Scan for the minimum, then swap it into the front of the unsorted region.',
  summary:
    'Find the smallest element in the unsorted region and swap it into position, never touching that position again.',
};

export const MERGE_SORT: SortProfile = {
  best: 'O(n log n)',
  average: 'O(n log n)',
  worst: 'O(n log n)',
  stable: true,
  inPlace: false,
  inputHint:
    'Split to single elements, then merge sorted runs through a buffer.',
  summary:
    'Split the array in half until each run is trivially sorted, then merge pairs of runs through an auxiliary buffer.',
};

export const QUICK_SORT: SortProfile = {
  best: 'O(n log n)',
  average: 'O(n log n)',
  worst: 'O(n²)',
  stable: false,
  inPlace: true,
  inputHint: 'Partition around a pivot, then recurse into each side.',
  summary:
    'Choose a pivot, partition so smaller values sit left of it, and recurse into each partition.',
};

export const HEAP_SORT: SortProfile = {
  best: 'O(n log n)',
  average: 'O(n log n)',
  worst: 'O(n log n)',
  stable: false,
  inPlace: true,
  inputHint: 'Build a max-heap, then swap the root to the end and sift down.',
  summary:
    'Turn the array into a max-heap, then repeatedly move the largest value to the end and restore the heap property.',
};
