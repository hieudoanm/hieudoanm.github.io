'use client';

import { SortSimulator } from '../../shared/SortSimulator';
import { SELECTION_SORT } from '../profiles';
import { recordSelectionSort } from '../sorts-quadratic';

export const SelectionSortSimulator = () => (
  <SortSimulator record={recordSelectionSort} profile={SELECTION_SORT} />
);
