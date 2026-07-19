'use client';

import { SearchSimulator } from '../../shared/SearchSimulator';
import { recordBinarySearch } from '../searches';

export const BinarySearchSimulator = () => (
  <SearchSimulator
    search={recordBinarySearch}
    inputHint="Sorted input only. The shaded band is the window still under consideration."
    complexity="O(log n) — halving the window each step."
  />
);
