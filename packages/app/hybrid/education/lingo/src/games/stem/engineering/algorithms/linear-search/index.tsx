'use client';

import { SearchSimulator } from '../../shared/SearchSimulator';
import { recordLinearSearch } from '../searches';

export const LinearSearchSimulator = () => (
  <SearchSimulator
    search={recordLinearSearch}
    inputHint="Unsorted input is fine. Every element up to the target must be inspected."
    complexity="O(n) — one probe per element, stopping at the target."
  />
);
