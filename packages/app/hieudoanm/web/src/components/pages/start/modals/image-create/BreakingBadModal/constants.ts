import { periodicTable } from '@hieudoanm.github.io/data/periodic-table';

export const periodicTableSymbols: Set<string> = new Set(
  Object.keys(periodicTable)
);

export const PRESETS = [
  'Breaking Bad',
  'Walter White',
  'Jesse Pinkman',
  'Heisenberg',
  'Saul Goodman',
  'Los Pollos',
];
