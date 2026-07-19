export const NODE_ENV = process.env.NODE_ENV ?? 'development';

export const whiteKeys = [
  { id: 'c', note: 'C' },
  { id: 'd', note: 'D' },
  { id: 'e', note: 'E' },
  { id: 'f', note: 'F' },
  { id: 'g', note: 'G' },
  { id: 'a', note: 'A' },
  { id: 'b', note: 'B' },
];

export const blackKeys = [
  { id: 'cs', note: 'C#', position: 0 },
  { id: 'ds', note: 'D#', position: 1 },
  { id: 'fs', note: 'F#', position: 3 },
  { id: 'gs', note: 'G#', position: 4 },
  { id: 'as', note: 'A#', position: 5 },
];

export const levels: string[][] = [
  ['c', 'd'],
  ['c', 'cs', 'd'],
  ['c', 'cs', 'd', 'ds'],
  ['c', 'cs', 'd', 'ds', 'e'],
  ['c', 'cs', 'd', 'ds', 'e', 'f'],
  ['c', 'cs', 'd', 'ds', 'e', 'f', 'fs'],
  ['c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g'],
  ['c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'gs'],
  ['c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'gs', 'a'],
  ['c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'gs', 'a', 'as'],
  ['c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'gs', 'a', 'as', 'b'],
];
