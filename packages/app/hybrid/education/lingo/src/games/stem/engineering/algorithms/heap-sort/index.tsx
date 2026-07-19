'use client';

import { SortSimulator } from '../../shared/SortSimulator';
import { HEAP_SORT } from '../profiles';
import { recordHeapSort } from '../sorts-divide';

export const HeapSortSimulator = () => (
  <SortSimulator record={recordHeapSort} profile={HEAP_SORT} />
);
