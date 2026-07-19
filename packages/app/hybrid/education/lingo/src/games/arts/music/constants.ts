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
  ['c'],
  ['c', 'd'],
  ['c', 'd', 'e'],
  ['c', 'd', 'e', 'f'],
  ['c', 'd', 'e', 'f', 'g'],
  ['c', 'd', 'e', 'f', 'g', 'a'],
  ['c', 'd', 'e', 'f', 'g', 'a', 'b'],
  ['c', 'cs', 'd', 'e', 'f', 'g', 'a', 'b'],
  ['c', 'cs', 'd', 'ds', 'e', 'f', 'g', 'a', 'b'],
  ['c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'a', 'b'],
  ['c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'gs', 'a', 'b'],
  ['c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'gs', 'a', 'as', 'b'],
];
