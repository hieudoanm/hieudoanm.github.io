'use client';

import { SortSimulator } from '../../shared/SortSimulator';
import { MERGE_SORT } from '../profiles';
import { recordMergeSort } from '../sorts-divide';

export const MergeSortSimulator = () => (
  <SortSimulator record={recordMergeSort} profile={MERGE_SORT} />
);
