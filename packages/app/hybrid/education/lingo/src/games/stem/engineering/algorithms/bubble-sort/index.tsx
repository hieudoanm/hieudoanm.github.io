'use client';

import { SortSimulator } from '../../shared/SortSimulator';
import { BUBBLE_SORT } from '../profiles';
import { recordBubbleSort } from '../sorts-quadratic';

export const BubbleSortSimulator = () => (
  <SortSimulator record={recordBubbleSort} profile={BUBBLE_SORT} />
);
