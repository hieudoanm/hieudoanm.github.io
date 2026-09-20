'use client';

import { SortSimulator } from '../../shared/SortSimulator';
import { INSERTION_SORT } from '../profiles';
import { recordInsertionSort } from '../sorts-quadratic';

export const InsertionSortSimulator = () => (
  <SortSimulator record={recordInsertionSort} profile={INSERTION_SORT} />
);
