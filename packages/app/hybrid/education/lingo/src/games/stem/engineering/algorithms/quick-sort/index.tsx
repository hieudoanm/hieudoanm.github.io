'use client';

import { SortSimulator } from '../../shared/SortSimulator';
import { QUICK_SORT } from '../profiles';
import { recordQuickSort } from '../sorts-divide';

export const QuickSortSimulator = () => (
  <SortSimulator record={recordQuickSort} profile={QUICK_SORT} />
);
